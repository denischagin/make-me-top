import React,
{
    HTMLAttributes,
    ReactNode,
} from 'react';
import {
    motion,
    MotionProps,
} from 'framer-motion';

interface EntryAnimateProps {
    duration: number;
    children: ReactNode;
    delay?: number;
    className?: string;
}

export const EntryAnimateGalaxies = ({
    delay = 0,
    duration,
    ...props
}: EntryAnimateProps) => {
    return (
        <motion.div
            transition={{
                delay,
                duration,
            }}
            initial={{
                translateY: '42px',
                opacity: 0,
            }}
            animate={{
                translateY: 0,
                opacity: 1,
            }}
            {...props}
        />
    );
};
