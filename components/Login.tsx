import React, { useState } from 'react';
import { Lock, User, ArrowRight, Shield } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      onLogin();
    } else {
      setError('Invalid credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 font-sans text-black">
      <div className="w-full max-w-md bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 border-2 border-black rounded-full mb-4">
            <Shield className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-black tracking-tighter uppercase mb-1">Synapse</h1>
          <p className="text-sm font-medium text-gray-600 uppercase tracking-widest">Secure Gateway</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2">User ID</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border-2 border-black focus:outline-none focus:ring-0 focus:bg-gray-50 transition-colors placeholder-gray-400 font-medium"
                placeholder="admin"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border-2 border-black focus:outline-none focus:ring-0 focus:bg-gray-50 transition-colors placeholder-gray-400 font-medium"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && (
            <div className="text-white text-sm bg-black p-3 font-medium flex items-center justify-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full flex justify-center items-center py-4 px-4 border-2 border-black bg-black text-white font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-all active:translate-y-1 active:shadow-none shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]"
          >
            Authenticate
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </form>
        
        <div className="mt-8 pt-6 border-t-2 border-gray-100 text-center text-xs text-gray-500 font-mono">
          <p>SYSTEM ACCESS: AUTHORIZED PERSONNEL ONLY</p>
          <p className="mt-1 opacity-50">Vasus Brakes India Pvt Ltd</p>
        </div>
      </div>
    </div>
  );
};

export default Login;