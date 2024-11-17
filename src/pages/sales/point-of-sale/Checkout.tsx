import { GlobalCloseButton } from "@/components/reusable";
import { useGetAccessTokensQuery } from "@/features/sales/daraja/authorization";
import { useEffect } from "react";

interface CheckoutProps {
  closeModal: (args?: unknown) => void;
}

const Checkout = ({ closeModal }: CheckoutProps) => {
  const { data, error, isLoading } = useGetAccessTokensQuery([]);

  useEffect(() => {
    if (data) {
      console.log("Access Token:", data);
    }
  }, [data]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching access token</p>;
  return (
    <div>
      <span>Checkout</span>
      <div>
        <h3>M-Pesa Access Token</h3>
        <p>{data?.access_token}</p>
      </div>
      <GlobalCloseButton closeModal={closeModal}>close</GlobalCloseButton>
    </div>
  );
};
export default Checkout;
