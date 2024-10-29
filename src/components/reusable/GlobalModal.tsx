import { GlobalModalPropTypes } from "@/lib/types/GlobalModalTypes";
import { ModalDialog, Modal, ModalClose } from "@mui/joy";

const GlobalModal = ({
  open,
  closeFunc,
  children,
}: GlobalModalPropTypes) => {
  return (
    <Modal open={open} onClose={closeFunc}>
      <ModalDialog
        color="neutral"
        layout="center"
        size="lg"
        variant="soft"
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
      >
        <ModalClose />
        {/* <Typography>{title}</Typography> */}
        {children}
      </ModalDialog>
    </Modal>
  );
};
export default GlobalModal;
