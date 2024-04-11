"use client"

import { useState } from "react";
import { createFrontendClient } from "@/utils/supabase/client";
import { loginAction } from "@/app/login/actions";
import { useFormStatus } from 'react-dom'
import { useFormState } from 'react-dom'

const initialState = {
  errorMessage: "",
}

function SubmitButton() {
  const {pending} = useFormStatus()

  return (
    <button disabled={pending} type="submit" className="large-button">
      <div className="large-button-text">
        {pending ? "Logging in..." : "Log in"}
      </div>
    </button>
  )
}

export default function LoginForm({setSubmitted}) {
  // const loginActionWithSetSubmitted = loginAction.bind(null, setSubmitted)
  const [state, formAction] = useFormState(loginAction, initialState);

  return (
    <form action={formAction} className="content-grid home-hero">
      {state?.errorMessage && (
        <div className="danger" role="alert">
          {state.errorMessage}
        </div>
      )}
      <h1>Welcome back</h1>
      <div className="email-input">
        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email" autoComplete="email"/>
      </div>
      <SubmitButton/>
    </form>
  )
}
