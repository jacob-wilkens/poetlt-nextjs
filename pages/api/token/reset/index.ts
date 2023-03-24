import type { NextApiRequest, NextApiResponse } from 'next';

import { ZodError } from 'zod';

import { resetToken } from '@server';
import { TokenResetSchema, offSetSchema, tokenResetSchema } from '@types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      await post(req, res);
      break;

    default:
      res.status(404).send('Not supported');
  }
}

async function post(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { token: oldToken } = req.body as TokenResetSchema;
    const { token: validatedToken } = tokenResetSchema.parse({ token: oldToken });

    const offSet = req.headers['x-timezone-offset'];
    const offSetNumber = +offSetSchema.parse(offSet);

    const token = await resetToken({ token: validatedToken, offSet: offSetNumber });

    res.status(200).json({ token });
  } catch (error) {
    if (error instanceof ZodError) res.status(400).json({ error: true, message: error.flatten() });
    else if (error instanceof Error) res.status(500).json({ error: true, message: error.message });
    else res.status(500).json({ error: true, message: 'Something went wrong' });
  }
}
