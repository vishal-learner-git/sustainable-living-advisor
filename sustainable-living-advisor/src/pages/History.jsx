import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { Card } from '../components/ui/Card';
import { Loader2, Calendar, TrendingUp } from 'lucide-react';
import { format } from 'date-fns';

export function History() {
    const { user } = useAuth();
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchHistory() {
            if (!user) return;

            const { data, error } = await supabase
                .from('history')
                .select('*')
                .order('created_at', { ascending: false });

            if (!error && data) {
                setHistory(data);
            }
            setLoading(false);
        }

        fetchHistory();
    }, [user]);

    if (loading) {
        return (
            <div className="flex justify-center py-20">
                <Loader2 className="animate-spin text-nature-600" size={32} />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto pb-10">
            <h2 className="text-3xl font-bold text-nature-800 mb-8 flex items-center gap-3">
                <TrendingUp /> Your Journey
            </h2>

            {history.length === 0 ? (
                <Card className="text-center py-12">
                    <p className="text-gray-500 mb-4">No analysis history found.</p>
                    <p className="text-sm">Complete a new assessment to verify your progress!</p>
                </Card>
            ) : (
                <div className="grid gap-4">
                    {history.map((item) => (
                        <Card key={item.id} className="p-6 flex flex-col md:flex-row items-center justify-between hover:shadow-lg transition-shadow">
                            <div className="flex items-center gap-6">
                                <div className={`
                  w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl
                  ${item.sustainability_score >= 80 ? 'bg-green-500' : item.sustainability_score >= 50 ? 'bg-yellow-500' : 'bg-red-500'}
                `}>
                                    {item.sustainability_score}%
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-800 text-lg">{item.sustainability_level} Sustainability</h3>
                                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                                        <Calendar size={14} />
                                        {format(new Date(item.created_at), 'PPP p')}
                                    </div>
                                </div>
                            </div>

                            {/* Future: Add button to view full details */}
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
