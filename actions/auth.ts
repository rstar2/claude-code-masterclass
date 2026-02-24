"use server";

export interface AuthFormState {
  message?: string;
  errors?: Record<string, string[]>;
}

export async function loginAction(
  prevState: AuthFormState | null,
  formData: FormData,
): Promise<AuthFormState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  console.log("[LOGIN SUBMISSION]", {
    email,
    passwordLength: password?.length || 0,
  });

  return { message: "Form submitted" };
}

export async function signupAction(
  prevState: AuthFormState | null,
  formData: FormData,
): Promise<AuthFormState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  console.log("[SIGNUP SUBMISSION]", {
    email,
    passwordLength: password?.length || 0,
  });

  return { message: "Form submitted" };
}
