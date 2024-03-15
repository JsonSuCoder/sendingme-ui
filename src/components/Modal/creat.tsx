import React, { ReactElement } from "react";
import { render as reactRender, unmount as reactUnmount } from 'rc-util/lib/React/render';
import { ModalFuncProps } from "./interface";
import CreatDialogWrapper from "./CreatDialog";

export function createDialog(config: ModalFuncProps) {
    const container = document.createDocumentFragment();
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    let currentConfig = { ...config, close, open: true } as any;
    let timeoutId: ReturnType<typeof setTimeout>;

    function render(props: any) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            const dom = <CreatDialogWrapper {...props} />;
            reactRender(
                dom,
                container,
            );
        });
    }

    function close() {
        reactUnmount(container);
        clearTimeout(timeoutId);
    }

    render(currentConfig);
    return {
        close: close
    }
}

export function showDialog(dialog: ModalFuncProps) {
    const container = document.createDocumentFragment();
    reactRender(
        dialog as ReactElement,
        container,
    );
    function close() {
        reactUnmount(container);
    }
    return {
        close: close
    }
}
