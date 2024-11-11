import { useGetShopListQuery } from "@/features/sales/salesAPI";

export const useFetchShops = () => {
  const { data, isLoading, error } = useGetShopListQuery([]);
  return { shops: data ?? [], isLoading, error };
};
