import { ModalProps, ModalStaticFunctions } from "./interface";
import OriginModal from "./modal";
import { createDialog } from "./creat";

type ModalType = typeof OriginModal & ModalStaticFunctions;

const SdModal = OriginModal as ModalType;

SdModal.createDialog = function (props: ModalProps) {
    return createDialog(props);
}


export default SdModal;