const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create Schema
const IdeaSchema = new Schema({
  productId: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  productName: {
    type: String,
    required: true
  },
  vendor: {
    type: String,
    required: true
  },
  mrp: {
    type: String,
    required: true
  },
  batchNum: {
    type: String,
    required: true
  },
  batchDate: {
    type: String,
    required: true
  },
  quantity: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  }
});
mongoose.model("ideas", IdeaSchema);