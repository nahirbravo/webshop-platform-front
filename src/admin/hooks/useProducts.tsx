import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProductByIdAction } from "../actions/get-product-by-id.action";
import type { Product } from "@/interfaces/product.interface";
import { createUpdateProductAction } from "../actions/create-update-product.action";

export const useProducts = (id: string) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['product', { id }],
    queryFn: () => getProductByIdAction(id),
    enabled: id !== 'new',           
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  const productMutation = useMutation({
    mutationFn: createUpdateProductAction,
    onSuccess: (product: Product) => {
      // invalidamos la lista completa
      queryClient.invalidateQueries({ queryKey: ['products'] });

      // invalidamos el producto individual
      queryClient.invalidateQueries({ queryKey: ['product', { id: product.id }] });

      // actualizamos cache del producto
      queryClient.setQueryData(['product', { id: product.id }], product);
    },
  });

  return {
    ...query,
    productMutation,
  };
};
