import { ModalFuncProps, ModalStaticFunctions } from "./interface";
import OriginModal from "./modal";
import { createDialog, showDialog } from "./creat";

type ModalType = typeof OriginModal & ModalStaticFunctions;

const SdModal = OriginModal as ModalType;

SdModal.createDialog = function (props: ModalFuncProps) {
    return createDialog(props);
}
SdModal.showDialog = function (modal: ModalFuncProps) {
    return showDialog(modal);
}

export default SdModal;