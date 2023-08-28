const { sequelize, user } = require('./models')
const express = require('express')
const app = express()
app.use(express.json())

//POST new user details

app.post('/users', async(req, res) =>{
    const{name, email, number} = req.body
    
    try {
        const users = await user.create({name, email, number})
        return res.json(users)
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
})

//GET all user 

app.get('/users', async(req, res) =>{
    try {
        const users = await user.findAll()

        return res.json(users)
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:'Something went wrong'})
    }
})

// GET single user

app.get('/users/:uuid', async(req, res) =>{
    const uuid = req.params.uuid
    try {
        const users = await user.findOne({
            where: {uuid}
        })

        return res.json(users)
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:'User not found'})
    }
})

// DELETE user

app.delete('/users/:uuid', async(req, res) =>{
    const uuid = req.params.uuid
    try {
        const users = await user.findOne({
            where: {uuid}
        })
        await users.destroy()
        return res.json({message:'User deleted successfully!'})
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:'User not found'})
    }
})
 
// Update the existing user

app.put('/users/:uuid', async(req, res) =>{
    const uuid = req.params.uuid
    const {name, email, number} = req.body;
    try {
        const existingUser = await user.findOne({
            where: {uuid}
        })

        if (!existingUser){
            return res.status(404).json({message:'User not found'})
        }
        if (name){
            existingUser.name = name
        }
        if (email){
            existingUser.email = email
        }
        if (number){
            existingUser.number = number
        }

        await existingUser.save();
        return res.json(existingUser)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:'Error updating user data'})
    }
})

app.listen(5000, async() =>{
    console.log('server up and running on http://localhost:5000')
    await sequelize.authenticate()
    console.log('database connected')
})
    

