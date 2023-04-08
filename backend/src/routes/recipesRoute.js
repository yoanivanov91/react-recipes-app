const { getAllRecipes, createRecipe, getRecipe, updateRecipe, deleteRecipe, likeRecipe, dislikeRecipe, getMyRecipes, getRecentAndFavoriteAndLiked } = require('../controllers/recipesController');
const { protect, getUser } = require('../middlewares/authMiddleware');

const recipesRoute = require('express').Router();

recipesRoute
    .route('/')
    .get(getAllRecipes)
    .post(protect, createRecipe);

recipesRoute
    .route('/recentPopularLiked')
    .get(getUser, getRecentAndFavoriteAndLiked);

recipesRoute
    .route('/mine')
    .get(protect, getMyRecipes);

// recipesRoute
//     .route('/recent')
//     .get(getLastTenRecipes);

// recipesRoute
//     .route('/popular')
//     .get(getTenMostPopularRecipes);

// recipesRoute
//     .route('/more/category/:recipeId/:category')
//     .get(getTenMoreFromCategory);

// recipesRoute
//     .route('/more/user/:recipeId/:userId')
//     .get(getTenMoreFromUser);

// recipesRoute
//    .route('/liked')
//    .get(protect, getMyLikedRecipes);

recipesRoute
   .route('/like')
   .post(protect, likeRecipe)

recipesRoute
   .route('/dislike')
   .post(protect, dislikeRecipe)

// recipesRoute
//    .route('/:recipeId/dislike')
//    .get(protect, dislikeRecipe)

recipesRoute
   .route('/:slug')
   .get(getUser, getRecipe)

recipesRoute
   .route('/:recipeId')
   .put(protect, updateRecipe)
   .delete(protect, deleteRecipe);

module.exports = recipesRoute;
