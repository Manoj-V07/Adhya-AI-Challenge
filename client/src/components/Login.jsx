import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        navigate('/dashboard');
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch {
      setError('Network error');
    }
    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-green-100 to-green-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white/90 p-8 rounded-2xl shadow-2xl w-full max-w-md animate-fade-in"
      >
        <h2 className="text-3xl font-extrabold text-center mb-6 text-green-700">
          SECE Login
        </h2>

        {error && <div className="mb-4 text-red-600 text-center">{error}</div>}

        <div className="mb-5">
          <input
            type="email"
            placeholder="SECE Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded border-2 border-gray-300 focus:border-blue-400 outline-none focus:shadow-lg transition-all"
          />
        </div>

        <div className="mb-6">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded border-2 border-gray-300 focus:border-blue-400 outline-none focus:shadow-lg transition-all"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 rounded-lg font-bold text-lg bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg hover:from-green-600 hover:to-blue-600 hover:scale-105 transition-all"
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>

        <div className="mt-4 text-center text-gray-600">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-green-700 font-semibold hover:underline">
            Sign Up
          </Link>
        </div>
      </form>

      <style>{`
        .animate-fade-in { animation: fadeIn 0.7s; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(30px);} to { opacity: 1; transform: none; } }
      `}</style>
    </div>
  );
};

export default Login;
