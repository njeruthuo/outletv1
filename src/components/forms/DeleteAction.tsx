import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useDeleteStockMutation } from "@/features/stock/stockAPI";
import { ICellRendererParams } from "ag-grid-community";
import { useMemo } from "react";

interface DeleteActionProps {
  data: ICellRendererParams;
  onConfirm?: (data: ICellRendererParams) => void;
}

const DeleteAction: React.FC<DeleteActionProps> = ({ data, onConfirm }) => {
  const [deleteStock] = useDeleteStockMutation();

  const stockId = useMemo(() => {
    return data?.data?.id || 0;
  }, [data]);

  const handleConfirmClick = async () => {

    if (!stockId) {
      console.error("Stock ID is undefined!");
      return;
    }


    if (onConfirm) {
      try {
        await deleteStock({ id: stockId }).unwrap();
      } catch (error) {
        console.log(error);
      }
      onConfirm(data.data);
    } else {
      console.error("onConfirm function not provided!");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <img src="/delete_24.svg" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            stock item and remove it from the records.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-danger hover:bg-dangerPale"
            onClick={handleConfirmClick}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAction;
