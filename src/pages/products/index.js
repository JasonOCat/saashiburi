import {supabase} from "../../../supabase";
import ProductCard from "src/products/components/Card";

export default function ProductsPage({products}) {
  console.log(products)
  return (
    <>
      <div className="section bg-blue">
        <div className="container">
          <div className="section-intro">
            <h1>The latest products</h1>
          </div>
        </div>
      </div>

      <div className="section small">
        <div className="container">
          <ul className="product-card-grid">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

//https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-props
// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.

// getStaticProps can only be exported from a page. You cannot export it from non-page files, _app, _document, or _error.
export async function getStaticProps() {
  // You can use any data fetching library
  let { data: products} = await supabase
    .from('product')
    .select('*')

  return {
    props: {
      products,
    },
  }
}
