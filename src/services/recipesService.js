import axios from 'axios'

const recipes = axios.create({
    baseURL: 'http://localhost:5000/api/recipes',
    headers: {
        'Content-Type': 'application/json'
    }
})

recipes.interceptors.request.use(function (config) {
    const token = window.localStorage.getItem('token');
    config.headers.Authorization =  token ? `Bearer ${token}` : '';
    return config;
  });

export const getAllRecipes = async () => {
    const response = await recipes.get('/');
    return response.data;
}

export const getMyRecipes = async () => {
    const response = await recipes.get('/mine');
    return response.data;
}

export const getRecentAndPopularAndLiked = async () => {
    const response = await recipes.get('/recentPopularLiked');
    return response.data;
}

export const likeRecipe = async (recipeId) => {
    try {
        const response = await recipes.post('/like', {recipeId});
        return response.data;
    } catch(err) {
        return err;
    }
}

export const dislikeRecipe = async (recipeId) => {
    try {
        const response = await recipes.post('/dislike', {recipeId});
        return response.data;
    } catch(err) {
        return err;
    }
}

export const getRecipe = async (data) => {
    const response = await recipes.get(`/${data.queryKey[1]}`);
    return response.data;
}

export const addRecipe = async (recipe) => {
    const response = await recipes.post('/', recipe);
    return response.data;
}

export const editRecipe = async (recipeId, recipe) => {
    const response = await recipes.put(`/${recipeId}`, recipe);
    return response.data;
}

export const deleteRecipe = async (recipeId) => {
    const response = await recipes.delete(`/${recipeId}`);
    return response.data;
}