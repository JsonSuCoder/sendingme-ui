import { ButtonType, SizeType, spaceChildren } from "./buttonHelpers";
import React, { forwardRef } from "react";
import classNames from 'classnames';
import "./button.scss";
import { SdIcon } from "../Icon/icon";
type MergedHTMLAttributes = Omit<
    React.HTMLAttributes<HTMLElement> &
    React.ButtonHTMLAttributes<HTMLElement> &
    React.AnchorHTMLAttributes<HTMLElement>,
    'type'
>;
export interface BaseButtonProps {
    type?: ButtonType;
    icon?: string;
    size?: SizeType;
    disabled?: boolean;
    loading?: boolean | { delay?: number };
    prefixCls?: string;
    className?: string;
    danger?: boolean;
    children?: React.ReactNode;
    classNames?: { icon: string };
    styles?: React.CSSProperties;
}
export interface ButtonProps extends BaseButtonProps, MergedHTMLAttributes {
    href?: string;
}
type CompoundedComponent = React.ForwardRefExoticComponent<
    ButtonProps & React.RefAttributes<HTMLElement>
>;
const prefixCls = "sd-btn";

export const InternalButton: React.ForwardRefRenderFunction<
    HTMLButtonElement | HTMLAnchorElement,
    ButtonProps
> = (props: ButtonProps) => {
    const { size, loading, danger, icon, styles, disabled, type = "primary", children, ...restProps } = props;
    const sizeClassNameMap = { large: 'lg', small: 'sm', middle: undefined };
    const sizeCls = size ? sizeClassNameMap[size] : undefined;
    const classes = classNames(
        {
            [`${prefixCls}`]: true,
            [`${prefixCls}-${type}`]: type,
            [`${prefixCls}-${sizeCls}`]: sizeCls,
            [`${prefixCls}-disabled`]: disabled,
            [`${prefixCls}-loading`]: loading,
            [`${prefixCls}-dangerous`]: !!danger,
        },
        props.className,
    );
    const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>) => {
        const { onClick } = props;
        if (loading || disabled) {
            e.preventDefault();
            return;
        }
        (onClick as React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>)?.(e);
    };
    const iconNode = icon ? <SdIcon icon={icon} className={`${prefixCls}-icon`}></SdIcon> : null;
    const child = spaceChildren(children);
    let buttonNode = (
        <button
            {...restProps}
            className={classes}
            style={styles}
            onClick={handleClick}
            disabled={disabled}
        >
            {iconNode}
            {child}
            {loading ? <SdIcon icon="MoreOutlines" className={`${prefixCls}-icon`}></SdIcon> : null}
        </button>
    );
    return buttonNode;
}
const SdButton = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
    InternalButton,
) as CompoundedComponent;

export default SdButton;