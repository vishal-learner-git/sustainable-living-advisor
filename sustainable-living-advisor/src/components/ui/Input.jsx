import { cn } from "../../lib/utils";

export function Input({ label, className, ...props }) {
    return (
        <div className="flex flex-col gap-2 w-full text-left">
            {label && <label className="text-sm font-semibold text-gray-700 ml-1">{label}</label>}
            <input
                className={cn(
                    "w-full rounded-xl border border-gray-200 bg-white/50 px-4 py-3 outline-none focus:ring-4 focus:ring-nature-400/20 focus:border-nature-400 transition-all placeholder:text-gray-400 text-gray-900",
                    className
                )}
                {...props}
            />
        </div>
    );
}
