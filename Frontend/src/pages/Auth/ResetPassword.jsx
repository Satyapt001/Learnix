import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

export default function ResetPassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const { token } = useParams();
    const { resetPassword } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            await resetPassword(token, password);
            setSuccess(true);
            setTimeout(() => navigate('/login'), 3000);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to reset password');
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8 bg-white dark:bg-dark-surface p-8 sm:p-10 rounded-[20px] shadow-lg shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-800 transition-all duration-300">

                <div className="text-center">
                    <div className="mx-auto h-12 w-12 bg-brand/10 dark:bg-brand/20 rounded-xl flex items-center justify-center text-brand text-2xl mb-4">
                        🔑
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                        Reset Password
                    </h2>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        Enter your new password below.
                    </p>
                </div>

                {success ? (
                    <div className="text-center space-y-6">
                        <div className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 p-4 rounded-xl text-sm font-medium">
                            Password reset successfully! Redirecting to login...
                        </div>
                    </div>
                ) : (
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        {error && (
                            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm p-3 rounded-xl text-center font-medium animate-pulse">
                                {error}
                            </div>
                        )}

                        <div className="space-y-5">
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 ml-1">
                                    New Password
                                </label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="appearance-none block w-full px-4 py-3.5 rounded-xl bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-gray-700 placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all sm:text-sm pr-10"
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                                    >
                                        {showPassword ? '👁️' : '👁️‍🗨️'}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 ml-1">
                                    Confirm Password
                                </label>
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="appearance-none block w-full px-4 py-3.5 rounded-xl bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-gray-700 placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all sm:text-sm"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-bold rounded-full text-white bg-gradient-to-r from-brand to-brand-dark hover:from-brand-dark hover:to-brand focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand shadow-lg shadow-brand/30 hover:shadow-brand/40 hover:-translate-y-0.5 transition-all duration-200"
                            >
                                Reset Password
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
