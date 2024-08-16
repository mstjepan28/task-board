import { AuthContext } from "@services/auth";
import { Button, PasswordInput, TextInput } from "@services/ui";
import { useContext } from "react";

export const LoginScreen = () => {
  const { login } = useContext(AuthContext);

  const onFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const email = form.email.value;
    const password = form.password.value;

    await login.loginUser({ email, password });
  };

  return (
    <div className="size-full flex flex-col items-center justify-center">
      <form onSubmit={onFormSubmit} className="min-w-[80%] max-w-md">
        <div className="text-center">
          <h1 className="text-3xl italic font-semibold">Task mate</h1>
          <h2 className="text-xl font-semibold">Login</h2>
        </div>

        <div className="py-4">
          <TextInput name="email" label="Email" />
          <PasswordInput name="password" label="Password" />
        </div>

        <Button type="submit" className="w-full text-sm font-semibold uppercase py-2 text-white bg-blue-600">
          Login
        </Button>
      </form>
    </div>
  );
};
