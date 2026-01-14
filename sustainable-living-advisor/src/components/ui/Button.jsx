import { cn } from "../../lib/utils";
import { motion } from "framer-motion";

export function Button({ className, variant = "primary", size = "md", children, onClick, type = "button", ...props }) {
    const variants = {
        primary: "bg-nature-600 text-white hover:bg-nature-700 shadow-lg shadow-nature-200/50",
        secondary: "bg-white text-nature-700 border border-nature-200 hover:bg-nature-50 shadow-sm",
        outline: "bg-transparent border border-nature-600 text-nature-600 hover:bg-nature-50",
        ghost: "bg-transparent text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
    };

    const sizes = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-6 py-2.5 text-base",
        lg: "px-8 py-3.5 text-lg"
    };

    return (
        <motion.button
            type={type}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className={cn(
                "rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 outline-none focus:ring-4 focus:ring-nature-100",
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        >
            {children}
        </motion.button>
    );
}
