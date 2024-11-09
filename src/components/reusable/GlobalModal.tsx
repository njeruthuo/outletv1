import { GlobalModalPropTypes } from "@/lib/types/stock/GlobalModalTypes";
import { ModalDialog, Modal, ModalClose } from "@mui/joy";

const GlobalModal = ({ open, closeFunc, children }: GlobalModalPropTypes) => {
  return (
    <Modal open={open} onClose={closeFunc}>
      <ModalDialog
        color="neutral"
        layout="center"
        size="lg"
        variant="soft"
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        style={{ width: "850px", height: "400px" }}
      >
        <ModalClose />
        <div className="z-[1400]">{children}</div>
      </ModalDialog>
    </Modal>
  );
};
export default GlobalModal;
