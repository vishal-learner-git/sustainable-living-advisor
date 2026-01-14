import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/Button';
import { Leaf } from 'lucide-react';

export function Navigation() {
    const { user, signOut } = useAuth();
    const navigate = useNavigate();

    const handleSignOut = async () => {
        await signOut();
        navigate('/login');
    };

    return (
        <nav className="flex items-center justify-between py-6 mb-8 border-b border-nature-100">
            <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-nature-800">
                <div className="w-10 h-10 bg-nature-100 rounded-xl flex items-center justify-center text-nature-600">
                    <Leaf size={24} />
                </div>
                EcoAdvisor
            </Link>

            <div className="flex items-center gap-4">
                {user ? (
                    <div className="flex items-center gap-4">
                        <Link to="/history">
                            <Button variant="ghost" size="sm">History</Button>
                        </Link>
                        <span className="text-sm text-gray-600 hidden md:block">{user.email}</span>
                        <Button variant="outline" size="sm" onClick={handleSignOut}>
                            Log out
                        </Button>
                    </div>
                ) : (
                    <div className="flex items-center gap-3">
                        <Link to="/login">
                            <Button variant="ghost" size="sm">Log in</Button>
                        </Link>
                        <Link to="/signup">
                            <Button size="sm">Sign up</Button>
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
}
