import { RefObject, useEffect, useRef } from 'react';

export interface UseObserverParams {
    isLoading: boolean,
    observerElementRef: RefObject<HTMLElement>,
    canCallback: boolean,
    state: unknown
}

export const useObserver = (params: UseObserverParams, func?: () => void) => {
        const {
            isLoading,
            state,
            canCallback,
            observerElementRef,
        } = params;

        const observerRef = useRef<IntersectionObserver | null>(null);

        useEffect(() => {
            if (!observerElementRef.current) return;
            if (isLoading) return;

            const callback: IntersectionObserverCallback = (entries) => {
                if (entries[0].isIntersecting && canCallback) {
                    func && func();
                }
            };

            observerRef.current = new IntersectionObserver(callback);
            observerRef.current.observe(observerElementRef.current);

            return () => observerRef.current?.disconnect();
        }, [state, observerElementRef, isLoading]);


    }
;