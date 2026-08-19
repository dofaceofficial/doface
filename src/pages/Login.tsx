import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      navigate('/dashboard'); // Will create dashboard later
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fff0f5] px-4">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md border border-pink-100">
        <div className="flex justify-center mb-6">
          <img src="/Isi/doface.svg" alt="Doface" className="h-8" />
        </div>
        <h2 className="text-2xl font-extrabold text-[#2d0f1e] text-center mb-6">Login ke Portal</h2>
        
        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-xl mb-4 text-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-[#7a3f58] mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-pink-100 bg-pink-50/30 focus:outline-none focus:ring-2 focus:ring-[#fd86a5]/50 transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-[#7a3f58] mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-pink-100 bg-pink-50/30 focus:outline-none focus:ring-2 focus:ring-[#fd86a5]/50 transition-all"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl text-white font-extrabold text-sm hover:scale-[1.02] transition-transform shadow-lg disabled:opacity-70"
            style={{ background: 'linear-gradient(135deg, #fd86a5, #f8578c)' }}
          >
            {loading ? 'Processing...' : 'Masuk'}
          </button>
        </form>

        <p className="text-center text-sm font-medium text-[#7a3f58] mt-6">
          Belum punya akun?{' '}
          <Link to="/register" className="text-[#fd86a5] font-bold hover:underline">
            Daftar Sekarang
          </Link>
        </p>
      </div>
    </div>
  );
}
