import React from "react";
import { render as reactRender,unmount as reactUnmount } from 'rc-util/lib/React/render';
import { ModalProps } from "./interface";
import CreatDialogWrapper from "./CreatDialog";

export default function createDialog(config: ModalProps) {
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
        close:close
    }
}
