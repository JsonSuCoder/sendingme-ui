import React from 'react';
import type { ModalProps } from './interface';
import SdIcon from '../Icon/icon';
import SdButton from '../Button/button';

export function renderCloseIcon() {
    return (
        <SdIcon icon="CloseOutlined"></SdIcon>
    );
}

interface FooterProps {
    onOk?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
    onCancel?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
}

export const Footer: React.FC<
    FooterProps &
    Pick<
        ModalProps,
        | 'footer'
        | 'okText'
        | 'okType'
        | 'cancelText'
        | 'cancelType'
        | 'confirmLoading'
        | 'okButtonProps'
        | 'cancelButtonProps'
    >
> = (props) => {
    const {
        okText,
        okType = 'primary',
        cancelText,
        cancelType = 'associate',
        confirmLoading,
        onOk,
        onCancel,
        okButtonProps,
        cancelButtonProps,
    } = props;

    // ================== Locale Text ==================
    const okTextLocale = okText || "Confirm";
    const cancelTextLocale = cancelText || "Cancel";

    return (
        <div className='sd-modal-footer'>
            <SdButton onClick={onCancel} type={cancelType} {...okButtonProps}>{cancelTextLocale}</SdButton>
            <SdButton onClick={onOk} type={okType} loading={confirmLoading} {...cancelButtonProps}>{okTextLocale}</SdButton>
        </div>
    )
};
