import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { CheckCircle, AlertTriangle, Info, RefreshCw } from 'lucide-react';

export function Results({ data, result, onReset }) {
    const getScoreColor = (score) => {
        if (score >= 80) return "text-green-600 bg-green-100";
        if (score >= 50) return "text-yellow-600 bg-yellow-100";
        return "text-red-600 bg-red-100";
    };

    const getLevelColor = (level) => {
        if (level === 'High') return "from-green-400 to-green-600";
        if (level === 'Medium') return "from-yellow-400 to-orange-500";
        return "from-red-400 to-red-600";
    };

    return (
        <div className="w-full max-w-2xl mx-auto pb-10">
            <Card className="mb-6 text-center pt-10">
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, type: "spring" }}
                    className={`w-32 h-32 mx-auto rounded-full flex items-center justify-center bg-gradient-to-br shadow-xl mb-4 text-white font-bold text-4xl transform ${getLevelColor(result.level)}`}
                >
                    {result.score}
                </motion.div>

                <h2 className="text-3xl font-bold text-gray-800 mb-2">Sustainability Level: {result.level}</h2>

                {/* AI Manifesto */}
                {result.manifesto && (
                    <div className="mb-6 px-4 py-3 bg-gradient-to-r from-nature-50 to-white border border-nature-100 rounded-xl italic text-nature-800 font-medium">
                        "{result.manifesto}"
                    </div>
                )}

                <p className="text-gray-600 mb-6 max-w-lg mx-auto leading-relaxed">{result.impactExplanation}</p>

                <div className="grid md:grid-cols-2 gap-4 text-left mt-8">
                    <div className="bg-nature-50 p-5 rounded-2xl border border-nature-100">
                        <h3 className="font-semibold text-nature-800 flex items-center gap-2 mb-3">
                            <Info size={20} /> Key Observations
                        </h3>
                        <ul className="space-y-2">
                            {result.observations.map((obs, i) => (
                                <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-nature-400 mt-1.5 shrink-0" />
                                    {obs}
                                </li>
                            ))}
                            {result.observations.length === 0 && <li className="text-sm text-gray-400 italic">No major observations.</li>}
                        </ul>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                        <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-3">
                            <CheckCircle size={20} className="text-green-500" /> Recommendations
                        </h3>
                        <ul className="space-y-2">
                            {result.recommendations.map((rec, i) => (
                                <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" />
                                    {rec}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-8">
                    <Button onClick={onReset} variant="outline">
                        <RefreshCw size={18} /> Test Again
                    </Button>
                </div>
            </Card>

            <p className="text-center text-sm text-gray-400">
                Based on user provided inputs • AI-Powered Logic
            </p>
        </div>
    );
}
