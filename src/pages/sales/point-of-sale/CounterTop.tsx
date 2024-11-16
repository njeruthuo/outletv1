import { useSelector, useDispatch } from "react-redux";
import {
  selectAllCounterItems,
  //   removeItem,
  //   clearItems,
} from "@/features/sales/saleSlice";
import { StockItem } from "@/lib/types/stock/StockItemTypes";
import { Button } from "@mui/material";

const CounterTop = () => {
  const dispatch = useDispatch();
  const allItems: StockItem[] = useSelector(selectAllCounterItems);

  // Calculate total sale amount
  const totalAmount = allItems?.reduce(
    (total, item) =>
      total + parseFloat(item.product.price_per_item) * item.quantity,
    0
  );

  // Handler to remove an item
  //   const handleRemoveItem = (itemId: number) => {
  //     dispatch(removeItem(itemId));
  //   };

  // Handler to clear all items
  //   const handleClearItems = () => {
  //     dispatch(clearItems());
  //   };

  return (
    <section className="mx-4 p-4 border rounded-lg shadow-sm bg-white">
      <h2 className="font-bold text-2xl text-gray-900 mb-4">Sale Counter</h2>

      {/* List of Sale Items */}
      {allItems.length > 0 ? (
        <ul className="divide-y divide-gray-200">
          {allItems.map((item: StockItem) => (
            <li key={item.product.id} className="flex items-center p-4">
              {/* Product Details */}
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">
                  {item.product.name}
                </h3>
                <p className="text-sm text-gray-600">
                  Price: Kshs. {item.product.price_per_item.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">
                  Quantity: {item.quantity}
                </p>
                <p className="text-sm text-gray-600">
                  Total: Kshs.{" "}
                  {(
                    parseFloat(item.product.price_per_item) * item.quantity
                  ).toLocaleString()}
                </p>
              </div>

              {/* Remove Button */}
              <Button
                variant="outlined"
                color="error"
                size="small"
                // onClick={() => handleRemoveItem(item.product.id)}
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
            <h3 className="font-bold text-xl text-gray-800">
              Total Amount: Kshs. {totalAmount.toLocaleString()}
            </h3>
            <Button
              variant="contained"
              color="primary"
              size="medium"
              //   onClick={handleClearItems}
            >
              Clear All
            </Button>
          </div>
        </div>
      )}
    </section>
  );
};

export default CounterTop;
