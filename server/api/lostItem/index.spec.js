'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var lostItemCtrlStub = {
  index: 'lostItemCtrl.index',
  show: 'lostItemCtrl.show',
  create: 'lostItemCtrl.create',
  upsert: 'lostItemCtrl.upsert',
  patch: 'lostItemCtrl.patch',
  destroy: 'lostItemCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var lostItemIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './lostItem.controller': lostItemCtrlStub
});

describe('LostItem API Router:', function() {
  it('should return an express router instance', function() {
    expect(lostItemIndex).to.equal(routerStub);
  });

  describe('GET /api/lostItems', function() {
    it('should route to lostItem.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'lostItemCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/lostItems/:id', function() {
    it('should route to lostItem.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'lostItemCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/lostItems', function() {
    it('should route to lostItem.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'lostItemCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/lostItems/:id', function() {
    it('should route to lostItem.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'lostItemCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/lostItems/:id', function() {
    it('should route to lostItem.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'lostItemCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/lostItems/:id', function() {
    it('should route to lostItem.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'lostItemCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
