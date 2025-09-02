export function removeClass(ele: Element, cls: string | string[]): void {
    if (typeof cls === 'string') {
        if (ele.classList.contains(cls)) {
            ele.classList.remove(cls);
        }
    } else {
        for (const c of cls) {
            if (ele.classList.contains(cls)) {
                ele.classList.remove(cls);
            }
        }
    }
}

export function wrapWith(): void {

}
