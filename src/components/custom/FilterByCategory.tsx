import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetCategoryQuery } from "@/features/stock/categoryAPI";
import { filterType } from "@/lib/types/StockItemTypes";
import { useState } from "react";

interface FilterByCategoryProps {
  func: React.Dispatch<React.SetStateAction<filterType>>;
}

const FilterByCategory: React.FC<FilterByCategoryProps> = ({ func }) => {
  const [value, setValue] = useState("");
  const { data: CategoryList } = useGetCategoryQuery([]);

  //   console.log(value, "categories");

  function onChange(e: string) {
    setValue(e);
    func((prev: filterType) => ({
      ...prev,
      filterCategory: e,
    }));
  }

  return (
    <Select onValueChange={onChange} value={value}>
      <SelectTrigger className="w-[170px] py-2">
        <SelectValue placeholder="Filter By Category" />
      </SelectTrigger>
      <SelectContent className="z-[1400]">
        {/* <SelectItem value="">None</SelectItem> */}
        {CategoryList?.map(
          (categoryList: { name: string; id: number }, index: number) => {
            return (
              <SelectItem key={index} value={categoryList.name}>
                {categoryList.name}
              </SelectItem>
            );
          }
        )}
      </SelectContent>
    </Select>
  );
};
export default FilterByCategory;
