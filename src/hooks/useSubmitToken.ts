import { usePoeltlStore } from '@stores';
import { useMutation } from '@tanstack/react-query';
import { TokenErrorResponse, TokenMutationFnParams, TokenMutationParams, TokenSchema } from '@types';

async function postToken({ url, payload }: TokenMutationFnParams<TokenSchema>) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (response.status !== 200) {
      const { message } = (await response.json()) as TokenErrorResponse;
      throw new Error(message);
    }
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
    else throw new Error('Something went wrong');
  }
}

export const useSubmitToken = ({ url }: TokenMutationParams) => {
  const { decodeToken } = usePoeltlStore();

  return useMutation<void, Error, TokenSchema>({
    mutationFn: (payload) => postToken({ url, payload }),
    onSuccess: () => decodeToken(),
  });
};
