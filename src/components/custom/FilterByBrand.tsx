import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetBrandQuery } from "@/features/stock/brandAPI";
import { filterType } from "@/lib/types/stock/StockItemTypes";
import { useState } from "react";

interface FilterByBrandProps {
  func: React.Dispatch<React.SetStateAction<filterType>>;
}

const FilterByBrand: React.FC<FilterByBrandProps> = ({ func }) => {
  const [value, setValue] = useState("");
  const { data: BrandList } = useGetBrandQuery([]);

  //   console.log(value, "brands");

  function onChange(e: string) {
    setValue(e);
    func((prev: filterType) => ({
      ...prev,
      filterBrand: e,
    }));
  }

  return (
    <Select onValueChange={onChange} value={value}>
      <SelectTrigger className="w-[170px]">
        <SelectValue placeholder="Filter By Brand" />
      </SelectTrigger>
      <SelectContent className="z-[1400]" defaultValue={value}>
        {/* <SelectItem value="">None</SelectItem> */}
        {BrandList?.map(
          (brandList: { name: string; id: number }, index: number) => {
            return (
              <SelectItem key={index} value={brandList.name}>
                {brandList.name}
              </SelectItem>
            );
          }
        )}
      </SelectContent>
    </Select>
  );
};
export default FilterByBrand;
