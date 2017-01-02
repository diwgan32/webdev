'use strict';

var app = require('../..');
import request from 'supertest';

var newFoundItem;

describe('FoundItem API:', function() {
  describe('GET /api/foundItems', function() {
    var foundItems;

    beforeEach(function(done) {
      request(app)
        .get('/api/foundItems')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          foundItems = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(foundItems).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/foundItems', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/foundItems')
        .send({
          name: 'New FoundItem',
          info: 'This is the brand new foundItem!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newFoundItem = res.body;
          done();
        });
    });

    it('should respond with the newly created foundItem', function() {
      expect(newFoundItem.name).to.equal('New FoundItem');
      expect(newFoundItem.info).to.equal('This is the brand new foundItem!!!');
    });
  });

  describe('GET /api/foundItems/:id', function() {
    var foundItem;

    beforeEach(function(done) {
      request(app)
        .get(`/api/foundItems/${newFoundItem._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          foundItem = res.body;
          done();
        });
    });

    afterEach(function() {
      foundItem = {};
    });

    it('should respond with the requested foundItem', function() {
      expect(foundItem.name).to.equal('New FoundItem');
      expect(foundItem.info).to.equal('This is the brand new foundItem!!!');
    });
  });

  describe('PUT /api/foundItems/:id', function() {
    var updatedFoundItem;

    beforeEach(function(done) {
      request(app)
        .put(`/api/foundItems/${newFoundItem._id}`)
        .send({
          name: 'Updated FoundItem',
          info: 'This is the updated foundItem!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedFoundItem = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedFoundItem = {};
    });

    it('should respond with the updated foundItem', function() {
      expect(updatedFoundItem.name).to.equal('Updated FoundItem');
      expect(updatedFoundItem.info).to.equal('This is the updated foundItem!!!');
    });

    it('should respond with the updated foundItem on a subsequent GET', function(done) {
      request(app)
        .get(`/api/foundItems/${newFoundItem._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let foundItem = res.body;

          expect(foundItem.name).to.equal('Updated FoundItem');
          expect(foundItem.info).to.equal('This is the updated foundItem!!!');

          done();
        });
    });
  });

  describe('PATCH /api/foundItems/:id', function() {
    var patchedFoundItem;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/foundItems/${newFoundItem._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched FoundItem' },
          { op: 'replace', path: '/info', value: 'This is the patched foundItem!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedFoundItem = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedFoundItem = {};
    });

    it('should respond with the patched foundItem', function() {
      expect(patchedFoundItem.name).to.equal('Patched FoundItem');
      expect(patchedFoundItem.info).to.equal('This is the patched foundItem!!!');
    });
  });

  describe('DELETE /api/foundItems/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/foundItems/${newFoundItem._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when foundItem does not exist', function(done) {
      request(app)
        .delete(`/api/foundItems/${newFoundItem._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
