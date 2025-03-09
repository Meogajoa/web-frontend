import { server } from '@/utils/axios';
import { useMutation } from '@tanstack/react-query';
import { type AxiosError } from 'axios';
import React from 'react';
import { z } from 'zod';

export type SignInForm = {
  email: string;
  password: string;
};

const signInResponseSchema = z.object({
  sessionId: z.string(),
  user: z.object({
    email: z.string(),
    nickname: z.string(),
  }),
});
export type SignInResponse = z.infer<typeof signInResponseSchema>;

const useSignIn = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: SignInResponse, variables: SignInForm) => void;
  onError?: (error: AxiosError<SignInResponse, SignInForm>) => void;
}) => {
  const _signInAsync = React.useCallback(async (data: SignInForm) => {
    return server
      .post<SignInResponse>(
        '/auth/sign-in',
        new URLSearchParams(data).toString(),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      )
      .then((response) => signInResponseSchema.parse(response.data));
  }, []);

  const mutation = useMutation<
    SignInResponse,
    AxiosError<SignInResponse, SignInForm>,
    SignInForm,
    void
  >({
    mutationFn: _signInAsync,
    onSuccess,
    onError,
  });

  return {
    ...mutation,
    signIn: mutation.mutate,
    signInAsync: mutation.mutateAsync,
  };
};

export default useSignIn;
