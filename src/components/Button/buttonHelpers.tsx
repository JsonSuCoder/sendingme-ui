import React from "react";

const ButtonTypes = ['default', 'primary', 'dashed', 'link', 'text', 'associate', 'danger', 'warning', 'success'] as const;
export type ButtonType = typeof ButtonTypes[number];

export type SizeType = 'small' | 'middle' | 'large' | undefined;

export function isString(str: any): str is string {
    return typeof str === 'string';
}

export function isUnBorderedButtonType(type?: ButtonType) {
    return type === 'text' || type === 'link';
}

function splitCNCharsBySpace(child: React.ReactElement | string | number) {
    if (child === null || child === undefined) {
        return;
    }

    if (isString(child)) {
        return <span>{child}</span>;
    }

    return child;
}

export function spaceChildren(children: React.ReactNode) {
    let isPrevChildPure: boolean = false;
    const childList: React.ReactNode[] = [];

    React.Children.forEach(children, (child) => {
        const type = typeof child;
        const isCurrentChildPure = type === 'string' || type === 'number';
        if (isPrevChildPure && isCurrentChildPure) {
            const lastIndex = childList.length - 1;
            const lastChild = childList[lastIndex];
            childList[lastIndex] = `${lastChild}${child}`;
        } else {
            childList.push(child);
        }

        isPrevChildPure = isCurrentChildPure;
    });

    return React.Children.map(childList, (child) =>
        splitCNCharsBySpace(child as React.ReactElement | string | number),
    );
}