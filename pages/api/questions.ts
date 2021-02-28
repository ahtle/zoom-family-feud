// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next';
import data from '../../questions.json';

const questions = <any>data;

export default async (req: NextApiRequest, res: NextApiResponse) => {

  // get 3 unique index
  let max = questions.length;
  let indexes = [];
  while (indexes.length < 3) {
    let index = Math.floor(Math.random() * Math.floor(max + 1));
    if (indexes.indexOf(index) === -1) {
      indexes.push(index);
    }
  }

  let arr = [];
  indexes.forEach(i => {
    arr.push(questions[i]);
  });

  res.status(200);
  res.json(arr);
}
