// A simple wrapper function to check if user is logged in via supabase.
// Will redirect to the login page if the user is not authenticated.
// Should only be used on the server side.
//
// -----------------------------------------------------------------------
//
// Example usage:
// import { requireUser } from '@/utils/supabase/requireUser'
//
// export default async function SomePage() {
//   const user = await requireUser()
//   return <p>Hello {user.email}</p>
// }

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function requireUser() {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    redirect('/login')
  }

  return data.user
}

