import { motion } from 'framer-motion';

export const BackgroundEffects = () => {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <motion.div
                animate={{
                    x: [0, 20, 0],
                    y: [0, 20, 0],
                    rotate: [0, 2, 0]
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute -top-[10%] -left-[10%] w-[70%] h-[70%] bg-blue-400/10 dark:bg-blue-900/10 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen"
            />
            <motion.div
                animate={{
                    x: [0, -20, 0],
                    y: [0, 20, 0],
                    rotate: [0, -2, 0]
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] bg-cyan-400/10 dark:bg-cyan-900/10 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen"
            />
            <motion.div
                animate={{
                    x: [0, 20, 0],
                    y: [0, -20, 0],
                    rotate: [0, 2, 0]
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute -bottom-[20%] left-[20%] w-[80%] h-[60%] bg-purple-400/10 dark:bg-purple-900/10 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen"
            />
        </div>
    );
};
