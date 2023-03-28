import { cookies } from 'next/headers';
import { type NextRequest } from 'next/server';

import { createNewToken, createTokenWithUpdatedHistory, errorHandler } from '@server';
import { OFF_SET_COOKIE, TokenSchema, offSetSchema, tokenSchema } from '@types';

export async function POST(req: NextRequest) {
  try {
    const { playerId } = (await req.json()) as TokenSchema;
    tokenSchema.parse({ playerId });

    const cookieStore = cookies();
    const offSet = cookieStore.has(OFF_SET_COOKIE) ? cookieStore.get(OFF_SET_COOKIE)?.value ?? 0 : 0;
    const offSetNumber = +offSetSchema.parse(offSet);

    let newToken = '';

    if (cookieStore.has('token')) {
      const token = cookieStore.get('token')?.value ?? '';
      newToken = await createTokenWithUpdatedHistory({ previousToken: token, playerId, offSet: offSetNumber });
    } else {
      newToken = await createNewToken({ playerId, offSet: offSetNumber });
    }

    // new Date + 1 year
    const date = new Date();
    date.setFullYear(date.getFullYear() + 1);

    return new Response(null, { status: 200, headers: { 'Set-Cookie': `token=${newToken}; path=/; Expires=${date.toUTCString()}; SameSite=Strict;` } });
  } catch (error) {
    return errorHandler(error);
  }
}
