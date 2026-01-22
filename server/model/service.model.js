const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  name: {
    az: { type: String, required: true },
    ru: { type: String, required: true },
    en: { type: String, required: true },
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    az: { type: String, required: true },
    ru: { type: String, required: true },
    en: { type: String, required: true },
  },
  image: {
    type: String,
    required: true,
  },
  title1: {
    az: { type: String, required: false },
    ru: { type: String, required: false },
    en: { type: String, required: false },
  },
  paragraph1: {
    az: { type: String, required: false },
    ru: { type: String, required: false },
    en: { type: String, required: false },
  },
  title2: {
    az: { type: String, required: false },
    ru: { type: String, required: false },
    en: { type: String, required: false },
  },
  paragraph2: {
    az: { type: String, required: false },
    ru: { type: String, required: false },
    en: { type: String, required: false },
  },
  title3: {
    az: { type: String, required: false },
    ru: { type: String, required: false },
    en: { type: String, required: false },
  },
  paragraph3: {
    az: { type: String, required: false },
    ru: { type: String, required: false },
    en: { type: String, required: false },
  },
  title4: {
    az: { type: String, required: false },
    ru: { type: String, required: false },
    en: { type: String, required: false },
  },
  paragraph4: {
    az: { type: String, required: false },
    ru: { type: String, required: false },
    en: { type: String, required: false },
  },
  title5: {
    az: { type: String, required: false },
    ru: { type: String, required: false },
    en: { type: String, required: false },
  },
  paragraph5: {
    az: { type: String, required: false },
    ru: { type: String, required: false },
    en: { type: String, required: false },
  },
  title6: {
    az: { type: String, required: false },
    ru: { type: String, required: false },
    en: { type: String, required: false },
  },
  paragraph6: {
    az: { type: String, required: false },
    ru: { type: String, required: false },
    en: { type: String, required: false },
  },
  title7: {
    az: { type: String, required: false },
    ru: { type: String, required: false },
    en: { type: String, required: false },
  },
  paragraph7: {
    az: { type: String, required: false },
    ru: { type: String, required: false },
    en: { type: String, required: false },
  },
}, {
  timestamps: true,
});

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;