const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
   tite: {type: String, required: true, unique: true},
   desciption: {type: String, required: true},
   photo: {type: String, required: false},
   username:{ type: String, required: true},
   categories: {type: Array, required: false}
})


module.exports = mongoose.model('Post', postSchema)