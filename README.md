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

## Getting Started

1. Clone the repository:
   ```
   git clone https://github.com/your-username/shipping-management-system.git
   ```

2. Install dependencies:
   ```
   cd shipping-management-system
   npm install
   ```

3. Set up your environment variables:
   - Copy `.env.example` to `.env` and fill in your database and Mailtrap credentials.

4. Set up the database:
   ```
   npx prisma db push
   ```

5. Run the development server:
   ```
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## API Routes

- `/api/send-email`: Handles email requests using Mailtrap

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the [MIT License](LICENSE).
