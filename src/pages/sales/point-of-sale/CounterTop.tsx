import { useSelector, useDispatch } from "react-redux";
import {
  selectAllCounterItems,
  removeAllItems,
  removeItem,
  reduceItemQuantity,
  addItemQuantity,
} from "@/features/sales/saleSlice";
import { Button } from "@mui/material";
import { GlobalModal, GlobalSubmitButton } from "@/components/reusable";
import { useState } from "react";
import Checkout from "./Checkout";

const CounterTop = () => {
  const dispatch = useDispatch();
  const allItems = useSelector(selectAllCounterItems);
  const [openCheckout, setOpenCheckout] = useState<boolean>(false);

  function closeCheckoutModal() {
    setOpenCheckout((prev: boolean) => !prev);
  }

  // Calculate total sale amount
  const totalAmount = allItems?.reduce(
    (total, item) =>
      total + parseFloat(item.stock.product.price_per_item) * item.quantity,
    0
  );

  // Handler to remove an item
  const handleRemoveItem = (itemId: number) => {
    dispatch(removeItem(itemId));
  };

  // Handler to clear all items
  const handleClearItems = () => {
    dispatch(removeAllItems());
  };

  return (
    <>
      <section className="mx-4 p-4 rounded-lg shadow-sm bg-white">
        <div className="flex justify-between place-items-center">
          <h2 className="font-bold text-2xl text-gray-900 mb-4">
            Sale Counter
          </h2>
          {allItems.length > 1 ? (
            <Button
              variant="contained"
              color="error"
              size="medium"
              onClick={handleClearItems}
            >
              Clear All
            </Button>
          ) : (
            <></>
          )}
        </div>

        {/* List of Sale Items */}
        {allItems.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {allItems.map((item) => (
              <li
                key={item.stock.product.id}
                className="flex items-center py-4"
              >
                {/* Product Details */}
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">
                    {item.stock.product.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Price: Kshs.{" "}
                    {item.stock.product.price_per_item.toLocaleString()}
                  </p>
                  {/* <p className="text-sm text-gray-600">
                  Quantity: {item.quantity}
                </p> */}
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

                <div id="quantity-control" className="flex-1">
                  <div className="flex place-items-center gap-2">
                    <GlobalSubmitButton
                      handleSubmit={() =>
                        dispatch(reduceItemQuantity(item.stock.product.id))
                      }
                    >
                      <img src="/remove_26dp.svg" alt="" className="w-4" />
                    </GlobalSubmitButton>
                    <p className="text-sm text-gray-600">
                      Qty: {item.quantity}
                    </p>
                    <GlobalSubmitButton
                      handleSubmit={() =>
                        dispatch(addItemQuantity(item.stock.product.id))
                      }
                    >
                      <img src="/add_26.svg" alt="" className="w-4" />
                    </GlobalSubmitButton>
                  </div>
                </div>

                {/* Remove Button */}
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
          </ul>
        ) : (
          <p className="text-center py-10 text-gray-500">
            No items selected for sale.
          </p>
        )}

        {/* Total Amount and Clear Button */}
        {allItems.length > 0 && (
          <div className="mt-6">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-lg text-gray-700">
                Total Amount:{" "}
                <span className="text-xl text-blue-500">
                  Kshs. {totalAmount.toLocaleString()}
                </span>
              </h3>
              <GlobalSubmitButton
                handleSubmit={() => setOpenCheckout((prev: boolean) => !prev)}
              >
                Checkout
              </GlobalSubmitButton>
            </div>
          </div>
        )}
      </section>
      {openCheckout && (
        <>
          <GlobalModal
            open={openCheckout}
            closeFunc={closeCheckoutModal}
            children={<Checkout closeModal={closeCheckoutModal} />}
          />
        </>
      )}
    </>
  );
};

export default CounterTop;
