"use client";

import Link from "next/link";
import Image from "next/image";
import login from '../../public/assets/login.png'
import {useState} from "react";
import LoginSubmitted from "@/app/login/_components/loginSubmitted";
import LoginForm from "@/app/login/_components/loginForm";
import Logo from "@/app/_components/logo";

export default function LoginPage() {
  const [submitted, setSubmitted] = useState('');

  return (
    <div className="grid-halves h-screen">
      <div className="border-right bg-offwhite">
        <div className="column-padding">
          <div className="tablet-centered">
            <Link href="/" className="logo-container">
              <Logo style={{ width: 150 }} />
            </Link>
            {submitted ? <LoginSubmitted submitted={submitted}/> : <LoginForm setSubmitted={setSubmitted}/>}
          </div>
        </div>
      </div>
      <div className="bg-navy border-right">
        <Image src={login} alt="login" className="callout-image"/>

      </div>
    </div>
  )
}
