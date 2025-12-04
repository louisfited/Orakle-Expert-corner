import { Tables } from '@/lib/types/database.types'

export type ServerActionReturn<T> = {
  data: T | null;
  error: { message: string } | null;
}

export type ApplicationsWithEmail = Tables<'profiles'> & { email: string }
