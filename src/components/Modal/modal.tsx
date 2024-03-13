import * as React from "react";
import classNames from "classnames";
import { ModalProps } from "./interface";
import { Footer } from "./footer";
export const SdModal: React.FC<ModalProps> = (props) => {
    const { className, width, footer, open, closable, closeIcon, style, title } = props;
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
        <div className={classes} style={{ width: width }}>
            <div className="sd-modal-header"></div>
            <div className="sd-modal-content"></div>
            {dialogFooter}
        </div>
    )
}
export default SdModal;