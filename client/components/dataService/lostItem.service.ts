'use strict';

export function LostItemResource($resource) {
  'ngInject';
  return $resource('/api/lostitems/:query', {
    id: '@_id'

  }, {
  	getUsers: {
  		method: 'GET',
      params:{
        userName: ''
      },
  		isArray: true
  	}
  }
  
  );
}
