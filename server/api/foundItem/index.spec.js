'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var foundItemCtrlStub = {
  index: 'foundItemCtrl.index',
  show: 'foundItemCtrl.show',
  create: 'foundItemCtrl.create',
  upsert: 'foundItemCtrl.upsert',
  patch: 'foundItemCtrl.patch',
  destroy: 'foundItemCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var foundItemIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './foundItem.controller': foundItemCtrlStub
});

describe('FoundItem API Router:', function() {
  it('should return an express router instance', function() {
    expect(foundItemIndex).to.equal(routerStub);
  });

  describe('GET /api/foundItems', function() {
    it('should route to foundItem.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'foundItemCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/foundItems/:id', function() {
    it('should route to foundItem.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'foundItemCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/foundItems', function() {
    it('should route to foundItem.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'foundItemCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/foundItems/:id', function() {
    it('should route to foundItem.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'foundItemCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/foundItems/:id', function() {
    it('should route to foundItem.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'foundItemCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/foundItems/:id', function() {
    it('should route to foundItem.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'foundItemCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
