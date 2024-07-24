
# Issues Tracking System
## Overview
The Issues Tracking System is a comprehensive web application designed to help teams and organizations efficiently track, manage, and resolve issues. It features a user-friendly dashboard for streamlining issue management and integrates with other tools to enhance workflow efficiency. The system is built using modern web technologies and is deployed on Vercel.

## Features
- Issue Reporting: Allows users to report issues with detailed descriptions (e.g., bug, task, improvement).
- Assignment and Workflow: Enables issues to be assigned to team members and managed through customizable workflows.
- Search and Filters: Provides advanced search and filtering options to quickly locate and manage specific issues.
- Dashboards and Reporting: Offers customizable dashboards and detailed reports, including various metrics.
- Integration: Integrates with other tools and platforms (e.g., GitHub) to streamline workflows and ensure seamless data exchange.
## Technologies Used
- Front-End: Next.js
- Back-End: Next.js
- Database: MongoDB
- ORM: Prisma
- Styling: Tailwind CSS
- Deployment: Vercel
## Installation
Clone the Repository

```bash
git clone https://github.com/B182155/issues-tracking-system.git
cd issues-tracking-system
```
Install Dependencies

```bash
npm install
```
## Set Up Environment Variables

Create a .env file in the root directory and add the necessary environment variables. You can refer to the .env.example file for guidance.

## Run Migrations

```bash
npx prisma migrate dev
```
Start the Development Server

```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Usage
- Report an Issue: Navigate to the issue reporting page and follow the prompts to report a new issue.
- Assign Issues: Assign issues to team members and manage the workflow.
- Search and Filter: Use the search and filter options to find specific issues quickly.
- Dashboard and Reports: Access the dashboard to view metrics and generate detailed reports.
- Integration: Utilize integrations with other tools like GitHub to streamline workflows.
## Skills Developed
- Next.js: Developed both front-end and back-end functionalities.
- Prisma: Utilized Prisma ORM for database management.
- Tailwind CSS: Applied Tailwind CSS for styling and responsive design.
# DEPLOYED LINK
- [Issues Tracker](https://issue-tracker-five-opal.vercel.app/) - you can access the website by clicking on the link

## Contributing
Contributions are welcome! Please submit a pull request with your changes.


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

