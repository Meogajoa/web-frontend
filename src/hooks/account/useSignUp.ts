import { server } from '@/utils/axios';
import { useMutation } from '@tanstack/react-query';
import { type AxiosError } from 'axios';
import { omit } from 'lodash-es';
import React from 'react';

export type SignUpForm = {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation?: string;
};

const useSignUp = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: void, variables: SignUpForm) => void;
  onError?: (error: AxiosError<void, SignUpForm>) => void;
}) => {
  const _signUpAsync = React.useCallback(
    async (data: SignUpForm): Promise<void> => {
      const filtered = omit(data, ['passwordConfirmation']);

      server.post<void>(
        '/auth/sign-up',
        new URLSearchParams(filtered).toString(),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );
    },
    [],
  );

  const mutation = useMutation<
    void,
    AxiosError<void, SignUpForm>,
    SignUpForm,
    void
  >({
    mutationFn: _signUpAsync,
    onSuccess,
    onError,
    retry: false,
  });

  return {
    ...mutation,
    signUp: mutation.mutate,
    signUpAsync: mutation.mutateAsync,
  };
};

export default useSignUp;
