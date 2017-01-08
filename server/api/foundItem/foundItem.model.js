'use strict';

import mongoose from 'mongoose';

var FoundItemSchema = new mongoose.Schema({
  userName: {
  	type: String,
  	required: true
  },
  itemName: {
  	type: String,
  	required: true
  },
  itemDesc:{
    type: String,
    required: true
  },
  fileName: {
  	type: String,
  	required: true
  },
  lat: {
  	type: Number,
  	required: true
  },
  long: {
  	type: Number,
  	required: true
  }
});

export default mongoose.model('FoundItem', FoundItemSchema);
