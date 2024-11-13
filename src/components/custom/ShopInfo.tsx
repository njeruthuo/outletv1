import { GlobalCloseButton } from "../reusable";
import { Location } from "../../pages/sales/map";
import { Performance, StockChart, Team } from "@/pages";
import { ShopInfoProps } from "@/lib/types/sales/shopInfo";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ShopInfo = ({ closeModal, infoModalData }: ShopInfoProps) => {
  console.log(infoModalData, "infoModalData");
  return (
    <section className="p-4">
      <div className="flex justify-center">
        <div className="w-full">
          <Tabs defaultValue="Location" className="space-y-4">
            <TabsList className="flex justify-between w-full">
              <TabsTrigger value="Location" className="flex-1">
                Location
              </TabsTrigger>
              <TabsTrigger value="In charge" className="flex-1">
                Team in-charge
              </TabsTrigger>
              <TabsTrigger value="Performance" className="flex-1">
                Performance
              </TabsTrigger>
              <TabsTrigger value="Stock" className="flex-1">
                Stock
              </TabsTrigger>
            </TabsList>

            <TabsContent
              value="Location"
              className="overflow-y-auto min-w-[700px]"
            >
              {infoModalData && (
                <Location
                  name={infoModalData.branch_name}
                  coordinates={infoModalData.coordinates}
                />
              )}
            </TabsContent>

            <TabsContent
              value="In charge"
              className="p-4 max-h-[70vh] overflow-y-auto"
            >
              <Team />
            </TabsContent>

            <TabsContent
              value="Stock"
              className="p-4 max-h-[70vh] overflow-y-auto"
            >
              <StockChart />
            </TabsContent>

            <TabsContent
              value="Performance"
              className="p-4 max-h-[70vh] overflow-y-auto"
            >
              <Performance />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <GlobalCloseButton closeModal={closeModal as (args?: unknown) => void}>
        close
      </GlobalCloseButton>
    </section>
  );
};
export default ShopInfo;
