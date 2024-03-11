import React from "react";
import * as SdSvgIcon from "./icon-types";
import classNames from "classnames";
import "./icon.scss";
export interface IconProps {
    icon: string;
    className?: string;
    style?: React.CSSProperties;
    color?: string; // only for two-tone
}

export const SdIcon = (props:IconProps) => {
    const { icon, className, style, color } = props;
    console.log(icon,"------icon")
    console.log(className)
    const classes = classNames({
        className: true,
        "sd-icon": true
    })
    const IconSvg = (SdSvgIcon as any)[icon];
    return (
        <span role="img" aria-label={icon} className={classes} style={style} color={color}>
            {<IconSvg />}
        </span>
    )
}
export default SdIcon;