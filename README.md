# Shipping Management System
A Next.js 14 application for tracking and managing shipments, built with TypeScript, PostgreSQL, Tailwind CSS, and Prisma.

## Features
- Shipment tracking
- Ship and shipment management
- Contact form with email integration (using Mailtrap)
- Responsive design with Tailwind CSS

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

## API Routes
- `/api/send-email`: Handles email requests using Mailtrap

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.
