import { cn } from "../../lib/utils";
import { motion } from "framer-motion";

export function Card({ children, className, ...props }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={cn(
                "bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl shadow-gray-200/50 border border-white/50",
                className
            )}
            {...props}
        >
            {children}
        </motion.div>
    );
}
