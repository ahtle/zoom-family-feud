// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next';
import data from '../../../questions.json';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json(data);
}
