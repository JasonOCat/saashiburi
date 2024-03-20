import {supabase} from "../../../supabase";
import Image from "next/image";
import PromoCard from "src/products/components/PromoCard";
import {useSession, useSupabaseClient} from "@supabase/auth-helpers-react";
import {useEffect, useState} from "react";
import ReactPlayer from "react-player";
import SubscriberCard from "src/products/components/SubscriberCard";

export default function ProductPage({product}) {

  const supabaseClient = useSupabaseClient();
  const session = useSession();
  const [productContent, setProductContent] = useState(null);

  useEffect(() => {
    async function getProductContent() {
      const {data: productContent} = await supabaseClient
        .from('product_content')
        .select('*')
        .eq('id', product.product_content_id)
        .single();

      setProductContent(productContent);
    }

    getProductContent();
  }, [supabaseClient])

  return (
    <section className="product-section">
      <article className="product">
        <div className="product-wrap">
          {productContent?.download_url && (
            <a href={`/assets/${productContent.download_url}`} download
               className="download-link large-button">
              <span className="large-button-text">Download</span>
            </a>
          )}
          {productContent?.video_url ? (
            <ReactPlayer controls url={productContent.video_url}/>
          ) : (<Image
            width={1000}
            height={300}
            src={`/assets/${product.slug}.png`}
            alt={product.name}
          />)}
        </div>
        <section>
          <header>
            <h3>{product.name}</h3>
          </header>
          <section>
            <div>
              <p>{product.description}</p>
            </div>
          </section>
        </section>
        <section>
          {session ? <SubscriberCard/> : <PromoCard/>}
        </section>
      </article>
    </section>
  )
}

export async function getStaticPaths() {
  const {data: products} = await supabase.from('product').select('slug')

  const paths = products.map(product => ({
    params: {
      slug: product.slug // same name as the file [slug].js
    }
  }))

  return {
    paths,
    fallback: false,
  }
}


export async function getStaticProps(context) {
  const slug = context.params.slug

  let { data: product } = await supabase
    .from('product')
    .select("*")
    .eq('slug', slug)
    .single()

  return {
    props: {
      product
    }
  }
}


