import { usePoeltlStore } from '@stores';
import { useMutation } from '@tanstack/react-query';
import { TokenErrorResponse, TokenMutationFnParams, TokenMutationParams, TokenResponse } from '@types';

async function postToken<T>({ url, payload }: TokenMutationFnParams<T>): Promise<TokenResponse> {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
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

export const useSubmitToken = <T>({ url }: TokenMutationParams) => {
  const { decodeToken } = usePoeltlStore();

  return useMutation<TokenResponse, Error, T>({
    mutationFn: (payload) => postToken({ url, payload }),
    onSuccess: ({ token }) => {
      localStorage.setItem('token', token);
      decodeToken(token);
    },
  });
};
