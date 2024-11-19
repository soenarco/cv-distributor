import axios from 'axios';
import jwt, { JwtPayload } from 'jsonwebtoken';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://cv-distributor-service.vercel.app';

interface LoginJwtPayload extends JwtPayload {
    id: number;
    role: string;
    name: string;
    phone: string;
    exp: number;
}

export const apiLogin = async (identifier: string, password: string) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, { identifier, password });
        if (response.data?.token) {
            const token = response.data?.token;
            const decoded = jwt.decode(token) as LoginJwtPayload;;
            localStorage.setItem('userLogin', JSON.stringify({
                id: decoded?.id,
                role: decoded?.role,
                name: decoded?.name,
                phone: decoded?.phone,
                exp: decoded?.exp
            }));
        }
        return response.data;
    } catch (error) {
        console.error('Login API Error:', error);
        throw new Error('Login failed');
    }
};

export const apiRegister = async (email: string, username: string, password: string) => {
    try {
        const response = await axios.post(`${API_URL}/auth/register`, { email, username, password });
        return response.data;
    } catch (error) {
        console.error('Register API Error:', error);
        throw new Error('Registration failed');
    }
};

export const apiGetAllProduct = async () => {
    try {
        const response = await axios.get(`${API_URL}/v1/product`);
        return response.data;
    } catch (error) {
        console.error('Fetch Product Error:', error);
        throw new Error('Fetch Product failed');
    }
};


