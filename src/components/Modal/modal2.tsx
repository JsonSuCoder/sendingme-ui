import * as React from "react";
import classNames from "classnames";
import RcDialog from 'rc-dialog';
import { ModalProps } from "./interface";
import { Footer } from "./footer";
import 'rc-dialog/assets/index.css'; // 引入rc-dialog的样式
export const SdModal: React.FC<ModalProps> = (props) => {
    const { className, width, footer, open, closable, closeIcon, style, title, ...restProps } = props;
    const classes = classNames({
        [`${className}`]: className,
        "sd-modal": true
    })
    const handleCancel = (e: React.SyntheticEvent<Element, Event>) => {
        const { onCancel } = props;
        onCancel?.(e);
    };

    const handleOk = (e: React.SyntheticEvent<Element, Event>) => {
        const { onOk } = props;
        onOk?.(e);
    };
    const dialogFooter = footer !== null && (
        <Footer {...props} onOk={handleOk} onCancel={handleCancel} />
    );
    return (
        <RcDialog
            title={title}
            width={width}
            zIndex={restProps.zIndex}
            getContainer={restProps.getContainer}
            prefixCls="sd-modal"
            rootClassName={classes}
            footer={dialogFooter}
            visible={open}
            onClose={handleCancel}
            closable={closable}
            closeIcon={closeIcon}
            className={classes}
            style={{ ...style }}
        />
    )
}
export default SdModal;