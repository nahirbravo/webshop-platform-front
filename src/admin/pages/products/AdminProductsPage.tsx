import { AdminTitle } from "@/admin/components/AdminTitle"
import { FullScreenLoading } from "@/components/custom/customFullScreenLoading"
import { CustomPagination } from "@/components/custom/CustomPagination"
import { Button } from "@/components/ui/button"
import  { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { CurrencyFormatter } from "@/lib/currency-formatter"
import { useProducts } from "@/shopFrontend/hooks/useProducts"
import { PencilIcon, PlusIcon } from "lucide-react"
import { Link } from "react-router"


export const AdminProductsPage = () => {
  const {data, isLoading} = useProducts();
  if(isLoading){
    return <FullScreenLoading/>
  }
  return (

<>
<div className="flex justify-between items-center">
  <AdminTitle 
  title="PRODUCTS"
  subtitle="Here you can view and manage your products
  "
  />

  <div className="flex justify-end mb-10 gap-4">
  <Link to='/admin/products/new'>
  <Button>
    <PlusIcon />
    New product
  </Button>
  </Link>
    
  </div>



</div>


<Table className="bg-white p-10 shadow-xs border-gray-200 mb-10">
  <TableHeader>
    <TableRow>
      
      <TableHead>Image</TableHead>
      <TableHead>Name</TableHead>
      <TableHead>Price</TableHead>
      <TableHead>Category</TableHead>
      <TableHead>Inventray</TableHead>
      <TableHead>Sizes</TableHead>
      <TableHead className="text-right">Edit</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {
      data!.products.map((product) => (
    <TableRow key={product.id}>
    
      <TableCell>
        <img
        src={product.images[0]}
        alt="Product"
        className="w-20 h-20 object-cover rounded-md"/>
      </TableCell>
      <TableCell>
        <Link to={`/admin/products/${product.title}`}>
          {product.title}
        </Link>
      </TableCell>
      <TableCell>{CurrencyFormatter(product.price)}</TableCell>
      <TableCell>{product.gender}</TableCell>
      <TableCell>{product.stock}</TableCell>
      <TableCell>{product.sizes.join(', ')}</TableCell>
      <TableCell className="text-right">
        <Link to={`/admin/products/${product.id}`}>
          <PencilIcon className="h-4 w-4 text-blue-500"/>
        </Link>
      </TableCell>
    </TableRow>
    ))}

  </TableBody>
</Table>

<CustomPagination totalPages={data?.pages || 0}/>
</>  )
}
