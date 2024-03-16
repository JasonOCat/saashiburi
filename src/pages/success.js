import Image from "next/image";
import Link from "next/link";
import confetti from '../../public/assets/confetti.png'

export default function SuccessPage() {
  return (
    <div className="section bg-pink h-screen">
      <div className="container">
        <div className="section-intro welcome">
          <Image
            src={confetti}
            height={200}
            width={200}
            className="confetti"
            alt="confetti"
          />
          <h1>You're in!</h1>
          <p>You can now access everything on this site. <br/> Ready to get started</p>
          <Link href="/login" className="large-button">
            <div className="large-button-text">Get Started</div>
          </Link>
        </div>
      </div>
    </div>
  )
};
