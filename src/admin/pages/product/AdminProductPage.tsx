import { Navigate, useNavigate, useParams } from 'react-router';
import { FullScreenLoading } from '@/components/custom/customFullScreenLoading';
import { ProductForm } from './ui/ProductForm';
import type { Product } from '@/interfaces/product.interface';
import { toast } from 'sonner';
import { useProducts } from '@/admin/hooks/useProducts';


export const AdminProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { isLoading, isError, data: product, productMutation } = useProducts(id || '');

  const title = id === 'new' ? 'Nuevo producto' : 'Editar producto';
  const subTitle =
    id === 'new'
      ? 'Aquí puedes crear un nuevo producto.'
      : 'Aquí puedes editar el producto.';

  const handleSubmit = async (productLike: Partial<Product> & { files?: File[] }) => {
    try {
      const data = await productMutation.mutateAsync(productLike);

      toast.success('El producto se actualizó correctamente', {
        position: 'top-right',
      });

      navigate(`/admin/products/${data.id}`);
    } catch (error) {
      console.log({ error });
      toast.error('Error al actualizar el producto');
    }
  };

  // si hay error cargando el producto
  if (isError) return <Navigate to="/admin/products" />;

  // loading
  if (isLoading) return <FullScreenLoading />;

  // si no hay producto y no es "new"
  if (!product && id !== 'new') return <Navigate to="/admin/products" />;

  return (
    <ProductForm
      title={title}
      subTitle={subTitle}
      product={product}
      onSubmit={handleSubmit}
      isPending={productMutation.isPending}
    />
  );
};
