"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export default function ContactForm() {
  const t = useTranslations("ContactPage.form");
  
  const [formData, setFormData] = useState({
    fullName: "",
    role: "",
    email: "",
    serviceType: "",
    date: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      // TODO: Implement form submission logic
      // For now, just simulate a successful submission
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      setSubmitStatus({
        type: "success",
        message: t("successMessage"),
      });
      
      // Reset form
      setFormData({
        fullName: "",
        role: "",
        email: "",
        serviceType: "",
        date: "",
        message: "",
      });
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: t("errorMessage"),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      {/* Full Name */}
      <div className="space-y-3">
        <label
          htmlFor="fullName"
          className="block text-sm tracking-wider text-gray-900 uppercase"
        >
          {t("fullName.label")}: <span className="text-xs">({t("required")})</span>
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
          placeholder={t("fullName.placeholder")}
          className="w-full px-0 py-3 text-base text-gray-400 placeholder:text-gray-300 bg-transparent border-b border-gray-300 focus:border-gray-900 focus:outline-none transition-colors"
        />
      </div>

      {/* Role/Relationship */}
      <div className="space-y-3">
        <label
          htmlFor="role"
          className="block text-sm tracking-wider text-gray-900 uppercase"
        >
          {t("role.label")}: <span className="text-xs">({t("required")})</span>
        </label>
        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
          className="w-full px-0 py-3 text-base text-gray-400 bg-transparent border-b border-gray-300 focus:border-gray-900 focus:outline-none transition-colors appearance-none cursor-pointer"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23d1d5db'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 0.5rem center",
            backgroundSize: "1.5rem",
          }}
        >
          <option value="">{t("role.placeholder")}</option>
          <option value="family">{t("role.options.family")}</option>
          <option value="friend">{t("role.options.friend")}</option>
          <option value="organization">{t("role.options.organization")}</option>
          <option value="other">{t("role.options.other")}</option>
        </select>
      </div>

      {/* Email */}
      <div className="space-y-3">
        <label
          htmlFor="email"
          className="block text-sm tracking-wider text-gray-900 uppercase"
        >
          {t("email.label")}: <span className="text-xs">({t("required")})</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder={t("email.placeholder")}
          className="w-full px-0 py-3 text-base text-gray-400 placeholder:text-gray-300 bg-transparent border-b border-gray-300 focus:border-gray-900 focus:outline-none transition-colors"
        />
      </div>

      {/* Service Type */}
      <div className="space-y-3">
        <label
          htmlFor="serviceType"
          className="block text-sm tracking-wider text-gray-900 uppercase"
        >
          {t("serviceType.label")}: <span className="text-xs">({t("required")})</span>
        </label>
        <select
          id="serviceType"
          name="serviceType"
          value={formData.serviceType}
          onChange={handleChange}
          required
          className="w-full px-0 py-3 text-base text-gray-400 bg-transparent border-b border-gray-300 focus:border-gray-900 focus:outline-none transition-colors appearance-none cursor-pointer"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23d1d5db'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 0.5rem center",
            backgroundSize: "1.5rem",
          }}
        >
          <option value="">{t("serviceType.placeholder")}</option>
          <option value="full">{t("serviceType.options.full")}</option>
          <option value="burial">{t("serviceType.options.burial")}</option>
          <option value="cremation">{t("serviceType.options.cremation")}</option>
          <option value="memorial">{t("serviceType.options.memorial")}</option>
          <option value="transportation">{t("serviceType.options.transportation")}</option>
          <option value="other">{t("serviceType.options.other")}</option>
        </select>
      </div>

      {/* Date */}
      <div className="space-y-3">
        <label
          htmlFor="date"
          className="block text-sm tracking-wider text-gray-900 uppercase"
        >
          {t("date.label")}: <span className="text-xs">({t("required")})</span>
        </label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          placeholder={t("date.placeholder")}
          className="w-full px-0 py-3 text-base text-gray-400 placeholder:text-gray-300 bg-transparent border-b border-gray-300 focus:border-gray-900 focus:outline-none transition-colors"
        />
      </div>

      {/* Message (Optional) */}
      <div className="space-y-3">
        <label
          htmlFor="message"
          className="block text-sm tracking-wider text-gray-900 uppercase"
        >
          {t("message.label")}: <span className="text-xs text-gray-500">({t("optional")})</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          placeholder={t("message.placeholder")}
          className="w-full px-0 py-3 text-base text-gray-400 placeholder:text-gray-300 bg-transparent border-b border-gray-300 focus:border-gray-900 focus:outline-none transition-colors resize-none"
        />
      </div>

      {/* Submit Status */}
      {submitStatus.type && (
        <div
          className={`p-4 rounded-md ${
            submitStatus.type === "success"
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          {submitStatus.message}
        </div>
      )}

      {/* Submit Button */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full md:w-auto px-12 py-4 bg-gray-900 text-white text-sm tracking-wider uppercase font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? t("submitting") : t("submit")}
        </button>
      </div>
    </form>
  );
}
