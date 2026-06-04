'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Zap, Lock, User, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError('Username dan password wajib diisi.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Force fully reload or push to dashboard
        router.refresh();
        router.push('/admin');
      } else {
        setError(data.error || 'Login gagal.');
      }
    } catch (err) {
      setError('Terjadi kesalahan koneksi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#0b0f19] overflow-hidden font-sans">
      {/* Background gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-strum-orange/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none" />
      
      {/* Subtle grid backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      {/* Glass Container */}
      <div className="relative w-full max-w-md mx-4 p-8 bg-strum-dark-sec/40 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl flex flex-col gap-8">
        {/* Logo and title */}
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="w-12 h-12 rounded-2xl bg-strum-orange flex items-center justify-center text-white shadow-lg shadow-strum-orange/30">
            <Zap className="w-7 h-7 fill-white" />
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-extrabold tracking-tight text-white">CMS ADMINISTRATOR</h1>
            <p className="text-xs text-strum-text-muted">Strum Technology Asia Management Panel</p>
          </div>
        </div>

        {/* Error alert */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-xs font-medium flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Username */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="username" className="text-xs font-bold text-strum-text-sec uppercase tracking-wider">Username</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-strum-text-muted" />
              <Input
                id="username"
                type="text"
                placeholder="Masukkan username admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="pl-10 bg-black/35 border-white/5 text-white placeholder:text-strum-text-muted focus:border-strum-orange/50 focus:ring-strum-orange/20"
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="password" className="text-xs font-bold text-strum-text-sec uppercase tracking-wider">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-strum-text-muted" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 bg-black/35 border-white/5 text-white placeholder:text-strum-text-muted focus:border-strum-orange/50 focus:ring-strum-orange/20"
              />
            </div>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-strum-orange hover:bg-strum-orange-dark text-white font-bold py-6 rounded-xl transition-all shadow-lg shadow-strum-orange/20 mt-2 cursor-pointer"
          >
            {loading ? 'Menghubungkan...' : 'Masuk Panel Admin'}
          </Button>
        </form>

        {/* Footnote */}
        <div className="text-center text-[10px] text-strum-text-muted border-t border-white/5 pt-4">
          Hanya pengguna terdaftar yang diizinkan mengakses panel ini.
        </div>
      </div>
    </div>
  );
}
