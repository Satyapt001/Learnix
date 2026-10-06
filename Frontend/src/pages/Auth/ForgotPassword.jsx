import { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const { forgotPassword } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await forgotPassword(email);
            setSubmitted(true);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8 bg-white dark:bg-dark-surface p-8 sm:p-10 rounded-[20px] shadow-lg shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-800 transition-all duration-300">

                {/* Header */}
                <div className="text-center">
                    <div className="mx-auto h-12 w-12 bg-brand/10 dark:bg-brand/20 rounded-xl flex items-center justify-center text-brand text-2xl mb-4">
                        🔐
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                        Forgot Password?
                    </h2>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        No worries, we'll send you reset instructions.
                    </p>
                </div>

                {submitted ? (
                    <div className="text-center space-y-6">
                        <div className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 p-4 rounded-xl text-sm font-medium">
                            If an account exists for <strong>{email}</strong>, you will receive an email with instructions to reset your password.
                        </div>
                        <Link
                            to="/login"
                            className="block w-full py-3.5 px-4 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        >
                            Back to Login
                        </Link>
                    </div>
                ) : (
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 ml-1">
                                Email address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="appearance-none block w-full px-4 py-3.5 rounded-xl bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-gray-700 placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all sm:text-sm"
                                placeholder="you@example.com"
                            />
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-bold rounded-full text-white bg-gradient-to-r from-brand to-brand-dark hover:from-brand-dark hover:to-brand focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand shadow-lg shadow-brand/30 hover:shadow-brand/40 hover:-translate-y-0.5 transition-all duration-200"
                            >
                                Send Reset Link
                            </button>
                        </div>
                    </form>
                )}

                <div className="text-center">
                    <Link to="/login" className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:hover:text-gray-300 transition-colors flex items-center justify-center gap-2">
                        <span>←</span> Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
}
