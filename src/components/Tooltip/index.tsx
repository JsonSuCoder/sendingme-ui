import * as React from 'react';
// import classNames from 'classnames';
import RcTooltip from 'rc-tooltip';
import type { placements as Placements } from 'rc-tooltip/lib/placements';
import type {
    TooltipProps as RcTooltipProps,
    TooltipRef as RcTooltipRef,
} from 'rc-tooltip/lib/Tooltip';
import useMergedState from 'rc-util/lib/hooks/useMergedState';

import { isFragment } from '../../utils/reactNode';
import "./index.scss";

export interface TooltipRef {
    /** @deprecated Please use `forceAlign` instead */
    forcePopupAlign: VoidFunction;
    forceAlign: VoidFunction;
}

export type TooltipPlacement =
    | 'top'
    | 'left'
    | 'right'
    | 'bottom'
    | 'topLeft'
    | 'topRight'
    | 'bottomLeft'
    | 'bottomRight'
    | 'leftTop'
    | 'leftBottom'
    | 'rightTop'
    | 'rightBottom';


// remove this after RcTooltip switch visible to open.
interface LegacyTooltipProps
    extends Partial<
        Omit<
            RcTooltipProps,
            | 'children'
            | 'visible'
            | 'defaultVisible'
            | 'onVisibleChange'
            | 'afterVisibleChange'
            | 'destroyTooltipOnHide'
        >
    > {
    open?: RcTooltipProps['visible'];
    defaultOpen?: RcTooltipProps['defaultVisible'];
    onOpenChange?: RcTooltipProps['onVisibleChange'];
    afterOpenChange?: RcTooltipProps['afterVisibleChange'];

    // Legacy
    /** @deprecated Please use `open` instead. */
    visible?: RcTooltipProps['visible'];
    /** @deprecated Please use `defaultOpen` instead. */
    defaultVisible?: RcTooltipProps['defaultVisible'];
    /** @deprecated Please use `onOpenChange` instead. */
    onVisibleChange?: RcTooltipProps['onVisibleChange'];
    /** @deprecated Please use `afterOpenChange` instead. */
    afterVisibleChange?: RcTooltipProps['afterVisibleChange'];
}

export interface TooltipProps extends LegacyTooltipProps {
    title: React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
    rootClassName?: string;
    color?: string;
    placement?: TooltipPlacement;
    builtinPlacements?: typeof Placements;
    openClassName?: string;
    /** @deprecated Please use `arrow={{ pointAtCenter: true }}` instead. */
    arrowPointAtCenter?: boolean;
    arrow?:
    | boolean
    | {
        /** @deprecated Please use `pointAtCenter` instead. */
        arrowPointAtCenter?: boolean;
        pointAtCenter?: boolean;
    };
    autoAdjustOverflow?: boolean;
    children?: React.ReactNode;
    destroyTooltipOnHide?: boolean | { keepParent?: boolean };
}



export const SdTooltip = React.forwardRef<TooltipRef, TooltipProps>((props, ref) => {
    const {
        // openClassName,
        getTooltipContainer,
        // color,
        children,
        afterOpenChange,
        afterVisibleChange,
        destroyTooltipOnHide = true,
        arrow = true,
        title,
    } = props;

    const mergedShowArrow = !!arrow;


    const tooltipRef = React.useRef<RcTooltipRef>(null);

    const forceAlign = () => {
        tooltipRef.current?.forceAlign();
    };

    React.useImperativeHandle(ref, () => ({
        forceAlign,
        forcePopupAlign: () => {
            forceAlign();
        },
    }));


    // ============================== Open ==============================
    const [open, setOpen] = useMergedState(false, {
        value: props.open ?? props.visible,
        defaultValue: props.defaultOpen ?? props.defaultVisible,
    });


    const onOpenChange = (vis: boolean) => {
        setOpen(vis);
        props.onOpenChange?.(vis);
    };

    const {
        placement = 'top',
        mouseEnterDelay = 0.1,
        mouseLeaveDelay = 0.1,
        rootClassName,
        zIndex = 10070,
        ...otherProps
    } = props;

    const prefixCls = "sd-tooltip";

    // ============================= Render =============================
    const child =
        React.isValidElement(children) && !isFragment(children) ? children : <span>{children}</span>;
    return <RcTooltip
        {...otherProps}
        zIndex={zIndex}
        showArrow={mergedShowArrow}
        placement={placement}
        mouseEnterDelay={mouseEnterDelay}
        mouseLeaveDelay={mouseLeaveDelay}
        prefixCls={prefixCls}
        getTooltipContainer={getTooltipContainer}
        ref={tooltipRef}
        overlay={title}
        visible={open}
        onVisibleChange={onOpenChange}
        afterVisibleChange={afterOpenChange ?? afterVisibleChange}
        arrowContent={<span className={`${prefixCls}-arrow-content`} />}
        motion={{
            motionName: "zoom-big-fast",
            motionDeadline: 100,
        }}
        destroyTooltipOnHide={!!destroyTooltipOnHide}
    >
        {child}
    </RcTooltip>
})

export default SdTooltip;
