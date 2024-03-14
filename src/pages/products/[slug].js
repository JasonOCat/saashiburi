import {supabase} from "../../../supabase";

export default function ProductPage({product}) {
  console.log(product);

  return (
    <div>product page</div>
  )
}

export async function getStaticPaths() {
  const {data: products} = await supabase.from('product').select('slug')

  const paths = products.map(product => ({
    params: {
      slug: product.slug // same name as the file [slug].js
    }
  }))

  console.log(paths);

  return {
    paths,
    fallback: false,
  }
}


export async function getStaticProps(context) {
  const slug = context.params.slug

  let { data: product, error } = await supabase
    .from('product')
    .select("*")
    // Filters
    .eq('slug', slug)
    .single()

  return {
    props: {
      product
    }
  }
}


