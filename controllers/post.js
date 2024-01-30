const Post = require('../models/post')



exports.create = async function create(req,res) {

    try {
        const post = await Post.create(req.body)
        res.status(200).json(post)
    } catch (error) {
        res.status(400).json ({msg: error.message})
    }
}


exports.update = async function update(req,res) {
   
    try {
        const updatedPost = await Post.findOneAndUpdate({ _id: req.params.id },req.body,{new: true})
        res.status(200).json(updatedPost)
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}


exports.destroy = async function destroy(req,res) {

    try {
        const deleted = await Post.findOneAndDelete({ _id: req.params.id })
        
        // await req.post.deleteOne()
        // res.status(200).json({msg: `The Post with the id of ${deleted.id}was deleted from the MongoDB database`})
        res.json({message: 'Post Deleted'})
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}