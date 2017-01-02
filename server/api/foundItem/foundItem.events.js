/**
 * FoundItem model events
 */

'use strict';

import {EventEmitter} from 'events';
import FoundItem from './foundItem.model';
var FoundItemEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
FoundItemEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  FoundItem.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    FoundItemEvents.emit(event + ':' + doc._id, doc);
    FoundItemEvents.emit(event, doc);
  };
}

export default FoundItemEvents;
