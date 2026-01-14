import { cn } from "../../lib/utils";
import { ChevronDown } from "lucide-react";

export function Select({ label, options, className, ...props }) {
    return (
        <div className="flex flex-col gap-2 w-full text-left">
            {label && <label className="text-sm font-semibold text-gray-700 ml-1">{label}</label>}
            <div className="relative">
                <select
                    className={cn(
                        "w-full rounded-xl border border-gray-200 bg-white/50 px-4 py-3 outline-none focus:ring-4 focus:ring-nature-400/20 focus:border-nature-400 transition-all appearance-none cursor-pointer text-gray-900",
                        className
                    )}
                    {...props}
                >
                    {options.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
            </div>
        </div>
    );
}
