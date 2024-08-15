import express from 'express'
import bodyParser from 'body-parser'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import connectDB from './config/db.mjs'
import userModel from './models/userModel.mjs'
import cors from 'cors'

const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(cors())

connectDB()

app.get('/', (req, res) => {
    res.send('Hello!')
})

app.post('/api/auth/register', async (req, res) => {
    try {
    const {name, email, password, confirmPassword} = req.body
    const hashedpassword = await bcrypt.hash(password, 10)
    const newUser = new userModel({
        name, 
        email, 
        password: hashedpassword
    })

    const existingUser = await userModel.findOne({email})
    
    if (existingUser){
        return res.status(500).json("An account with this email address already exists")
    } else if (!name || !email){
        res.status(500).json("Please complete all fields.")
    }

    if (password === confirmPassword){
        const userCreated = await newUser.save()
        res.status(200).json("User created")
        console.log("User successfully created")
    } else if (password !== confirmPassword){
        res.status(500).json("Passwords do not match")
    } else if (!password) {
        res.status(500).json("Please enter a valid password")
    } else {
        res.status(500).json("User cannot be created")
        console.log("Error creating user")
    }
    } catch (err){
        console.log(err.message)
    }
})

app.post("/api/auth/login", async(req, res) => {
    const { email, password } = req.body

    const user = await userModel.findOne({ email })

    if (!user){
        return res.status(401).json("No user associated with that email address")
    } 

    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    if (!isPasswordCorrect){
        return res.status(401).json("Invalid password")
    }

    const secretKey = process.env.SECRET_KEY

    const payload = {
        name: user.name,
        email: user.email,
        password: user.password
    }

    const token = jwt.sign(payload, secretKey, { expiresIn: "5d" })

    res.status(200).json({
        message: "User is logged in",
        token: token
    })

})



app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})