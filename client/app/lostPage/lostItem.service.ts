'use strict';

export function LostItemResource($resource) {
  'ngInject';
  return $resource('/api/lostitems/:id/:controller', {
    id: '@_id'
  }, {
  query:{
  method:'GET',
  params:{userName:''},
  isArray:true}
  }

  );
}
