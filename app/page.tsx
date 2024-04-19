import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="grid-halves h-screen-navbar">
      <div className="bg-teal border-right">
        <div className="column-padding">
          <div className="tablet-centered">
            <div className="content-grid home-hero">
              <h1>
                The most <br/> epic products.
              </h1>
              <p className="section-subtitle">All the most epic things on the internet, all in one place</p>
              <Link href={"/products"} className="large-button">
                <div className="large-button-text">Explore Products</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-salmon">
        <div className="column-padding centered">
          <div className="callout-wrap">
            <Image
              width={1010}
              height={1049}
              alt="hero"
              src="/assets/hero.png"
              className="callout-image"/>
          </div>
        </div>
      </div>
    </div>

  )
}
