'use strict';

var app = require('../..');
import request from 'supertest';

var newLostItem;

describe('LostItem API:', function() {
  describe('GET /api/lostItems', function() {
    var lostItems;

    beforeEach(function(done) {
      request(app)
        .get('/api/lostItems')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          lostItems = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(lostItems).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/lostItems', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/lostItems')
        .send({
          name: 'New LostItem',
          info: 'This is the brand new lostItem!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newLostItem = res.body;
          done();
        });
    });

    it('should respond with the newly created lostItem', function() {
      expect(newLostItem.name).to.equal('New LostItem');
      expect(newLostItem.info).to.equal('This is the brand new lostItem!!!');
    });
  });

  describe('GET /api/lostItems/:id', function() {
    var lostItem;

    beforeEach(function(done) {
      request(app)
        .get(`/api/lostItems/${newLostItem._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          lostItem = res.body;
          done();
        });
    });

    afterEach(function() {
      lostItem = {};
    });

    it('should respond with the requested lostItem', function() {
      expect(lostItem.name).to.equal('New LostItem');
      expect(lostItem.info).to.equal('This is the brand new lostItem!!!');
    });
  });

  describe('PUT /api/lostItems/:id', function() {
    var updatedLostItem;

    beforeEach(function(done) {
      request(app)
        .put(`/api/lostItems/${newLostItem._id}`)
        .send({
          name: 'Updated LostItem',
          info: 'This is the updated lostItem!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedLostItem = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedLostItem = {};
    });

    it('should respond with the updated lostItem', function() {
      expect(updatedLostItem.name).to.equal('Updated LostItem');
      expect(updatedLostItem.info).to.equal('This is the updated lostItem!!!');
    });

    it('should respond with the updated lostItem on a subsequent GET', function(done) {
      request(app)
        .get(`/api/lostItems/${newLostItem._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let lostItem = res.body;

          expect(lostItem.name).to.equal('Updated LostItem');
          expect(lostItem.info).to.equal('This is the updated lostItem!!!');

          done();
        });
    });
  });

  describe('PATCH /api/lostItems/:id', function() {
    var patchedLostItem;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/lostItems/${newLostItem._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched LostItem' },
          { op: 'replace', path: '/info', value: 'This is the patched lostItem!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedLostItem = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedLostItem = {};
    });

    it('should respond with the patched lostItem', function() {
      expect(patchedLostItem.name).to.equal('Patched LostItem');
      expect(patchedLostItem.info).to.equal('This is the patched lostItem!!!');
    });
  });

  describe('DELETE /api/lostItems/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/lostItems/${newLostItem._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when lostItem does not exist', function(done) {
      request(app)
        .delete(`/api/lostItems/${newLostItem._id}`)
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
