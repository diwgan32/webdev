/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/lostItems              ->  index
 * POST    /api/lostItems              ->  create
 * GET     /api/lostItems/:id          ->  show
 * PUT     /api/lostItems/:id          ->  upsert
 * PATCH   /api/lostItems/:id          ->  patch
 * DELETE  /api/lostItems/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import LostItem from './lostItem.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function(entity) {
    try {
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch(err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function(entity) {
    if(entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of LostItems
export function index(req, res) {
  return LostItem.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single LostItem from the DB
export function show(req, res) {
  return LostItem.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new LostItem in the DB
export function create(req, res) {
  return LostItem.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given LostItem in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return LostItem.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()

    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing LostItem in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return LostItem.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a LostItem from the DB
export function destroy(req, res) {
  return LostItem.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
