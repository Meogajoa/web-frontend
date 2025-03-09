'use client';

import useSignIn, {
  type SignInForm,
  type SignInResponse,
} from '@/hooks/account/useSignIn';
import { useRouter } from '@/i18n/routing';
import { useUser } from '@/providers/UserProvider';
import { type AxiosError } from 'axios';
import { useForm } from 'react-hook-form';

const SignInPage = () => {
  const { register, handleSubmit } = useForm<SignInForm>();
  const router = useRouter();
  const { setUser } = useUser();

  const { signIn } = useSignIn({
    onSuccess: handleSignInSuccess,
    onError: handleSignInError,
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

      <button className="border p-3" type="submit" data-testid="sign-in-button">
        Sign In
      </button>

      <button
        className="border p-3"
        onClick={(e) => {
          e.preventDefault();
          router.push('/account/sign-up');
        }}
        data-testid="go-to-sign-up-button"
      >
        Go to Sign Up page
      </button>
    </form>
  );

  function onSubmit(data: SignInForm) {
    signIn(data);
  }

  function handleSignInSuccess(data: SignInResponse) {
    localStorage.setItem('sessionId', data.sessionId);
    setUser({ name: data.user.nickname });
    router.push('/home');
  }

  function handleSignInError(data: AxiosError<SignInResponse, SignInForm>) {
    console.error(data.message);
  }
};

export default SignInPage;
