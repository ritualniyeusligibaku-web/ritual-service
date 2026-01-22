'use client';

import { useRouter } from 'next/navigation';
import { removeAuthCookie } from './login/actions';
import CreateServiceForm from '@/src/components/admin/services/create-service-form';
import { useState, useEffect } from 'react';
import useServicesStore from '@/src/store/services.store';
import EditServiceForm from '@/src/components/admin/services/edit-service-form';
import { Service } from '@/types/services.types';
import Image from 'next/image';

export default function AdminPage() {
  const router = useRouter();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const { services, isLoading, getServices, deleteService } = useServicesStore();

  useEffect(() => {
    getServices();
  }, [getServices]);

  const handleLogout = async () => {
    // Clear the authentication cookie via server action
    await removeAuthCookie();
    // Redirect to login page
    router.push('/admin/login');
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      await deleteService(id);
    }
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setShowCreateForm(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-dark border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-heading font-bold text-primary-foreground">
              Ritual Admin Dashboard
            </h1>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground 
                       rounded-lg transition-all duration-200 font-medium text-sm
                       focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Services Management Section */}
          <div className="bg-card rounded-xl shadow-lg p-6 border border-border">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-heading font-semibold text-foreground">
                Services Management
              </h2>
              <button
                onClick={() => {
                  setShowCreateForm(!showCreateForm);
                  setEditingService(null);
                }}
                className="px-6 py-2 bg-primary hover:bg-primary/90 text-primary-foreground 
                         rounded-lg transition-all duration-200 font-medium
                         focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                {showCreateForm ? 'Cancel' : '+ Create New Service'}
              </button>
            </div>

            {/* Create Service Form */}
            {showCreateForm && (
              <div className="mb-8">
                <CreateServiceForm onSuccess={() => {
                  setShowCreateForm(false);
                  getServices();
                }} />
              </div>
            )}

            {/* Edit Service Form */}
            {editingService && (
              <div className="mb-8">
                <EditServiceForm 
                  service={editingService}
                  onSuccess={() => {
                    setEditingService(null);
                    getServices();
                  }}
                  onCancel={() => setEditingService(null)}
                />
              </div>
            )}
          </div>

          {/* Services List */}
          <div className="bg-card rounded-xl shadow-lg p-6 border border-border">
            <h3 className="text-xl font-heading font-semibold text-foreground mb-6">
              All Services ({services.length})
            </h3>

            {isLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                <p className="mt-4 text-muted-foreground">Loading services...</p>
              </div>
            ) : services.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No services found. Create your first service!</p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {services.map((service) => (
                  <div
                    key={service._id}
                    className="bg-background border border-border rounded-lg overflow-hidden 
                             hover:shadow-lg transition-all duration-200"
                  >
                    {/* Service Image */}
                    <div className="relative h-48 w-full bg-muted">
                      {service.image ? (
                        <Image
                          src={service.image}
                          alt={service.name.en}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <span className="text-muted-foreground">No image</span>
                        </div>
                      )}
                    </div>

                    {/* Service Info */}
                    <div className="p-4">
                      <h4 className="font-semibold text-foreground mb-2 truncate">
                        {service.name.en}
                      </h4>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                        {service.description.en}
                      </p>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(service)}
                          className="flex-1 px-4 py-2 bg-primary hover:bg-primary/90 
                                   text-primary-foreground rounded-lg transition-all duration-200 
                                   font-medium text-sm focus:outline-none focus:ring-2 
                                   focus:ring-primary focus:ring-offset-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(service._id, service.name.en)}
                          className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 
                                   text-white rounded-lg transition-all duration-200 
                                   font-medium text-sm focus:outline-none focus:ring-2 
                                   focus:ring-red-500 focus:ring-offset-2"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}