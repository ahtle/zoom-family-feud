## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## development database
DATABASE_URL in .env.example

first time:
npx prisma migrate dev --preview-feature
npx prisma generate

to add new migration:
npx prisma migrate save
npx prisma migrate up --experimental

to seed:
prisma db seed --preview-feature

to reset and re-seed:
npx prisma migrate reset --preview-feature 

to start everything over, delete:
prisma/migrations, dev.db.

view database
npx prisma studio --experimental
http://localhost:5555/

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
