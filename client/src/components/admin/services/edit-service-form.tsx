'use client';

import { useForm, FieldPath } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { serviceFormSchema, ServiceFormData } from './service-form.schema';
import { useState } from 'react';
import useServicesStore from '@/src/store/services.store';
import CloudinaryUploadWidget from './cloudinary-upload-widget';
import { Service } from '@/types/services.types';

type Language = 'az' | 'ru' | 'en';

interface EditServiceFormProps {
  service: Service;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function EditServiceForm({ service, onSuccess, onCancel }: EditServiceFormProps) {
  const [activeLanguage, setActiveLanguage] = useState<Language>('az');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { updateService, error } = useServicesStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ServiceFormData>({
    resolver: zodResolver(serviceFormSchema),
    defaultValues: {
      name: service.name,
      description: service.description,
      image: service.image,
      title1: service.title1 || { az: '', ru: '', en: '' },
      paragraph1: service.paragraph1 || { az: '', ru: '', en: '' },
      title2: service.title2 || { az: '', ru: '', en: '' },
      paragraph2: service.paragraph2 || { az: '', ru: '', en: '' },
      title3: service.title3 || { az: '', ru: '', en: '' },
      paragraph3: service.paragraph3 || { az: '', ru: '', en: '' },
      title4: service.title4 || { az: '', ru: '', en: '' },
      paragraph4: service.paragraph4 || { az: '', ru: '', en: '' },
      title5: service.title5 || { az: '', ru: '', en: '' },
      paragraph5: service.paragraph5 || { az: '', ru: '', en: '' },
      title6: service.title6 || { az: '', ru: '', en: '' },
      paragraph6: service.paragraph6 || { az: '', ru: '', en: '' },
      title7: service.title7 || { az: '', ru: '', en: '' },
      paragraph7: service.paragraph7 || { az: '', ru: '', en: '' },
    },
  });

  const imageUrl = watch('image');

  const onSubmit = async (data: ServiceFormData) => {
    setIsSubmitting(true);
    try {
      await updateService(service._id, data as Service);
      alert('Service updated successfully!');
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      alert('Failed to update service. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const languages: { value: Language; label: string }[] = [
    { value: 'az', label: 'Azərbaycan' },
    { value: 'ru', label: 'Русский' },
    { value: 'en', label: 'English' },
  ];

  return (
    <div className="bg-card rounded-xl shadow-lg p-6 border border-border">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-heading font-semibold text-foreground">
          Edit Service
        </h2>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            ✕
          </button>
        )}
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Language Tabs */}
        <div className="flex space-x-1 border-b border-border">
          {languages.map((lang) => (
            <button
              key={lang.value}
              type="button"
              onClick={() => setActiveLanguage(lang.value)}
              className={`px-4 py-2 font-medium text-sm transition-all duration-200 border-b-2 ${
                activeLanguage === lang.value
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>

        {/* Image Upload - Common for all languages */}
        <CloudinaryUploadWidget
          onUpload={(url) => setValue('image', url, { shouldValidate: true })}
          currentImage={imageUrl}
          error={errors.image?.message}
        />

        {/* Name - Required */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Service Name ({activeLanguage.toUpperCase()}) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register(`name.${activeLanguage}`)}
            className="w-full px-4 py-2 bg-background border border-border rounded-lg 
                     focus:ring-2 focus:ring-primary focus:border-transparent
                     text-foreground placeholder-muted-foreground"
            placeholder="Enter service name"
          />
          {errors.name?.[activeLanguage] && (
            <p className="mt-1 text-sm text-red-500">
              {errors.name[activeLanguage]?.message}
            </p>
          )}
        </div>

        {/* Description - Required */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Description ({activeLanguage.toUpperCase()}) <span className="text-red-500">*</span>
          </label>
          <textarea
            {...register(`description.${activeLanguage}`)}
            rows={4}
            className="w-full px-4 py-2 bg-background border border-border rounded-lg 
                     focus:ring-2 focus:ring-primary focus:border-transparent
                     text-foreground placeholder-muted-foreground resize-none"
            placeholder="Enter service description"
          />
          {errors.description?.[activeLanguage] && (
            <p className="mt-1 text-sm text-red-500">
              {errors.description[activeLanguage]?.message}
            </p>
          )}
        </div>

        {/* Optional Content Sections */}
        <div className="space-y-6 pt-4 border-t border-border">
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Optional Content Sections ({activeLanguage.toUpperCase()})
          </h3>

          {[1, 2, 3, 4, 5, 6, 7].map((num) => (
            <div key={num} className="space-y-3 p-4 bg-background/50 rounded-lg border border-border/50">
              <h4 className="font-medium text-foreground">Section {num}</h4>
              
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Title {num}
                </label>
                <input
                  type="text"
                  {...register(`title${num}.${activeLanguage}` as FieldPath<ServiceFormData>)}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg 
                           focus:ring-2 focus:ring-primary focus:border-transparent
                           text-foreground placeholder-muted-foreground"
                  placeholder={`Enter title ${num}`}
                />
              </div>

              {/* Paragraph */}
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Paragraph {num}
                </label>
                <textarea
                  {...register(`paragraph${num}.${activeLanguage}` as FieldPath<ServiceFormData>)}
                  rows={3}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg 
                           focus:ring-2 focus:ring-primary focus:border-transparent
                           text-foreground placeholder-muted-foreground resize-none"
                  placeholder={`Enter paragraph ${num}`}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4 pt-6 border-t border-border">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 border border-border text-foreground rounded-lg 
                       hover:bg-muted transition-all duration-200 font-medium"
              disabled={isSubmitting}
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-primary hover:bg-primary/90 text-primary-foreground 
                     rounded-lg transition-all duration-200 font-medium
                     focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                     disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Updating...' : 'Update Service'}
          </button>
        </div>
      </form>
    </div>
  );
}
