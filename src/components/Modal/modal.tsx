import * as React from "react";
import classNames from "classnames";
import RcDialog from 'rc-dialog';
import { ModalProps } from "./interface";
import { Footer } from "./footer";
import "./modal.scss";
import SdIcon from "../Icon/icon";
export const SdModal: React.FC<ModalProps> = (props) => {
    const { className, width, footer, open, closable = false, closeIcon, style, title, children, wrapClassName, ...restProps } = props;
    const classes = classNames({
        [`${className}`]: className
    })
    const handleCancel = () => {
        const { onCancel } = props;
        onCancel?.();
    };

    const handleOk = () => {
        const { onOk } = props;
        onOk?.();
    };
    const dialogFooter = footer !== null && (
        <Footer {...props} onOk={handleOk} onCancel={handleCancel} />
    );
    const mergedCloseIcon = closeIcon ? closeIcon : <SdIcon icon="CloseOutlines" />;
    return (
        <RcDialog
            title={title}
            width={width}
            zIndex={restProps.zIndex}
            getContainer={restProps.getContainer}
            prefixCls="sd-modal"
            rootClassName={classes}
            closeIcon={mergedCloseIcon}
            footer={dialogFooter}
            visible={open}
            onClose={handleCancel}
            closable={closable}
            className={classes}
            style={{ ...style }}
            classNames={{
                wrapper: wrapClassName
            }}
        >
            {children}
        </RcDialog>
    )
}
export default SdModal;