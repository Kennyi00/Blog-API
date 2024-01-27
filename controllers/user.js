const User = require('../models/user')
const bcrypt = require('bcrypt')


exports.createUser = async function create(req,res) {
    try {
        const user = new User(req.body)
        await user.save()
        res.status(200).json({user})
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}


exports.loginUser = async(req,res) => {
    try {
        const user = await User.findOne({email: req.body.email})
        if(!user || !await bcrypt.compare(req.body.password, user.password))
        res.status(400).send('Invalid login credentials')
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}


exports.updateUser = async function update(req,res) {
    try {
        const updates = Object.keys(req.body)
        const user = await User.findOne({ _id: req.params.id })
        updates.forEach(update => user[update]= req.body[update])
        await user.save()
        res.json(user)
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}


exports.deleteUser = async function destroy(req,res) {
    try {
        await req.user.deleteOne()
        res.json({message: 'User Deleted'})
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}