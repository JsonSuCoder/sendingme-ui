import React, { useState } from "react";
import { ModalProps } from "./interface"
import SdModal from ".";

export interface CreatDialogProps extends ModalProps {
    close?: () => void;
}
const CreatDialog: React.FC<CreatDialogProps> = (props) => {
    const {
        close,
        onCancel,
        onOk,
        children,
        open,
        confirmLoading
    } = props;
    const [mergeLoading, setMergeLoading] = useState(confirmLoading)
    const handleCancel = () => {
        close?.();
        onCancel?.();
    };
    const handleOk = () => {
        setMergeLoading(true);
        onOk?.(close);
    };
    return (
        <SdModal
            {...props}
            onCancel={handleCancel}
            onOk={handleOk}
            open={open}
            confirmLoading={mergeLoading}
        >
            {children}
        </SdModal>
    )
};
export default CreatDialog;