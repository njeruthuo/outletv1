import { GlobalCloseButton } from "@/components/reusable";

interface CheckoutProps {
  closeModal: (args?: unknown) => void;
}

const Checkout = ({ closeModal }: CheckoutProps) => {
  return (
    <div>
      Checkout
      <GlobalCloseButton closeModal={closeModal}>close</GlobalCloseButton>
    </div>
  );
};
export default Checkout;
