const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
   tite: {type: String, required: true, unique: true},
   desciption: {type: String, required: true},
   username:{ type: String, required: true},
})


module.exports = mongoose.model('Post', postSchema)