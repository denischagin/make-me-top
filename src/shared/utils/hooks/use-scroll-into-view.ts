import { RefObject, useRef } from 'react';

export type UseScrollIntoViewReturn<R> = [ref: RefObject<R>, handleScroll: () => void]

export const useScrollIntoView = <R extends HTMLElement = HTMLElement>(
    scrollArgs: boolean | ScrollIntoViewOptions = {
        behavior: 'smooth',
        block: 'start',
    }): UseScrollIntoViewReturn<R> => {
    const ref = useRef<R>(null);

    const handleScroll = () => {
        ref.current?.scrollIntoView(scrollArgs);
    };

    return [ref, handleScroll];
};