import { useState } from "react";
import AssignStock from "./AssignStock";
import { Button } from "@/components/ui/button";
import UpdateStockForm from "./UpdateStockForm";
import { Separator } from "@/components/ui/separator";
import { StockProps } from "@/lib/types/stock/StockItemTypes";

const ManageStock: React.FC<StockProps> = ({ closeModal, args }) => {
  const [activeTab, setActiveTab] = useState<string>("Update");

  const handleSelectTab = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const id = e.currentTarget.id;
    setActiveTab(id);
  };

  const displayContentTabs = () => {
    if (activeTab == "Update")
      return <UpdateStockForm closeModal={closeModal} args={args} />;
    else if (activeTab == "Assign")
      return <AssignStock closeModal={closeModal} args={args} />;
  };

  const styles = `hover:cursor-pointer w-full p-1 rounded-md text-black`;

  return (
    <section>
      <div className="flex space-x-5 place-content-center">
        <div className="space-y-4 w-2/6 text-md mt-1">
          <Button
            id="Update"
            onClick={handleSelectTab}
            className={`${styles} ${
              activeTab === "Update"
                ? "bg-custom1 hover:bg-customPale text-white"
                : "bg-gray-200 hover:bg-gray-200"
            }`}
          >
            Update
          </Button>

          <Button
            id="Assign"
            onClick={handleSelectTab}
            className={`${styles} ${
              activeTab === "Assign"
                ? "bg-custom1 hover:bg-customPale text-white"
                : "bg-gray-200 hover:bg-gray-200"
            }`}
          >
            Assign
          </Button>
        </div>
        <Separator orientation="vertical" />
        <div>{displayContentTabs()}</div>
      </div>
    </section>
  );
};
export default ManageStock;
