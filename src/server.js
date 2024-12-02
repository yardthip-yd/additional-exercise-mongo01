const express = require("express");
const app = express()

require("dotenv").config()

const mongodbConnect = require("./database/mongo")
const userModel = require("./models/user.model");
const { default: mongoose } = require("mongoose");

// Connect to mongodb
mongodbConnect()

// app.use(express.json())

app.post("*", express.json())
app.patch("*", express.json())
app.put("*", express.json())

// Create data
app.post("/", async (req, res) => {
    const { name, email } = req.body
    console.log(name, email)
    const data = await userModel.create({ name, email })
    // res.status(200).json({ hello: "world" })
    res.status(201).send("Created data")
})

// Get user data
app.get("/all", async (req, res) => {
    const data = await userModel.find({})
    res.status(200).json({ users: data })
})

// Update user data
app.patch("/:id", async (req, res) => {
    const { id } = req.params; 
    const { name } = req.body; 
    const user = await userModel.updateOne({ _id: id }, { name });
    res.status(200).json({ data: user });
});

// Delete user data
app.delete("/:id", async (req, res) => {
    const { id } = req.params;
    await userModel.deleteOne({ _id: id })
    res.status(204).send("Deleted data")
})

const port = process.env.PORT
app.listen(port, () => console.log("server run on port:", port))