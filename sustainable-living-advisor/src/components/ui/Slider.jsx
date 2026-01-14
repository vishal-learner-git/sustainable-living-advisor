import React from 'react';

export function Slider({ label, value, min = 0, max, unit = '', onChange, className }) {
    // Calculate percentage for background fill
    const percentage = ((value - min) / (max - min)) * 100;

    return (
        <div className={`w-full ${className}`}>
            <div className="flex justify-between items-center mb-2">
                <label className="text-gray-600 font-medium text-sm">{label}</label>
                <span className="text-gray-900 font-bold text-sm">{value}{unit}</span>
            </div>
            <div className="relative w-full h-6 flex items-center">
                {/* Track Background */}
                <div className="absolute w-full h-2 bg-nature-100/50 rounded-full" />

                {/* Fill Track */}
                <div
                    className="absolute h-2 bg-nature-700 rounded-full"
                    style={{ width: `${percentage}%` }}
                />

                {/* Native Input */}
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={value}
                    onChange={(e) => onChange(Number(e.target.value))}
                    className="absolute w-full h-full opacity-0 cursor-pointer z-10"
                />

                {/* Custom Thumb (Visual only, follows percentage) */}
                <div
                    className="absolute w-5 h-5 bg-white border-2 border-nature-700 rounded-full shadow-md pointer-events-none transition-transform active:scale-110"
                    style={{
                        left: `calc(${percentage}% - 10px)`
                    }}
                />
            </div>
        </div>
    );
}
