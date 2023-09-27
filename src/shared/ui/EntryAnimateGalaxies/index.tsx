import React, { HTMLAttributes } from 'react';
import {
    motion,
    MotionProps,
} from 'framer-motion';

type EntryAnimateProps = MotionProps & HTMLAttributes<HTMLDivElement>;

export const EntryAnimateGalaxies = (props: EntryAnimateProps) => {
    return (
        <motion.div
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
