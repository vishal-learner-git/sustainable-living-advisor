import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { AlertTriangle } from 'lucide-react';

export function Login() {
    const { signIn } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!signIn) {
            setError("Supabase client not initialized. Cannot login.");
            return;
        }

        try {
            setError('');
            setLoading(true);
            const { error } = await signIn({ email, password });
            if (error) throw error;
            navigate('/');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[80vh]">
            <Card className="w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-nature-800 mb-6">Welcome Back</h2>

                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-xl flex items-center gap-2 mb-4 text-sm">
                        <AlertTriangle size={16} /> {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        label="Email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Input
                        label="Password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Button type="submit" className="w-full mt-2" disabled={loading}>
                        {loading ? 'Logging in...' : 'Log In'}
                    </Button>
                </form>

                <p className="text-center text-gray-500 mt-6 text-sm">
                    Don't have an account? <Link to="/signup" className="text-nature-600 font-semibold hover:underline">Sign up</Link>
                </p>
            </Card>
        </div>
    );
}
