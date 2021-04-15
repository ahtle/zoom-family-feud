// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next';
import data from '../../../questions.json';

const questions = <any>data;

export default (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.body);

  // get 3 unique index
  let max = questions.length;
  let indexes = [];
  while (indexes.length < 3) {
    let index = Math.floor(Math.random() * Math.floor(max));
    if (indexes.indexOf(index) === -1 && req.body.questions_seen.indexOf(index) === -1) {
      indexes.push(index);
    }
  }

  let arr = [];
  indexes.forEach(i => {
    arr.push(questions[i]);
  });

  res.status(200).json(arr);
}
