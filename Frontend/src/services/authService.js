import api from './api.js';

export const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    return data;  // Assuming `data` contains `{ token, user }`
};
// login function: Ye backend ke /auth/login route pe POST request bhejta hai, jisme email aur password
// pass hota hai. Response mein token aur user details milte hain.

export const register = async (username, email, password) => {
    const { data } = await api.post('/auth/register', { username, email, password });
    return data;  // Assuming `data` contains `{ token, user }`
};

export default { login, register };