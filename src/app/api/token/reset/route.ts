import { type NextRequest, NextResponse } from 'next/server';

import { ZodError } from 'zod';

import { resetToken } from '@server';
import { TokenResetSchema, offSetSchema, tokenResetSchema } from '@types';

export async function POST(req: NextRequest) {
  try {
    const { token: oldToken } = (await req.json()) as TokenResetSchema;
    const { token: validatedToken } = tokenResetSchema.parse({ token: oldToken });

    const offSet = req.headers.get('x-timezone-offset') ?? '0';
    const offSetNumber = +offSetSchema.parse(offSet);

    const token = await resetToken({ token: validatedToken, offSet: offSetNumber });

    return NextResponse.json({ token });
  } catch (error) {
    if (error instanceof ZodError) return NextResponse.json({ error: true, message: error.flatten() }, { status: 400 });
    if (error instanceof Error) return NextResponse.json({ error: true, message: error.message }, { status: 500 });

    return NextResponse.json({ error: true, message: 'Something went wrong' }, { status: 500 });
  }
}
