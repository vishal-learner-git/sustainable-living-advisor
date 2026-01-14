import React, { useState } from 'react';
import { Wizard } from './Wizard';
import { AssessmentGrid } from './AssessmentGrid';
import { Results } from './Results';
import { analyzeSustainability } from '../utils/analyzer';

import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { generateSustainabilityInsight } from '../lib/groq';

export function Dashboard() {
    const { user } = useAuth();
    const [view, setView] = useState('grid'); // grid | loading | results
    const [result, setResult] = useState(null);
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);

    const handleComplete = async (data) => {
        setView('loading');
        setUserData(data);
        setError(null);

        try {
            // Try AI Analysis first
            const analysis = await generateSustainabilityInsight(data);
            setResult(analysis);
            await saveToHistory(data, analysis);
            setView('results');
        } catch (err) {
            console.warn("AI Analysis failed, falling back to local logic:", err);
            // Fallback to local logic
            const analysis = analyzeSustainability(data);
            setResult(analysis);
            await saveToHistory(data, analysis);
            setView('results');
        }
    };

    const saveToHistory = async (data, analysis) => {
        if (user && supabase) {
            try {
                await supabase.from('history').insert({
                    user_id: user.id,
                    sustainability_score: analysis.score,
                    sustainability_level: analysis.level,
                    user_data: data,
                    results_data: analysis
                });
            } catch (err) {
                console.error("Failed to save history:", err);
            }
        }
    };

    const handleReset = () => {
        setView('grid');
        setResult(null);
        setUserData(null);
    };

    return (
        <div className='py-8'>
            {view === 'grid' && <AssessmentGrid onComplete={handleComplete} />}

            {view === 'loading' && (
                <div className="text-center py-20">
                    <div className="w-16 h-16 border-4 border-nature-200 border-t-nature-600 rounded-full animate-spin mx-auto mb-6" />
                    <h3 className="text-xl font-medium text-gray-700 animate-pulse">Analyzing your lifestyle...</h3>
                </div>
            )}

            {view === 'results' && result && (
                <Results data={userData} result={result} onReset={handleReset} />
            )}
        </div>
    );
}
