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
        return res.status(500).json({
            success: false,
            message: "An account with this email address already exists"
        })
    } 

    if (!name){
        return res.status(500).json({
            success: false,
            message: "You must enter a username"
        })
    }

    if (!email){
        return res.status(500).json({
            success: false,
            message: "You must enter an email address"
        })
    }

    if (!password || password.length < 5){
        return res.status(500).json({
            success: false,
            message: "You must enter a valid password"
        })
    }

    if (password !== confirmPassword){
        return res.status(500).json({
            success: false,
            message: "Passwords do not match"
        })
    } else {
        const userCreated = await newUser.save()
        return res.status(200).json({
            success: true,
            message: "User created"
        })
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
        password: user.password,
    }

    const token = jwt.sign(payload, secretKey, { expiresIn: "1d" })


    res.status(200).json({
        message: "User is logged in",
        token: token
    })

})

app.get("/api/auth/getUser", async(req, res) => {
    const authHeader = req.headers['authorisation']
    
    if (authHeader){
        const token = authHeader.split(" ")[1]
        const secretKey = process.env.SECRET_KEY
        const decodedToken = jwt.verify(token, secretKey)

        const name = decodedToken.name
        const email = decodedToken.email

        return res.status(200).json({
            success: true,
            message: "User details identified",
            payload: { name, email }
        })

        console.log(decodedToken.name)
    } else {
        res.status(500).json({
            success: false,
            message: "Unauthorised"
        })
    }



})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})