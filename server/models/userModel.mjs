import express from "express"
import { Schema, mongoose } from "mongoose"

const userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
}, {timestamps: true})

const userModel = mongoose.model('User', userSchema)

export default userModel 



// Country model with countries and ids of all the countries. Have country property with array in user model. WIth liked posts, would add liked post to your user schema. In the post schema, would have total likes.