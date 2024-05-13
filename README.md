Notes app:

To run locally:

1. Duplicate .env.example and rename to .env.development.local - NOTE: secrets should never be exposed in a formal production environment in the manner that they are here
2. Run npm install
3. To start dev server, npm run dev
4. Access app at localhost:3000
5. Please note that this approach will use the live DB and any changes made will be reflected in the live app as well. If you would like to use your own DB, change the environment variables established prior. Ensure a table exists named notes with fields id(int4) and content (text).

Notes:

1. Api routes can be found at /app/api directory
2. Frontend routes can be found at /app directory
3. Components can be found in the /components directory
4. App is entirely written in NextJS for both Frontend and Backend
5. App uses server side rendering to fetch DB data on the server side when possible
6. Tailwind is used as a styling library
7. If I had more time, I would build out a bulk deleting feature and make the app responsive on mobile.
