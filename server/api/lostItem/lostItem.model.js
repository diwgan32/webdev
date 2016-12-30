'use strict';

import mongoose from 'mongoose';

var LostItemSchema = new mongoose.Schema({
  userName: {
  	type: String,
  	required: true
  },
  itemName: {
  	type: String,
  	required: true
  },
  itemDesc: {
  	type: String,
  	required: true
  },
  lats: {
  	type: Array,
  	required: true
  },
  longs: {
  	type: Array,
  	required: true
  }
});

export default mongoose.model('LostItem', LostItemSchema);
