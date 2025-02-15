const mongoose = require('mongoose')

const Schema = mongoose.Schema

const todoSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        maxlength: [100, "Title should be less than 100 chars"],
        trim: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

const ToDo = mongoose.model('todoitems', todoSchema)

module.exports = ToDo