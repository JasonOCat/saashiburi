import Image from "next/image";
import PromoCard from "@/app/products/_components/promo-card";
import { notFound } from "next/navigation";
import Video from "@/app/products/_components/video";
import { createSupabaseServerClient } from "@/utils/supabase/server";
import { createFrontendClient } from "@/utils/supabase/client";
import { supabase } from "@/supabase";
import { createServerClient } from "@supabase/ssr";
import SubscriberCard from "@/app/products/_components/subscriber-card";

type Props = {
  params: { slug: string };
};

export default async function ProductPage({params}: Props) {

  const supabaseClient = createSupabaseServerClient()
  const { data} = await supabase.auth.getUser()

  // to manage authenticated user that can see content, set the RLS, row level policy in supabase : https://supabase.com/docs/guides/auth/row-level-security
  const {data: product} = await supabaseClient
    .from('product')
    .select("*")
    .eq('slug', params.slug)
    .single()

  if (!product) {
    notFound();
  }

  const {data: productContent} = await supabaseClient
    .from('product_content')
    .select('*')
    .eq('id', product.product_content_id)
    .single();

  // if (!productContent) {
  //   notFound();
  // }

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
            <Video url={productContent.video_url}/>
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
          {data.user ? <SubscriberCard/> : <PromoCard/>}
        </section>
      </article>
    </section>
  )
}

export async function generateStaticParams() {

  const supabaseClient = createFrontendClient()
  const {data: products} = await supabaseClient
    .from('product')
    .select('*')

  if (!products) {
    return [];
  }

  return products?.map(({slug}) => ({
    slug,
  }))
}

