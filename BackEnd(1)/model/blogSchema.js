const mongoose = require('mongoose');
const comment = require('../model/commentSchema');

const blogSchema = mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true
    },
    authorDetail: {
      type: mongoose.Schema.Types.ObjectId, //Since we will be using populate this field
      ref: 'users'
     },
   
     comments: [comment]
    
});
module.exports = mongoose.model('blog', blogSchema);
