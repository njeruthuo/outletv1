import AssignStock from "./AssignStock";
import UpdateStockForm from "./UpdateStockForm";
import { StockProps } from "@/lib/types/stock/StockItemTypes";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ManageStock: React.FC<StockProps> = ({ closeModal, args }) => {
  return (
    <section className="p-4">
      <div className="flex justify-center">
        <div className="w-full">
          <Tabs defaultValue="Update" className="space-y-4">
            <TabsList className="flex justify-between w-full">
              <TabsTrigger value="Update" className="flex-1">
                Update
              </TabsTrigger>
              <TabsTrigger value="Assign" className="flex-1">
                Assign
              </TabsTrigger>
            </TabsList>

            <TabsContent
              value="Update"
              className="p-4 max-h-[70vh] overflow-y-auto"
            >
              <UpdateStockForm closeModal={closeModal} args={args} />
            </TabsContent>

            <TabsContent
              value="Assign"
              className="p-4 max-h-[70vh] overflow-y-auto"
            >
              <AssignStock closeModal={closeModal} args={args} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};
export default ManageStock;
