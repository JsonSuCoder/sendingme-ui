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
    showCancel?: boolean
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
        showCancel = true,
        okButtonProps,
        cancelButtonProps,
    } = props;

    // ================== Locale Text ==================
    const okTextLocale = okText || "Confirm";
    const cancelTextLocale = cancelText || "Cancel";
    return (
        <>
            {showCancel ? <SdButton onClick={onCancel} size='large' type={cancelType} {...cancelButtonProps}>{cancelTextLocale}</SdButton> : null}
            <SdButton onClick={onOk} size='large' type={okType} loading={confirmLoading} {...okButtonProps}>{okTextLocale}</SdButton>
        </>
    )
};
