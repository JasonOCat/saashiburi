'use server'

import { createSupabaseServerClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function loginAction(prevState: {errorMessage: string}, formData: FormData) {
  const supabaseClient = createSupabaseServerClient()
  const email = String(formData.get("email"));

  // doc supabase signIn https://supabase.com/dashboard/project/vtjajvdcirctoxlzhoei/api?page=users
  const {error} = await supabaseClient.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: false,
      // emailRedirectTo: window.location.origin,
    }
  });

  if (error) {
    console.log(error.message);
    return {errorMessage: error.message};
  } else {
    // setSubmitted(email);
    revalidatePath('/')
    return {errorMessage: ""};
  }
}