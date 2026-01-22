import { Service } from '@/types/services.types';
import axios from 'axios';

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/services`;

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, // 10 second timeout
});

// Add response interceptor for better error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.code === 'ECONNABORTED') {
            console.error('API request timeout:', error.config.url);
        } else if (error.response) {
            console.error('API error response:', error.response.status, error.response.data);
        } else if (error.request) {
            console.error('API no response:', error.message);
        } else {
            console.error('API request error:', error.message);
        }
        return Promise.reject(error);
    }
);

const apiServices = {
    getAllServices: async () => {
        try {
            const response = await api.get('/');
            return response.data;
        } catch (error) {
            console.error('Error fetching all services:', error);
            throw error;
        }
    },
    getServiceById: async (id: string) => {
        try {
            const response = await api.get(`/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching service by id ${id}:`, error);
            throw error;
        }
    },
    getServiceBySlug: async (slug: string) => {
        try {
            const response = await api.get(`/slug/${slug}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching service by slug ${slug}:`, error);
            throw error;
        }
    },
    createService: async (service: Service) => {
        try {
            const response = await api.post('/', service);
            return response.data;
        } catch (error) {
            console.error('Error creating service:', error);
            throw error;
        }
    },
    updateService: async (id: string, service: Service) => {
        try {
            const response = await api.put(`/${id}`, service);
            return response.data;
        } catch (error) {
            console.error(`Error updating service ${id}:`, error);
            throw error;
        }
    },
    deleteService: async (id: string) => {
        try {
            const response = await api.delete(`/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error deleting service ${id}:`, error);
            throw error;
        }
    },
}

export default apiServices;
