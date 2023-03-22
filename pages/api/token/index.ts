import type { NextApiRequest, NextApiResponse } from 'next';

import { ZodError } from 'zod';

import { createNewToken, createTokenWithUpdatedHistory } from '@server';
import { TokenSchema, tokenSchema } from '@types';

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
    const { token: oldToken, playerId } = req.body as TokenSchema;
    tokenSchema.parse({ token: oldToken, playerId });

    let token: string = '';

    if (oldToken) token = await createTokenWithUpdatedHistory({ playerId, previousToken: oldToken });
    else token = await createNewToken(playerId);

    res.status(200).json({ token });
  } catch (error) {
    if (error instanceof ZodError) res.status(400).json({ error: true, message: error.flatten() });
    else if (error instanceof Error) res.status(500).json({ error: true, message: error.message });
    else res.status(500).json({ error: true, message: 'Something went wrong' });
  }
}
