const Service = require("../model/service.model");

// Get all services
const getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: "Error fetching services", error: error.message });
  }
};

// Get service by ID
const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: "Error fetching service", error: error.message });
  }
};

// Get service by slug
const getServiceBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    
    if (!slug) {
      return res.status(400).json({ message: "Slug parameter is required" });
    }
    
    console.log(`Fetching service by slug: ${slug}`);
    const service = await Service.findOne({ slug });
    
    if (!service) {
      console.warn(`Service not found for slug: ${slug}`);
      return res.status(404).json({ message: "Service not found", slug });
    }
    
    res.status(200).json(service);
  } catch (error) {
    console.error(`Error fetching service by slug ${req.params.slug}:`, error);
    res.status(500).json({ message: "Error fetching service", error: error.message });
  }
};

// Create new service
const createService = async (req, res) => {
  try {
    const { 
      name, 
      description, 
      image, 
      title1, 
      paragraph1, 
      title2, 
      paragraph2, 
      title3, 
      paragraph3, 
      title4, 
      paragraph4, 
      title5, 
      paragraph5, 
      title6, 
      paragraph6, 
      title7, 
      paragraph7 
    } = req.body;
    
    // Validate required fields
    if (!name || !name.az || !name.ru || !name.en) {
      return res.status(400).json({ message: "Name is required in all languages (az, ru, en)" });
    }
    
    if (!description || !description.az || !description.ru || !description.en) {
      return res.status(400).json({ message: "Description is required in all languages (az, ru, en)" });
    }
    
    if (!image) {
      return res.status(400).json({ message: "Image is required" });
    }

    // Generate slug from English name
    const slug = name.en
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-')     // Replace spaces with hyphens
      .replace(/-+/g, '-');     // Replace multiple hyphens with single hyphen

    // Check if slug already exists
    const existingService = await Service.findOne({ slug });
    if (existingService) {
      return res.status(400).json({ message: "A service with this name already exists" });
    }

    // Build service object
    const serviceData = {
      name,
      slug,
      description,
      image,
    };

    // Add optional titles and paragraphs if provided
    if (title1) serviceData.title1 = title1;
    if (paragraph1) serviceData.paragraph1 = paragraph1;
    if (title2) serviceData.title2 = title2;
    if (paragraph2) serviceData.paragraph2 = paragraph2;
    if (title3) serviceData.title3 = title3;
    if (paragraph3) serviceData.paragraph3 = paragraph3;
    if (title4) serviceData.title4 = title4;
    if (paragraph4) serviceData.paragraph4 = paragraph4;
    if (title5) serviceData.title5 = title5;
    if (paragraph5) serviceData.paragraph5 = paragraph5;
    if (title6) serviceData.title6 = title6;
    if (paragraph6) serviceData.paragraph6 = paragraph6;
    if (title7) serviceData.title7 = title7;
    if (paragraph7) serviceData.paragraph7 = paragraph7;

    const service = new Service(serviceData);
    await service.save();
    
    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ message: "Error creating service", error: error.message });
  }
};

// Update service
const updateService = async (req, res) => {
  try {
    const { 
      name, 
      description, 
      image, 
      title1, 
      paragraph1, 
      title2, 
      paragraph2, 
      title3, 
      paragraph3, 
      title4, 
      paragraph4, 
      title5, 
      paragraph5, 
      title6, 
      paragraph6, 
      title7, 
      paragraph7 
    } = req.body;
    
    // Build update object
    const updateData = {};
    
    if (name) {
      updateData.name = name;
      // Regenerate slug if name is updated
      const slug = name.en
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
      
      // Check if slug already exists (excluding current service)
      const existingService = await Service.findOne({ 
        slug, 
        _id: { $ne: req.params.id } 
      });
      if (existingService) {
        return res.status(400).json({ message: "A service with this name already exists" });
      }
      updateData.slug = slug;
    }
    if (description) updateData.description = description;
    if (image) updateData.image = image;
    if (title1) updateData.title1 = title1;
    if (paragraph1) updateData.paragraph1 = paragraph1;
    if (title2) updateData.title2 = title2;
    if (paragraph2) updateData.paragraph2 = paragraph2;
    if (title3) updateData.title3 = title3;
    if (paragraph3) updateData.paragraph3 = paragraph3;
    if (title4) updateData.title4 = title4;
    if (paragraph4) updateData.paragraph4 = paragraph4;
    if (title5) updateData.title5 = title5;
    if (paragraph5) updateData.paragraph5 = paragraph5;
    if (title6) updateData.title6 = title6;
    if (paragraph6) updateData.paragraph6 = paragraph6;
    if (title7) updateData.title7 = title7;
    if (paragraph7) updateData.paragraph7 = paragraph7;
    
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: "Error updating service", error: error.message });
  }
};

// Delete service
const deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting service", error: error.message });
  }
};

module.exports = {
  getAllServices,
  getServiceById,
  getServiceBySlug,
  createService,
  updateService,
  deleteService,
};
