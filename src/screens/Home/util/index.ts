import { TokenErrorResponse, TokenResponse, TokenSchema } from '@types';

export async function postToken({ playerId, token }: TokenSchema): Promise<TokenResponse> {
  try {
    const response = await fetch('api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ playerId, token }),
    });

    if (response.status !== 200) {
      const { message } = (await response.json()) as TokenErrorResponse;
      throw new Error(message);
    }

    const data = await response.json();

    return data as TokenResponse;
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
    else throw new Error('Something went wrong');
  }
}
