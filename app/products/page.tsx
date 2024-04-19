
import ProductCard from "@/app/products/_components/product-card";
import { createSupabaseServerClient } from "@/utils/supabase/server";

// products will be populated at build time by getStaticProps()
export default async function ProductsPage() {
  let {data: products} = await createSupabaseServerClient()
    .from('product')
    .select('*')
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
            {products?.map(product => (
              <ProductCard key={product.id} product={product}/>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
