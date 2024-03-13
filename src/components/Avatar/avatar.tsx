import React, { CSSProperties, ReactNode, useEffect, useMemo, useState } from 'react';
import { ReactComponent as Person } from '../../assets/avatar/person.svg';
import './avatar.scss';
export type SizeType = 'small' | 'middle' | 'large' | 'plus';
enum sizeCls {
    'small' = 90,
    'middle' = 60,
    'large' = 44,
    'plus' = 40,
}
interface IProps {
    avatars: { url: string; name?: string }[];
    size: SizeType;
    className?: string;
    onClick?: () => void;
    suffix?: { url?: string; name: string };
    style?: CSSProperties;
    mintIcon?: ReactNode;
}

export const SdAvatar = (props: IProps) => {
    const avatars = useMemo(() => props.avatars.slice(0, 9), [props.avatars]);
    const [allLoaded, setLoaded] = useState(false);
    const width = sizeCls[props.size] || 80;
    const height = sizeCls[props.size] || 80;

    useEffect(() => {
        props.avatars.length &&
            Promise.all(
                props.avatars.map(
                    ({ url }) =>
                        new Promise((resolve) => {
                            const v = new Image();

                            v.src = url;
                            v.onload = resolve;
                            v.onerror = resolve;
                        })
                )
            ).then(() => setLoaded(true));
    }, [props.avatars]);
    return (
        <div className='sd-combine-avatar-wrapper'>
            <div
                className={`sd-combine-avatar in-${avatars.length}-avatar ${props.className || ''}`}
                style={{
                    width: width,
                    height,
                    borderRadius: `${0.3 * width}px`,
                    borderWidth: `${avatars.length === 1 ? width / 8 : 2}px`,
                    ...props.style,
                }}
                onClick={props.onClick}
            >
                {allLoaded ? (
                    avatars.map(({ url: avatar, name }, index) => {
                        return (
                            <div key={index} className='sd-combine-avatar-item'>
                                <img
                                    src={avatar}
                                    alt='avatar'
                                //   style={{
                                //     borderRadius: `${
                                //       avatars.length === 1 ? width * 0.175 : 0
                                //     }px`,
                                //   }}
                                />
                                {name ? (
                                    <svg width='100%' height='100%' viewBox='0 0 30 30'>
                                        <text x='9.5' y='21.5'>
                                            {name}
                                        </text>
                                    </svg>
                                ) : null}
                            </div>
                        );
                    })
                ) : (
                    <div
                        className='sd-combine-avatar-bg'
                        style={{
                            borderRadius: `${0.3 * width}px`,
                            ...props.style,
                        }}
                    >
                        <Person />
                    </div>
                )}
            </div>
            {props.suffix ? (
                <div
                    className='sd-combine-avatar-suffix sd-combine-avatar-item'
                    style={{
                        width: width * 0.55,
                        height: height * 0.55,
                    }}
                >
                    <img src={props.suffix.url} alt='avatar' />
                    {props.suffix.name ? (
                        <svg width='100%' height='100%' viewBox='0 0 30 30'>
                            <text x='9.5' y='21.5'>
                                {props.suffix.name}
                            </text>
                        </svg>
                    ) : null}
                </div>
            ) : null}
            {props.mintIcon}
        </div>
    );
};
SdAvatar.defaultProps = {
    avatars:[],
    size:"large"
}
export default SdAvatar;
