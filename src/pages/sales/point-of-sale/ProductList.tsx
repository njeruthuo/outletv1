import { addItem } from "@/features/sales/saleSlice";
import { useGetStockItemsQuery } from "@/features/stock/stockAPI";
import { StockItem } from "@/lib/types/stock/StockItemTypes";
import { useDispatch } from "react-redux";

const ProductList = () => {
  const dispatch = useDispatch();
  const { data: ProductItems } = useGetStockItemsQuery([]);

  function selectItemForSale(args: StockItem) {
    dispatch(addItem(args));
  }

  if (!ProductItems) {
    return (
      <p className="text-center py-10 text-gray-500">Loading products...</p>
    );
  }

  return (
    <section className="mx-4">
      <div className="mb-4">
        <h2 className="font-bold text-2xl text-gray-900">Product List</h2>
        <p className="text-sm text-gray-500">
          Showing {ProductItems.length} products
        </p>
      </div>

      {/* Scrollable List Container */}
      <div className="h-[70vh] overflow-y-auto border rounded-lg shadow-sm">
        <ul className="divide-y divide-gray-200">
          {ProductItems.map((item: StockItem, index: number) => (
            <li
              onClick={() => selectItemForSale(item)}
              key={index}
              className="flex items-center p-4 hover:bg-gray-50 hover:cursor-pointer"
            >
              {/* Product Information */}
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">
                  {item.product.name}
                </h3>
                <p className="text-sm text-gray-600">
                  Category: {item.product.category.name}
                </p>
                <p className="text-sm text-gray-500">
                  Brand: {item.product.brand.name}
                </p>
              </div>

              {/* Stock and Price */}
              <div className="text-right">
                <p className="font-bold text-green-600">
                  Kshs. {item.product.price_per_item.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">
                  Stock: {item.quantity.toLocaleString()}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ProductList;
