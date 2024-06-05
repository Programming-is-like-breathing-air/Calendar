This is a calendar application built on Node.js, Express.js, and MongoDB. The front end is built with React.js and Next.js, providing a user-friendly interface that supports date navigation, view switching, and event management functions.

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

Start the backend server
Make sure the MongoDB service is started and running locally. Run the following command to start the backend server:

```bash
node server.js
```
## function

Front-end

Technology stack
React.js: used to build user interface components and manage application status.
Next.js: used for server-side rendering and static website generation.
Functionality
Date navigation: users can browse different months, and there is a "today" button to return to the current date.
View options: users can choose between month view, week view, day view, and list view.
Event management: users can click on the date to add an event, and click on an existing event to edit or delete it.
Key files
app/page.tsx: main page file, used to display the calendar and handle user interactions.
components/calendar.tsx: calendar component file, responsible for rendering the calendar view and managing events.

Back-end

Technology stack
Node.js: used to run JavaScript code on the server side.
Express.js: used to build a web server and handle API requests.
Functionality
API endpoint:
GET /events: Get all events.
POST /events: Add a new event.
PUT /events/:id: Update a specified event.
DELETE /events/:id: Delete a specified event.
Key files
server.js: The main server file that defines the API endpoints and database interaction logic.

Database

Technology stack
MongoDB: Used to store event data.


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
