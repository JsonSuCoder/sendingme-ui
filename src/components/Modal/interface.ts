import type { FC, ReactElement } from 'react';
import type { DialogProps } from 'rc-dialog';

import type { ButtonProps } from '../Button/button';
import { ButtonType } from '../Button/buttonHelpers';

export type ModalFooterRender = (
    originNode: React.ReactNode,
    extra: { OkBtn: FC; CancelBtn: FC },
) => React.ReactNode;
interface ModalCommonProps {
    styles?: Omit<NonNullable<DialogProps['styles']>, 'wrapper'>;
}
export interface ModalProps extends ModalCommonProps {
    /** Whether the modal dialog is visible or not */
    open?: boolean;
    /** Whether to apply loading visual effect for OK button or not */
    confirmLoading?: boolean;
    /** The modal dialog's title */
    title?: React.ReactNode;
    /** Whether a close (x) button is visible on top right of the modal dialog or not. Recommend to use closeIcon instead. */
    closable?: boolean | ({ closeIcon?: React.ReactNode } & React.AriaAttributes);
    /** Specify a function that will be called when a user clicks the OK button */
    onOk?: (close?: () => void) => void;
    /** Specify a function that will be called when a user clicks mask, close button on top right or Cancel button */
    onCancel?: () => void;
    showCancel?: boolean;
    afterClose?: () => void;
    /** Callback when the animation ends when Modal is turned on and off */
    afterOpenChange?: (open: boolean) => void;
    /** Centered Modal */
    centered?: boolean;
    /** Width of the modal dialog */
    width?: string | number;
    /** Footer content */
    footer?: ModalFooterRender | React.ReactNode;
    /** Text of the OK button */
    okText?: React.ReactNode;
    /** Button `type` of the OK button */
    okType?: ButtonType;
    /** Text of the Cancel button */
    cancelText?: React.ReactNode;
    /** Button `type` of the cancel button */
    cancelType?: ButtonType;
    /** Whether to close the modal dialog when the mask (area outside the modal) is clicked */
    maskClosable?: boolean;
    /** Force render Modal */
    forceRender?: boolean;
    okButtonProps?: ButtonProps;
    cancelButtonProps?: ButtonProps;
    destroyOnClose?: boolean;
    style?: React.CSSProperties;
    wrapClassName?: string;
    className?: string;
    rootClassName?: string;
    classNames?: NonNullable<DialogProps['classNames']>;
    getContainer?: string | HTMLElement | getContainerFunc | false;
    zIndex?: number;
    /** @deprecated Please use `styles.body` instead */
    bodyStyle?: React.CSSProperties;
    /** @deprecated Please use `styles.mask` instead */
    maskStyle?: React.CSSProperties;
    mask?: boolean;
    keyboard?: boolean;
    wrapProps?: any;
    prefixCls?: string;
    closeIcon?: boolean;
    modalRender?: (node: React.ReactNode) => React.ReactNode;
    focusTriggerAfterClose?: boolean;
    children?: React.ReactNode;
    type?: "createDialog" | "showDialog";
}

type getContainerFunc = () => HTMLElement;


export type ModalFunc = (props: ModalProps) => {
    close: () => void;
};

export type ModalStaticFunctions = Record<NonNullable<ModalProps["type"]>, ModalFunc>;


