import classNames from 'classnames';
import { Popup } from 'rc-tooltip';
import * as React from 'react';
import type { TooltipProps } from '.';

export interface PurePanelProps extends Omit<TooltipProps, 'children'> { }

/** @private Internal Component. Do not use in your production. */
const PurePanel: React.FC<PurePanelProps> = (props) => {
  const {
    className,
    placement = 'top',
    title,
    overlayInnerStyle,
  } = props;

  const prefixCls = "sd-tooltip";

  // Color


  const formattedOverlayInnerStyle: React.CSSProperties = {
    ...overlayInnerStyle,
  };

  const cls = classNames(
    prefixCls,
    `${prefixCls}-pure`,
    `${prefixCls}-placement-${placement}`,
    className,
  );

  return (
    <div className={cls}>
      <div className={`${prefixCls}-arrow`} />
      <Popup
        {...props}
        prefixCls={prefixCls}
        overlayInnerStyle={formattedOverlayInnerStyle}
      >
        {title}
      </Popup>
    </div>
  );
};

export default PurePanel;
