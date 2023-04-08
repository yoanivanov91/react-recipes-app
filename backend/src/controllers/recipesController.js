const asyncHandler = require('express-async-handler');
const Recipe = require('../models/Recipe');
const Like = require('../models/Like');

const getAllRecipes = asyncHandler(async (req, res) => {
    const recipes = await Recipe.find({}).sort({createdAt: -1});
    res.status(200).json(recipes);
});

const getRecentAndFavoriteAndLiked = asyncHandler(async (req, res) => {
    let recent = await Recipe.find({}).sort({createdAt: -1}).limit(10).lean();
    let popular = await Recipe.find({}).sort({likes: -1, createdAt: -1}).limit(10).lean();
    let liked = [];
    if(req.user) {
        liked = await Like.find({}).sort({createdAt: -1}).limit(10).populate('recipeId').lean();
    }
    res.status(200).json({
        recent, 
        popular, 
        liked
    })
});

const getMyRecipes = asyncHandler(async (req, res) => {
    const mine = await Recipe.find({owner: req.user._id}).sort({createdAt: -1});
    let liked = await Like.find({userId: req.user._id}).sort({createdAt: -1}).populate('recipeId')
    liked = liked.map(recipe => recipe.recipeId);
    res.status(200).json({
        mine,
        liked
    });
});

const getRecipe = asyncHandler(async (req, res) => {
    let recipe = await Recipe.findOne({slug: req.params.slug}).populate('owner').lean();

    if(!recipe) {
        res.status(400);
        throw new Error('Recipe not found');
    }

    const tenMoreFromCategory = await Recipe.find({category: recipe.category, _id: { $ne: recipe._id }}).sort({likes: -1, createdAt: -1}).limit(10);
    const tenMoreFromUser = await Recipe.find({owner: recipe.owner._id, _id: { $ne: recipe._id }}).sort({likes: -1, createdAt: -1}).limit(10);

    if(req.user) {
        const liked = await Like.find({userId: req.user._id});
        recipe = {...recipe, alreadyLiked: liked.some(likedRecipe => likedRecipe.recipeId.toString() == recipe._id)};
    }

    res.status(200).json({
        recipe,
        tenMoreFromCategory,
        tenMoreFromUser
    });
});

const createRecipe = asyncHandler(async (req, res) => {
    const {title, category, image, ingredients, description, time } = req.body;
    if(title == '' || category == '' || image == '' || ingredients.length == 0 || description == '' || time == '') {
        res.status(400)
        throw new Error(`Please fill out the required fields`);
    }
    
    const recipe = await Recipe.create({
        title,
        category,
        image,
        ingredients,
        description,
        time,
        likes: 0,
        owner: req.user._id
    });
    res.status(200).json(recipe);
});

const updateRecipe = asyncHandler(async (req, res) => {
    const {title, category, image, ingredients, description, time } = req.body;
    if(title == '' || category == '' || image == '' || ingredients.length == 0 || description == '' || time == '') {
        res.status(400)
        throw new Error(`Please fill out the required fields`);
    }

    const recipe = await Recipe.findOne({_id: req.params.recipeId});

    if(!recipe) {
        res.status(400);
        throw new Error('Recipe not found');
    }
    
    if (recipe.owner.toString() != req.user._id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedRecipe = await Recipe.findOneAndUpdate({_id: req.params.recipeId}, req.body, {
        new: true
    });

    res.status(200).json(updatedRecipe);
});

const deleteRecipe = asyncHandler(async (req, res) => {
    const recipe = await Recipe.findOne({_id: req.params.recipeId});

    if(!recipe) {
        res.status(400);
        throw new Error('Recipe not found');
    }

    if (recipe.owner.toString() != req.user._id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const deletedRecipe = await Recipe.findOneAndDelete({_id: req.params.recipeId});
    await Like.deleteMany({recipeId: req.params.recipeId});
    res.status(200).json(deletedRecipe);
});

const likeRecipe = asyncHandler(async (req, res) => {
    const {recipeId} = req.body;

    if(!recipeId) {
        res.status(400);
        throw new Error('Recipe ID is required');
    }

    const alreadyLiked = await Like.findOne({userId: req.user._id, recipeId});
    if(alreadyLiked) {
        res.status(401)
        throw new Error('You\'ve already liked this recipe')
    }

    const like = await Like.create({
        userId: req.user._id,
        recipeId
    });

    const recipe = await Recipe.findOne({_id: recipeId});
    recipe.likes += 1;
    await recipe.save();

    res.status(200).json(like);
});

const dislikeRecipe = asyncHandler(async (req, res) => {
    const {recipeId} = req.body;

    if(!recipeId) {
        res.status(400);
        throw new Error('Recipe ID is required');
    }

    const like = await Like.findOne({userId: req.user._id, recipeId});
    if(!like) {
        res.status(400);
        throw new Error('This recipe hasn\'t been liked yet');
    }

    const deletedRecipe = await Like.findOneAndDelete({_id: like._id});

    const recipe = await Recipe.findOne({_id: recipeId});
    recipe.likes = recipe.likes == 0 ? 0 : recipe.likes - 1;
    await recipe.save();
    
    res.status(200).json(deletedRecipe);
});

module.exports = {
    getAllRecipes,
    getMyRecipes,
    getRecentAndFavoriteAndLiked,
    getRecipe,
    createRecipe,
    updateRecipe,
    deleteRecipe,
    likeRecipe,
    dislikeRecipe
}