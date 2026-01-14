import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Droplets, Utensils, Footprints, ArrowRight } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Select } from '../components/ui/Select';
import { Slider } from '../components/ui/Slider';

export function AssessmentGrid({ onComplete }) {
    const [formData, setFormData] = useState({
        electricity: {
            fanHours: 8,
            lightHours: 6,
            acHours: 2
        },
        water: {
            bathingDuration: '10-15 minutes',
            washingFrequency: 'Daily',
            wastage: 'no'
        },
        food: {
            diet: 'Mixed (Veg & Non-veg)',
            wastage: 'Moderate wastage',
            mealsPerDay: 3
        },
        transport: {
            mode: 'Car',
            distance: 20
        }
    });

    const updateNested = (category, field, value) => {
        setFormData(prev => ({
            ...prev,
            [category]: { ...prev[category], [field]: value }
        }));
    };

    return (
        <div className="max-w-6xl mx-auto pb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

                {/* Electricity Card */}
                <Card className="p-6 relative overflow-hidden border-l-4 border-l-yellow-400">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-yellow-100 rounded-lg text-yellow-600">
                            <Zap size={24} />
                        </div>
                        <h2 className="text-xl font-bold font-serif text-gray-800">Electricity Usage</h2>
                    </div>

                    <div className="space-y-6">
                        <Slider
                            label="Fan Usage"
                            value={formData.electricity.fanHours}
                            max={24}
                            unit="h/day"
                            onChange={(v) => updateNested('electricity', 'fanHours', v)}
                        />
                        <Slider
                            label="Lights Usage"
                            value={formData.electricity.lightHours}
                            max={24}
                            unit="h/day"
                            onChange={(v) => updateNested('electricity', 'lightHours', v)}
                        />
                        <Slider
                            label="AC Usage"
                            value={formData.electricity.acHours}
                            max={24}
                            unit="h/day"
                            onChange={(v) => updateNested('electricity', 'acHours', v)}
                        />
                    </div>
                </Card>

                {/* Water Card */}
                <Card className="p-6 relative overflow-hidden border-l-4 border-l-blue-400">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                            <Droplets size={24} />
                        </div>
                        <h2 className="text-xl font-bold font-serif text-gray-800">Water Usage</h2>
                    </div>

                    <div className="space-y-4">
                        <Select
                            label="Bathing Duration"
                            value={formData.water.bathingDuration}
                            onChange={(e) => updateNested('water', 'bathingDuration', e.target.value)}
                            options={[
                                { value: 'Bucket Bath', label: 'Bucket Bath (Best)' },
                                { value: '< 5 minutes', label: 'Quick Shower (< 5 mins)' },
                                { value: '10-15 minutes', label: 'Average Shower (10-15 mins)' },
                                { value: '> 20 minutes', label: 'Long Shower (> 20 mins)' },
                            ]}
                        />
                        <Select
                            label="Washing Frequency (Clothes/Dishes)"
                            value={formData.water.washingFrequency}
                            onChange={(e) => updateNested('water', 'washingFrequency', e.target.value)}
                            options={[
                                { value: 'Daily', label: 'Daily' },
                                { value: 'Alternate Days', label: 'Alternate Days' },
                                { value: 'Weekly', label: 'Weekly' },
                            ]}
                        />
                        <Select
                            label="Water Wastage Awareness"
                            value={formData.water.wastage}
                            onChange={(e) => updateNested('water', 'wastage', e.target.value)}
                            options={[
                                { value: 'no', label: 'I save water carefully' },
                                { value: 'yes', label: 'Sometimes waste water' },
                            ]}
                        />
                    </div>
                </Card>

                {/* Food Card */}
                <Card className="p-6 relative overflow-hidden border-l-4 border-l-green-400">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-green-100 rounded-lg text-green-600">
                            <Utensils size={24} />
                        </div>
                        <h2 className="text-xl font-bold font-serif text-gray-800">Food Habits</h2>
                    </div>

                    <div className="space-y-4">
                        <Select
                            label="Diet Type"
                            value={formData.food.diet}
                            onChange={(e) => updateNested('food', 'diet', e.target.value)}
                            options={[
                                { value: 'Vegan', label: 'Vegan' },
                                { value: 'Vegetarian', label: 'Vegetarian' },
                                { value: 'Mixed (Veg & Non-veg)', label: 'Mixed (Veg & Non-veg)' },
                                { value: 'Heavy Meat', label: 'Heavy Meat Diet' },
                            ]}
                        />
                        <Select
                            label="Food Wastage Level"
                            value={formData.food.wastage}
                            onChange={(e) => updateNested('food', 'wastage', e.target.value)}
                            options={[
                                { value: 'No wastage', label: 'No wastage' },
                                { value: 'Moderate wastage', label: 'Moderate wastage' },
                                { value: 'High wastage', label: 'High wastage' },
                            ]}
                        />
                        <div className="pt-2">
                            <Slider
                                label="Meals per Day"
                                value={formData.food.mealsPerDay}
                                min={1}
                                max={6}
                                unit=""
                                onChange={(v) => updateNested('food', 'mealsPerDay', v)}
                            />
                        </div>
                    </div>
                </Card>

                {/* Transport Card */}
                <Card className="p-6 relative overflow-hidden border-l-4 border-l-nature-600">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-nature-100 rounded-lg text-nature-700">
                            <Footprints size={24} />
                        </div>
                        <h2 className="text-xl font-bold font-serif text-gray-800">Transportation</h2>
                    </div>

                    <div className="space-y-6">
                        <Select
                            label="Primary Mode"
                            value={formData.transport.mode}
                            onChange={(e) => updateNested('transport', 'mode', e.target.value)}
                            options={[
                                { value: 'Walking/Bicycle', label: 'Walking / Bicycle' },
                                { value: 'Public Transport', label: 'Public Transport (Bus/Metro)' },
                                { value: 'Bike', label: 'Motorbike' },
                                { value: 'Car', label: 'Car (Petrol/Diesel)' },
                                { value: 'Electric Vehicle', label: 'Electric Vehicle (EV)' },
                                { value: 'Carpool', label: 'Carpool' },
                            ]}
                        />

                        <Slider
                            label="Daily Distance"
                            value={formData.transport.distance}
                            max={100}
                            unit=" km"
                            onChange={(v) => updateNested('transport', 'distance', v)}
                        />
                    </div>
                </Card>

            </div>

            <div className="flex justify-center">
                <Button
                    size="lg"
                    className="px-12 py-4 text-xl rounded-2xl shadow-xl shadow-nature-300/50 hover:scale-105 transition-transform"
                    onClick={() => onComplete(formData)}
                >
                    Analyze My Impact <ArrowRight className="ml-2" />
                </Button>
            </div>
        </div>
    );
}
