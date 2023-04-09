import axios from 'axios'

const users = axios.create({
    baseURL: 'http://localhost:5000/api/users',
    headers: {
        'Content-Type': 'application/json'
    }
})

export const getUser = async () => {
    try {
        const response = await users.get('/me');
        return response.data;
    } catch(err) {
        return window.localStorage.removeItem("token");
    }
}

export const login = async (email, password) => {
    try {
        const response = await users.post('/login', {email, password});
        return response.data;
    } catch(err) {
        return err;
    }
}

export const register = async (data) => {
    try {
        const {email, password, firstName, lastName} = data;
        const response = await users.post('/register', {email, password, firstName, lastName});
        return response.data;
    } catch(err) {
        return err;
    }
}

export const logout = () => {
    localStorage.removeItem('token');
}