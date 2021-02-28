// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const prisma = new PrismaClient();

  // get 3 unique IDs
  let max = await prisma.question.count();
  let ids = [];
  while (ids.length < 3) {
    let id = Math.floor(Math.random() * Math.floor(max + 1))  + 1;
    if (ids.indexOf(id) === -1) {
      ids.push(id);
    }
  }

  try {
    const questions = await prisma.question.findMany({
      include: {
        answers: true
      }
    });
    res.status(200);
    res.json({questions});
  } catch(e) {
    res.status(500);
    res.json({error: e});
  } finally {
    await prisma.$disconnect();
  }
}
