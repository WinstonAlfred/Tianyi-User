# Shipping Management System
A Next.js 14 application for tracking and managing shipments, built with TypeScript, PostgreSQL, Tailwind CSS, and Prisma.

## Features
- Shipment tracking
- Ship and shipment management
- Contact form with email integration (using Mailtrap)
- Responsive design with Tailwind CSS
- Search functionality for efficient data retrieval
- Pagination for improved navigation through large datasets

## Tech Stack
- [Next.js 14](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Prisma](https://www.prisma.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Mailtrap](https://mailtrap.io/) for email handling

## Project Structure
```
.
├── app/
│   ├── api/
│   │   └── send-email/
│   ├── contact/
│   ├── details/
│   ├── ship/
│   ├── shipment/
│   └── tracking/
├── components/
├── lib/
│   └── get/
├── prisma/
└── public/
```

## Web Application Features
- **Search Function**: Users can quickly find specific shipments, ships, or other relevant data using the integrated search feature.
- **Pagination**: Large sets of data are divided into pages for easier navigation and improved performance.

## API Routes
- `/api/send-email`: Handles email requests using Mailtrap

## Visit The Website
https://tianyi-user.vercel.app/

