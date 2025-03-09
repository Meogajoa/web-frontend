'use client';

import useSignUp, { type SignUpForm } from '@/hooks/account/useSignUp';
import { useRouter } from '@/i18n/routing';
import { type AxiosError } from 'axios';
import { useForm } from 'react-hook-form';

const SignUpPage = () => {
  const { register, handleSubmit } = useForm<SignUpForm>();
  const router = useRouter();

  const { signUp } = useSignUp({
    onSuccess: handleSignUpSuccess,
    onError: handleSignUpError,
  });

  return (
    <form
      className="flex flex-col items-center justify-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <label htmlFor="email" data-testid="email-label">
          Email
        </label>
        <input
          className="border"
          id="email"
          type="email"
          autoFocus
          {...register('email', { required: true })}
        />
      </div>

      <div>
        <label htmlFor="password" data-testid="password-label">
          Password
        </label>
        <input
          className="border"
          id="password"
          type="password"
          {...register('password', { required: true })}
        />
      </div>

      <div>
        <label
          htmlFor="passwordConfirmation"
          data-testid="password-confirmation-label"
        >
          Password Confirmation
        </label>
        <input
          className="border"
          id="passwordConfirmation"
          type="password"
          {...register('passwordConfirmation', { required: true })}
        />
      </div>

      <div>
        <label htmlFor="nickname" data-testid="nickname-label">
          Nickname
        </label>
        <input
          className="border"
          id="nickname"
          type="text"
          {...register('nickname', { required: true })}
        />
      </div>

      <button className="border p-3" type="submit" data-testid="sign-up-button">
        Sign Up
      </button>

      <button
        className="border p-3"
        onClick={() => router.push('/account/sign-in')}
        data-testid="go-to-sign-in-button"
      >
        Go to Sign In oage
      </button>
    </form>
  );

  function onSubmit(data: SignUpForm) {
    signUp(data);
  }

  function handleSignUpSuccess() {
    router.push('/account/sign-in');
  }

  function handleSignUpError(data: AxiosError<void, SignUpForm>) {
    console.error(data.message);
  }
};

export default SignUpPage;
