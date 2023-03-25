import { type NextRequest, NextResponse } from 'next/server';

import { ZodError } from 'zod';

import { createNewToken, createTokenWithUpdatedHistory } from '@server';
import { TokenSchema, offSetSchema, tokenSchema } from '@types';

export async function POST(req: NextRequest) {
  try {
    const { token: oldToken, playerId } = (await req.json()) as TokenSchema;

    tokenSchema.parse({ token: oldToken, playerId });

    const offSet = req.headers.get('x-timezone-offset') ?? '0';
    const offSetNumber = +offSetSchema.parse(offSet);

    let token: string = '';

    if (oldToken) token = await createTokenWithUpdatedHistory({ playerId, previousToken: oldToken, offSet: offSetNumber });
    else token = await createNewToken({ playerId, offSet: offSetNumber });

    return NextResponse.json({ token });
  } catch (error) {
    if (error instanceof ZodError) return NextResponse.json({ error: true, message: error.flatten() }, { status: 400 });
    if (error instanceof Error) return NextResponse.json({ error: true, message: error.message }, { status: 500 });

    return NextResponse.json({ error: true, message: 'Something went wrong' }, { status: 500 });
  }
}
