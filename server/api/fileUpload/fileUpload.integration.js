'use strict';

var app = require('../..');
import request from 'supertest';

var newFileUpload;

describe('FileUpload API:', function() {
  describe('GET /api/fileUploads', function() {
    var fileUploads;

    beforeEach(function(done) {
      request(app)
        .get('/api/fileUploads')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          fileUploads = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(fileUploads).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/fileUploads', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/fileUploads')
        .send({
          name: 'New FileUpload',
          info: 'This is the brand new fileUpload!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newFileUpload = res.body;
          done();
        });
    });

    it('should respond with the newly created fileUpload', function() {
      expect(newFileUpload.name).to.equal('New FileUpload');
      expect(newFileUpload.info).to.equal('This is the brand new fileUpload!!!');
    });
  });

  describe('GET /api/fileUploads/:id', function() {
    var fileUpload;

    beforeEach(function(done) {
      request(app)
        .get(`/api/fileUploads/${newFileUpload._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          fileUpload = res.body;
          done();
        });
    });

    afterEach(function() {
      fileUpload = {};
    });

    it('should respond with the requested fileUpload', function() {
      expect(fileUpload.name).to.equal('New FileUpload');
      expect(fileUpload.info).to.equal('This is the brand new fileUpload!!!');
    });
  });

  describe('PUT /api/fileUploads/:id', function() {
    var updatedFileUpload;

    beforeEach(function(done) {
      request(app)
        .put(`/api/fileUploads/${newFileUpload._id}`)
        .send({
          name: 'Updated FileUpload',
          info: 'This is the updated fileUpload!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedFileUpload = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedFileUpload = {};
    });

    it('should respond with the updated fileUpload', function() {
      expect(updatedFileUpload.name).to.equal('Updated FileUpload');
      expect(updatedFileUpload.info).to.equal('This is the updated fileUpload!!!');
    });

    it('should respond with the updated fileUpload on a subsequent GET', function(done) {
      request(app)
        .get(`/api/fileUploads/${newFileUpload._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let fileUpload = res.body;

          expect(fileUpload.name).to.equal('Updated FileUpload');
          expect(fileUpload.info).to.equal('This is the updated fileUpload!!!');

          done();
        });
    });
  });

  describe('PATCH /api/fileUploads/:id', function() {
    var patchedFileUpload;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/fileUploads/${newFileUpload._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched FileUpload' },
          { op: 'replace', path: '/info', value: 'This is the patched fileUpload!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedFileUpload = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedFileUpload = {};
    });

    it('should respond with the patched fileUpload', function() {
      expect(patchedFileUpload.name).to.equal('Patched FileUpload');
      expect(patchedFileUpload.info).to.equal('This is the patched fileUpload!!!');
    });
  });

  describe('DELETE /api/fileUploads/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/fileUploads/${newFileUpload._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when fileUpload does not exist', function(done) {
      request(app)
        .delete(`/api/fileUploads/${newFileUpload._id}`)
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
