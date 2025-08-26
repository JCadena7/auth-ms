export interface SignUpInput {
  email: string;
  password: string;
}

export interface SignInInput {
  email: string;
  password: string;
}

export interface AuthSession {
  accessToken: string | null;
  refreshToken?: string | null;
  userId: string; // external auth user id
}

export interface AuthProvider {
  signUp(input: SignUpInput): Promise<{ userId: string; email_confirmed?: boolean }>; // may require email confirmation
  signIn(input: SignInInput): Promise<AuthSession>;
  signOut(accessToken?: string | null): Promise<void>;
}
