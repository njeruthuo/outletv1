import { Button, CircularProgress } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { GlobalCloseButton, GlobalSubmitButton } from "@/components/reusable";
import {
  removeItem,
  selectAllCounterItems,
  // removeAllItems,
} from "@/features/sales/saleSlice";
import { useState } from "react";
import {
  useCompleteSaleRequestMutation,
  useRequestPaymentOnSaleMutation,
} from "@/features/sales/salesAPI";
// import { useMpesaTransaction } from "@/features/sales/daraja/useMpesaTransaction";

/**
 * TODO: send transaction success message to the user after a successful transaction and clear the cart.
 * Ensure all transactions are logged in the database.
 * Prepare the screen for another sale.
 * Send sms to the buyer to notify of points awarded (per receipt) and Thanks for shopping with Rapid Rack!
 */

interface CheckoutProps {
  closeModal: (args?: unknown) => void;
}

// interface MpesaResponseType {
//   CheckoutRequestID: string;
//   CustomerMessage: string;
//   MerchantRequestID: string;
//   ResponseCode: string;
//   ResponseDescription: string;
// }

const Checkout = ({ closeModal }: CheckoutProps) => {
  const dispatch = useDispatch();
  const allItems = useSelector(selectAllCounterItems);
  const [payeeNumber, setPayeeNumber] = useState<string>("");
  const [requestPaymentOnSale, { isLoading }] =
    useRequestPaymentOnSaleMutation();

  const [completeSaleRequest, { isLoading: loading_complete_sale }] =
    useCompleteSaleRequestMutation();

  // const [response, setResponse] = useState<MpesaResponseType>({
  //   CheckoutRequestID: "",
  //   CustomerMessage: "",
  //   MerchantRequestID: "",
  //   ResponseCode: "",
  //   ResponseDescription: "",
  // });

  // const transactionStatus = useMpesaTransaction(response.MerchantRequestID);

  const totalAmount = allItems?.reduce(
    (total, item) =>
      total + parseFloat(item.stock.product.price_per_item) * item.quantity,
    0
  );

  const handleRemoveItem = (itemId: number) => {
    if (allItems.length <= 1) {
      closeModal(); // Close the modal if this is the last item
    }
    dispatch(removeItem(itemId));
  };

  const handlePaymentRequests = async () => {
    if (payeeNumber) {
      try {
        const response = await requestPaymentOnSale({
          phone_number: payeeNumber,
          amount: totalAmount,
        }).unwrap();

        if (
          response.ResponseDescription ==
          "Success. Request accepted for processing"
        ) {
          try {
            const complete_sale_response = completeSaleRequest({
              ...allItems,
              payeeNumber,
              receipt_ID: response.MerchantRequestID,
            });
            console.log(complete_sale_response, "complete_sale_response");
          } catch (error) {
            console.log(error);
          } finally {
            closeModal();
          }
          // dispatch(removeAllItems());
          // setResponse({
          //   CheckoutRequestID: response.CheckoutRequestID || "",
          //   CustomerMessage: response.CustomerMessage || "",
          //   MerchantRequestID: response.MerchantRequestID || "",
          //   ResponseCode: response.ResponseCode || "",
          //   ResponseDescription: response.ResponseDescription || "",
          // });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="w-[650px]">
      <h2 className="font-bold text-custom1 text-2xl flex place-items-center gap-2 my-2">
        <span>Checkout </span>
        <img src="/cart_checkout.svg" alt="cart_checkout" />
      </h2>
      <div>
        <p>
          You are about to checkout{" "}
          {allItems.length > 1 ? "these products" : "this product"}
        </p>
        {allItems.map((item) => (
          <li key={item.stock.product.id} className="flex items-center py-3">
            {/* Product Details */}
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800">
                {item.stock.product.name}
              </h3>
              <p className="text-sm text-gray-600">
                Price: Kshs.{" "}
                {item.stock.product.price_per_item.toLocaleString()}
              </p>
              <p className="text-[16px] text-green-600 mt-3">
                Total: Kshs.{" "}
                <span className="font-bold">
                  {(
                    parseFloat(item.stock.product.price_per_item) *
                    item.quantity
                  ).toLocaleString()}
                </span>
              </p>
            </div>
            <Button
              variant="outlined"
              color="error"
              size="small"
              onClick={() => handleRemoveItem(item.stock.product.id)}
            >
              Remove
            </Button>
          </li>
        ))}
        <div className="mt-5 flex place-items-center">
          <div className="w-1/4">
            <p className="text-[18px] mt-3">
              Pay{" "}
              <span className="text-[18px] underline text-custom1 font-bold">
                Kshs. {totalAmount}
              </span>{" "}
              from
            </p>
          </div>

          <div className="flex-1">
            <div className="flex justify-center">
              <img src="/double_arrow.svg" alt="" />
            </div>
          </div>

          <div className="mt-4 w-1/3 flex flex-col">
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Enter your phone number
            </label>
            <input
              id="phoneNumber"
              value={payeeNumber}
              onChange={(e) => setPayeeNumber(e.target.value)}
              type="tel"
              pattern="[0-9]{10}" // Optional: Enforces a 10-digit number format
              placeholder="07XXXXXXXX"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-0 focus:ring-green-600 focus:outline-none focus:border-green-600 text-[16px]"
            />
          </div>
        </div>
      </div>
      <div className="flex place-items-center mt-1">
        <GlobalCloseButton closeModal={closeModal}>close</GlobalCloseButton>
        <GlobalSubmitButton handleSubmit={handlePaymentRequests}>
          <span>Request payment</span>
          {(isLoading || loading_complete_sale) && (
            <CircularProgress size="md" color="inherit" />
          )}
        </GlobalSubmitButton>
      </div>
    </div>
  );
};
export default Checkout;
