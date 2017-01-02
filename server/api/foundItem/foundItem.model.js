'use strict';

import mongoose from 'mongoose';

var FoundItemSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('FoundItem', FoundItemSchema);
