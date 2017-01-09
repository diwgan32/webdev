/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/fileUploads              ->  index
 * POST    /api/fileUploads              ->  create
 * GET     /api/fileUploads/:id          ->  show
 * PUT     /api/fileUploads/:id          ->  upsert
 * PATCH   /api/fileUploads/:id          ->  patch
 * DELETE  /api/fileUploads/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import FileUpload from './fileUpload.model';
var uploadLib = require('express-fileupload')
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

// Gets a list of FileUploads
export function index(req, res) {
  return FileUpload.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single FileUpload from the DB
export function show(req, res) {
  return FileUpload.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new FileUpload in the DB
export function create(req, res) {
  var sampleFile;
  console.log(res);
    if (!req.files) {
        res.send('No files were uploaded.');
        return;
    }
 
    sampleFile = req.files.sampleFile;
    sampleFile.mv('/somewhere/on/your/server/filename.jpg', function(err) {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.send('File uploaded!');
        }
    });
}

// Upserts the given FileUpload in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return FileUpload.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()

    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing FileUpload in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return FileUpload.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a FileUpload from the DB
export function destroy(req, res) {
  return FileUpload.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
