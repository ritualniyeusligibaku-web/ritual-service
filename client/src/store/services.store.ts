import { create } from 'zustand';
import { Service } from '@/types/services.types';
import apiServices from '../services/api.services';

interface ServicesState {
    services: Service[];
    isLoading: boolean;
    error: string | null;
    getServices: () => Promise<void>;
    getServiceById: (id: string) => Promise<void>;
    createService: (service: Service) => Promise<void>;
    updateService: (id: string, service: Service) => Promise<void>;
    deleteService: (id: string) => Promise<void>;
}

const useServicesStore = create<ServicesState>((set, get) => ({
    services: [],
    isLoading: false,
    error: null,

    getServices: async () => {
        set({ isLoading: true, error: null });
        try {
            const services = await apiServices.getAllServices();
            set({ services, isLoading: false });
        } catch (error) {
            set({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
            set({ isLoading: false });
            return;
        } 
    },
    getServiceById: async (id: string) => {
        set({ isLoading: true, error: null });
        try {
            const service = await apiServices.getServiceById(id);
            set({ services: [service], isLoading: false });
        } catch (error) {
            set({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
            set({ isLoading: false });
            return;
        } finally {
            set({ isLoading: false });
        }
    },
    createService: async (service: Service) => {    
        set({ isLoading: true, error: null });
        try {
            const newService = await apiServices.createService(service);
            set({ services: [...get().services, newService], isLoading: false });
        } catch (error) {
            set({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
            set({ isLoading: false });
            return;
        }
    },
    updateService: async (id: string, service: Service) => {
        set({ isLoading: true, error: null });
        try {
            const updatedService = await apiServices.updateService(id, service);
            set({ services: get().services.map(s => s._id === id ? updatedService : s), isLoading: false });
        } catch (error) {
            set({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
            set({ isLoading: false });
            return;
        }
    },
    deleteService: async (id: string) => {
        set({ isLoading: true, error: null });
        try {
            await apiServices.deleteService(id);
            set({ services: get().services.filter(s => s._id !== id), isLoading: false });
        } catch (error) {
            set({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
            set({ isLoading: false });
            return;
        }
    }
}));

export default useServicesStore;