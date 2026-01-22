'use server';

import { cookies } from 'next/headers';

export async function setAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.set('admin-authenticated', 'true', {
    path: '/',
    maxAge: 60 * 60 * 24, // 24 hours
    httpOnly: false,
    sameSite: 'lax',
  });
}

export async function removeAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.delete('admin-authenticated');
}
