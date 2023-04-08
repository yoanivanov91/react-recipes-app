const mongoose = require('mongoose');

const likeSchema = mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    recipeId: {
        type: mongoose.Types.ObjectId,
        ref: 'Recipe',
        required: true
    }
},
{
    timestamps: true
});

const Like = mongoose.model('Like', likeSchema);

module.exports = Like;