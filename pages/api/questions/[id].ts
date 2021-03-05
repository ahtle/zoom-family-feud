// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next';
import data from '../../../questions.json';
import _ from 'lodash';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
    const question = _.find(data, {'id': Number(id)});

    res.status(200).json(question);
}