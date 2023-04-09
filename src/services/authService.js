import axios from 'axios'

const users = axios.create({
    baseURL: 'http://localhost:5000/api/users'
})

export const getUser = async () => {
    try {
        const response = await users.get('/me', {
            headers: {
                'Authorization': 'Bearer ' + window.localStorage.getItem("token")
            }
        });
        return response.data;
    } catch(err) {
        return window.localStorage.removeItem("token");
    }
}

export const login = async (email, password) => {
    const response = await users.post('/login', {email, password}, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.data;
}

export const register = async (email, password) => {
    const response = await users.post('/register', {email, password}, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.data;
}

export const logout = () => {
    localStorage.removeItem('token');
}