import { CustomPagination } from "@/components/custom/CustomPagination"

import { CustomJumbotron } from "@/shopFrontend/components/CustomJumbotron"
import { ProductsGrid } from "@/shopFrontend/components/ProductsGrid"
import { useProducts } from "@/shopFrontend/hooks/useProducts"

export const HomePage = () => {
  const {data} = useProducts();
  return (
<>
<CustomJumbotron title="All products" />

<ProductsGrid products={data?.products || []}/>

<CustomPagination totalPages={data?.pages || 0}/>
</>
  )
}
