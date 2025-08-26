import type { AuthProvider } from '../../domain/services/auth-provider';
import { SupabaseAuthProvider } from './supabase-auth.provider';

export type AuthProviderType = 'supabase';

export function createAuthProvider(type: AuthProviderType = 'supabase'): AuthProvider {
  switch (type) {
    case 'supabase':
    default:
      return new SupabaseAuthProvider();
  }
}
