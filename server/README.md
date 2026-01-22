# Ritual Landing Page Server

A simple Express server for managing services on the landing page with multilingual support (Azerbaijani, Russian, English).

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file based on `.env.example`:
```bash
PORT=5555
MONGODB_URI=mongodb://localhost:27017/ritual
```

3. Start the server:
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

## API Endpoints

### Services

#### Get All Services
**GET** `/api/services`

Response:
```json
[
  {
    "_id": "...!", 
    "name": { 
      "az": "Xidmət adı",
      "ru": "Название услуги",
      "en": "Service Name"
    },
    "description": {
      "az": "Xidmət təsviri",
      "ru": "Описание услуги",
      "en": "Service Description"
    },
    "image": "https://example.com/image.jpg",
    "title1": {
      "az": "Başlıq 1",
      "ru": "Заголовок 1",
      "en": "Title 1"
    },
    "paragraph1": {
      "az": "Əlavə məlumat 1",
      "ru": "Дополнительная информация 1",
      "en": "Additional info 1"
    },
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

#### Get Service by ID
**GET** `/api/services/:id`

#### Create New Service
**POST** `/api/services`

Request body:
```json
{
  "name": {
    "az": "Dəfn xidməti",
    "ru": "Похоронная услуга",
    "en": "Funeral Service"
  },
  "description": {
    "az": "Tam dəfn xidməti təşkili",
    "ru": "Полная организация похоронной услуги",
    "en": "Complete funeral service organization"
  },
  "image": "https://example.com/service-image.jpg",
  "title1": {
    "az": "Başlıq 1",
    "ru": "Заголовок 1",
    "en": "Title 1"
  },
  "paragraph1": {
    "az": "Əlavə məlumat 1",
    "ru": "Дополнительная информация 1",
    "en": "Additional information 1"
  },
  "title2": {
    "az": "Başlıq 2",
    "ru": "Заголовок 2",
    "en": "Title 2"
  },
  "paragraph2": {
    "az": "Əlavə məlumat 2",
    "ru": "Дополнительная информация 2",
    "en": "Additional information 2"
  },
  "title3": {
    "az": "Başlıq 3",
    "ru": "Заголовок 3",
    "en": "Title 3"
  },
  "paragraph3": {
    "az": "Əlavə məlumat 3",
    "ru": "Дополнительная информация 3",
    "en": "Additional information 3"
  },
  "title4": {
    "az": "Başlıq 4",
    "ru": "Заголовок 4",
    "en": "Title 4"
  },
  "paragraph4": {
    "az": "Əlavə məlumat 4",
    "ru": "Дополнительная информация 4",
    "en": "Additional information 4"
  },
  "title5": {
    "az": "Başlıq 5",
    "ru": "Заголовок 5",
    "en": "Title 5"
  },
  "paragraph5": {
    "az": "Əlavə məlumat 5",
    "ru": "Дополнительная информация 5",
    "en": "Additional information 5"
  },
  "title6": {
    "az": "Başlıq 6",
    "ru": "Заголовок 6",
    "en": "Title 6"
  },
  "paragraph6": {
    "az": "Əlavə məlumat 6",
    "ru": "Дополнительная информация 6",
    "en": "Additional information 6"
  },
  "title7": {
    "az": "Başlıq 7",
    "ru": "Заголовок 7",
    "en": "Title 7"
  },
  "paragraph7": {
    "az": "Əlavə məlumat 7",
    "ru": "Дополнительная информация 7",
    "en": "Additional information 7"
  }
}
```

**Note:** 
- `name`, `description`, and `image` are **required**
- `title1`/`paragraph1`, `title2`/`paragraph2`, `title3`/`paragraph3`, `title4`/`paragraph4`, `title5`/`paragraph5`, `title6`/`paragraph6`, `title7`/`paragraph7` are **optional**
- All text fields must include translations in all 3 languages (az, ru, en)
- Each paragraph can have its own title

#### Update Service
**PUT** `/api/services/:id`

Request body (all fields optional):
```json
{
  "name": {
    "az": "Yenilənmiş ad",
    "ru": "Обновленное название",
    "en": "Updated Name"
  },
  "description": {
    "az": "Yenilənmiş təsvir",
    "ru": "Обновленное описание",
    "en": "Updated Description"
  },
  "image": "https://example.com/new-image.jpg"
}
```

#### Delete Service
**DELETE** `/api/services/:id`

Response:
```json
{
  "message": "Service deleted successfully"
}
```

## Project Structure

```
server/
├── app.js                      # Main application file
├── config/
│   └── db.js                  # Database connection
├── controllers/
│   └── service.controller.js  # Service business logic
├── model/
│   └── service.model.js       # Service schema (multilingual)
└── routes/
    └── service.route.js       # Service routes
```

## Supported Languages

- **az** - Azerbaijani (Azərbaycan dili)
- **ru** - Russian (Русский)
- **en** - English
