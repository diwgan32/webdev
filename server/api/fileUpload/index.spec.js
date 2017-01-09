'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var fileUploadCtrlStub = {
  index: 'fileUploadCtrl.index',
  show: 'fileUploadCtrl.show',
  create: 'fileUploadCtrl.create',
  upsert: 'fileUploadCtrl.upsert',
  patch: 'fileUploadCtrl.patch',
  destroy: 'fileUploadCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var fileUploadIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './fileUpload.controller': fileUploadCtrlStub
});

describe('FileUpload API Router:', function() {
  it('should return an express router instance', function() {
    expect(fileUploadIndex).to.equal(routerStub);
  });

  describe('GET /api/fileUploads', function() {
    it('should route to fileUpload.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'fileUploadCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/fileUploads/:id', function() {
    it('should route to fileUpload.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'fileUploadCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/fileUploads', function() {
    it('should route to fileUpload.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'fileUploadCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/fileUploads/:id', function() {
    it('should route to fileUpload.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'fileUploadCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/fileUploads/:id', function() {
    it('should route to fileUpload.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'fileUploadCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/fileUploads/:id', function() {
    it('should route to fileUpload.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'fileUploadCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
