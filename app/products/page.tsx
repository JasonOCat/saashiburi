import { supabase } from "../../supabase";
import ProductCard from "@/app/ui/products/Card";

// products will be populated at build time by getStaticProps()
export default async function ProductsPage() {
  let {data: products} = await supabase
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
