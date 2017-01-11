'use strict';

export function FoundItemResource($resource) {
	'ngInject';
	return $resource('/api/founditems/:query', {
		id: '@_id'

	}, {

		}

	);
}
