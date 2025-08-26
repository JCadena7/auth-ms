import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { AuthProvider, AuthSession, SignInInput, SignUpInput } from '../../domain/services/auth-provider';
import { envs } from '../../../config';

export class SupabaseAuthProvider implements AuthProvider {
  private client: SupabaseClient;

  constructor() {
    this.client = createClient(envs.supabaseUrl, envs.supabaseKey);
  }

  async signUp(input: SignUpInput): Promise<{ userId: string; email_confirmed?: boolean }> {
    const { data, error } = await this.client.auth.signUp({
      email: input.email,
      password: input.password,
    });
    if (error) throw error;
    if (!data.user) throw new Error('No user returned by Supabase signUp');
    return { userId: data.user.id, email_confirmed: !!data.user.email_confirmed_at };
  }

  async signIn(input: SignInInput): Promise<AuthSession> {
    const { data, error } = await this.client.auth.signInWithPassword({
      email: input.email,
      password: input.password,
    });
    if (error) throw error;
    if (!data.session || !data.user) throw new Error('Invalid Supabase signIn response');
    return {
      accessToken: data.session.access_token ?? null,
      refreshToken: data.session.refresh_token ?? null,
      userId: data.user.id,
    };
  }

  async signOut(accessToken?: string | null): Promise<void> {
    // Supabase client signOut clears the current session; on server, it's usually stateless
    const { error } = await this.client.auth.signOut();
    if (error) throw error;
  }
}
