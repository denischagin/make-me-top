import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface EntryAnimateProps {
    children: ReactNode;
    duration?: number;
    delay?: number;
    className?: string;
}

export const EntryAnimateGalaxies = ({
    delay = 0,
    duration = 1,
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
