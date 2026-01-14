import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Droplets, Utensils, Footprints, ArrowRight, ArrowLeft } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';

const steps = [
    { id: 'electricity', title: 'Energy Usage', icon: Zap, color: 'text-yellow-500' },
    { id: 'water', title: 'Water Habits', icon: Droplets, color: 'text-blue-500' },
    { id: 'food', title: 'Food & Diet', icon: Utensils, color: 'text-green-500' },
    { id: 'transport', title: 'Transport', icon: Footprints, color: 'text-orange-500' },
];

export function Wizard({ onComplete }) {
    const [currentStep, setCurrentStep] = useState(0);
    const [direction, setDirection] = useState(1);
    const [formData, setFormData] = useState({
        electricity: { acHours: '', lightHours: '' },
        water: { bathingMethod: 'bucket', wastage: 'no' },
        food: { diet: 'vegetarian', wastage: 'no', frequency: 'occasional' },
        transport: { mode: 'public' }
    });

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setDirection(1);
            setCurrentStep(prev => prev + 1);
        } else {
            onComplete(formData);
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setDirection(-1);
            setCurrentStep(prev => prev - 1);
        }
    };

    const updateData = (category, field, value) => {
        setFormData(prev => ({
            ...prev,
            [category]: { ...prev[category], [field]: value }
        }));
    };

    const CurrentIcon = steps[currentStep].icon;

    return (
        <div className="w-full max-w-lg mx-auto">
            {/* Progress Bar */}
            <div className="mb-8">
                <div className="flex justify-between mb-2">
                    {steps.map((step, idx) => (
                        <div
                            key={step.id}
                            className={`flex items-center gap-2 text-sm font-medium transition-colors ${idx <= currentStep ? 'text-nature-700' : 'text-gray-400'}`}
                        >
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${idx <= currentStep ? 'bg-nature-100 text-nature-700' : 'bg-gray-100'
                                }`}>
                                <step.icon size={16} />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-nature-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                        transition={{ type: "spring", stiffness: 100 }}
                    />
                </div>
            </div>

            <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                    key={currentStep}
                    custom={direction}
                    initial={{ x: direction === 1 ? 20 : -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: direction === 1 ? -20 : 20, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <Card>
                        <div className="flex items-center gap-3 mb-6">
                            <div className={`p-3 rounded-2xl bg-${steps[currentStep].color.split('-')[1]}-50`}>
                                <CurrentIcon className={`w-8 h-8 ${steps[currentStep].color}`} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">{steps[currentStep].title}</h2>
                                <p className="text-gray-500 text-sm">Step {currentStep + 1} of {steps.length}</p>
                            </div>
                        </div>

                        <div className="space-y-4 min-h-[200px]">
                            {currentStep === 0 && (
                                <>
                                    <Input
                                        label="Daily AC Usage (Hours)"
                                        type="number"
                                        placeholder="e.g. 0, 4, 8"
                                        value={formData.electricity.acHours}
                                        onChange={(e) => updateData('electricity', 'acHours', e.target.value)}
                                    />
                                    <Input
                                        label="Daily Light Usage (Hours)"
                                        type="number"
                                        placeholder="e.g. 5"
                                        value={formData.electricity.lightHours}
                                        onChange={(e) => updateData('electricity', 'lightHours', e.target.value)}
                                    />
                                </>
                            )}

                            {currentStep === 1 && (
                                <>
                                    <Select
                                        label="Bathing Method"
                                        options={[
                                            { value: 'bucket', label: 'Bucket Bath' },
                                            { value: 'shower', label: 'Shower' },
                                            { value: 'tub', label: 'Bathtub' }
                                        ]}
                                        value={formData.water.bathingMethod}
                                        onChange={(e) => updateData('water', 'bathingMethod', e.target.value)}
                                    />
                                    <Select
                                        label="Do you experience running taps/leaks?"
                                        options={[
                                            { value: 'no', label: 'No' },
                                            { value: 'yes', label: 'Yes' }
                                        ]}
                                        value={formData.water.wastage}
                                        onChange={(e) => updateData('water', 'wastage', e.target.value)}
                                    />
                                </>
                            )}

                            {currentStep === 2 && (
                                <>
                                    <Select
                                        label="Diet Type"
                                        options={[
                                            { value: 'vegetarian', label: 'Vegetarian' },
                                            { value: 'vegan', label: 'Vegan' },
                                            { value: 'non-veg', label: 'Non-Vegetarian' }
                                        ]}
                                        value={formData.food.diet}
                                        onChange={(e) => updateData('food', 'diet', e.target.value)}
                                    />
                                    {formData.food.diet === 'non-veg' && (
                                        <Select
                                            label="Meat Consumption Frequency"
                                            options={[
                                                { value: 'occasional', label: 'Occasional (1-2 times/week)' },
                                                { value: 'daily', label: 'Daily' }
                                            ]}
                                            value={formData.food.frequency}
                                            onChange={(e) => updateData('food', 'frequency', e.target.value)}
                                        />
                                    )}
                                    <Select
                                        label="Food Wastage Frequency"
                                        options={[
                                            { value: 'no', label: 'Rarely/Never' },
                                            { value: 'yes', label: 'Often' }
                                        ]}
                                        value={formData.food.wastage}
                                        onChange={(e) => updateData('food', 'wastage', e.target.value)}
                                    />
                                </>
                            )}

                            {currentStep === 3 && (
                                <>
                                    <Select
                                        label="Primary Mode of Transport"
                                        options={[
                                            { value: 'walking', label: 'Walking' },
                                            { value: 'bicycle', label: 'Bicycle' },
                                            { value: 'bus', label: 'Bus / Public Transport' },
                                            { value: 'carpool', label: 'Carpool' },
                                            { value: 'bike', label: 'Motorbike' },
                                            { value: 'car', label: 'Private Car' }
                                        ]}
                                        value={formData.transport.mode}
                                        onChange={(e) => updateData('transport', 'mode', e.target.value)}
                                    />
                                </>
                            )}
                        </div>

                        <div className="flex items-center justify-between mt-8 pt-4 border-t border-gray-100">
                            <Button
                                variant="ghost"
                                onClick={handleBack}
                                disabled={currentStep === 0}
                                className={currentStep === 0 ? "opacity-0 pointer-events-none" : ""}
                            >
                                <ArrowLeft size={18} /> Back
                            </Button>
                            <Button onClick={handleNext}>
                                {currentStep === steps.length - 1 ? 'Analyze' : 'Next'} <ArrowRight size={18} />
                            </Button>
                        </div>
                    </Card>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
