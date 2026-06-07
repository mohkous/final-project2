import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [focusEmail, setFocusEmail] = useState(false);
  const [focusPass, setFocusPass] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password });
    navigate('/generate');
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden"
      style={{ background: '#060b18' }}
    >
      {/* Animated background blobs */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '-15%',
          left: '-10%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(0,212,255,0.07) 0%, transparent 70%)',
          animation: 'floatUp 8s ease-in-out infinite',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '-15%',
          right: '-10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(0,201,167,0.07) 0%, transparent 70%)',
          animation: 'floatUp 10s ease-in-out infinite reverse',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          top: '40%',
          left: '60%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(129,140,248,0.05) 0%, transparent 70%)',
        }}
      />

      {/* Dot grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle, #1e2d4a 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Login Card */}
      <div
        className="relative z-10 w-full max-w-[420px] rounded-2xl flex flex-col gap-8 p-8 md:p-10"
        style={{
          background: 'rgba(15, 22, 41, 0.75)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,255,255,0.07)',
          boxShadow: '0 24px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,212,255,0.08)',
          animation: 'fadeSlideUp 0.6s ease forwards',
        }}
      >
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-4">
          {/* Shield icon with glow */}
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center relative"
            style={{
              background: 'linear-gradient(135deg, rgba(0,212,255,0.15), rgba(0,201,167,0.15))',
              border: '1px solid rgba(0,212,255,0.25)',
              boxShadow: '0 0 30px rgba(0,212,255,0.2)',
              animation: 'pulseGlow 3s ease-in-out infinite',
            }}
          >
            <span
              className="material-symbols-outlined"
              style={{
                fontSize: '32px',
                color: '#00d4ff',
                fontVariationSettings: "'FILL' 1",
              }}
            >
              admin_panel_settings
            </span>
          </div>

          <div>
            <h1
              className="text-2xl font-black mb-1"
              style={{
                fontFamily: 'Outfit, sans-serif',
                background: 'linear-gradient(135deg, #e2e8f0, #94a3b8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Digital ID Admin
            </h1>
            <p className="text-sm" style={{ color: '#475569', fontFamily: 'Inter, sans-serif' }}>
              Secure government portal access
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Email */}
          <div className="flex flex-col gap-2">
            <label
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: '#475569', fontFamily: 'Inter, sans-serif' }}
              htmlFor="email"
            >
              Email Address
            </label>
            <div className="relative">
              <span
                className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-200"
                style={{
                  fontSize: '18px',
                  color: focusEmail ? '#00d4ff' : '#2a3d60',
                }}
              >
                mail
              </span>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="admin@gov.id"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocusEmail(true)}
                onBlur={() => setFocusEmail(false)}
                className="w-full pl-10 pr-4 py-3 rounded-xl text-sm transition-all duration-200"
                style={{
                  background: 'rgba(10,14,26,0.8)',
                  border: `1px solid ${focusEmail ? 'rgba(0,212,255,0.5)' : '#1e2d4a'}`,
                  boxShadow: focusEmail ? '0 0 0 3px rgba(0,212,255,0.1)' : 'none',
                  color: '#e2e8f0',
                  fontFamily: 'Inter, sans-serif',
                }}
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: '#475569', fontFamily: 'Inter, sans-serif' }}
                htmlFor="password"
              >
                Password
              </label>
              <a
                href="#"
                className="text-xs font-medium transition-colors duration-200"
                style={{ color: '#00d4ff' }}
                onMouseEnter={e => (e.target.style.color = '#00c9a7')}
                onMouseLeave={e => (e.target.style.color = '#00d4ff')}
              >
                Forgot Password?
              </a>
            </div>
            <div className="relative">
              <span
                className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-200"
                style={{
                  fontSize: '18px',
                  color: focusPass ? '#00d4ff' : '#2a3d60',
                }}
              >
                lock
              </span>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocusPass(true)}
                onBlur={() => setFocusPass(false)}
                className="w-full pl-10 pr-12 py-3 rounded-xl text-sm transition-all duration-200"
                style={{
                  background: 'rgba(10,14,26,0.8)',
                  border: `1px solid ${focusPass ? 'rgba(0,212,255,0.5)' : '#1e2d4a'}`,
                  boxShadow: focusPass ? '0 0 0 3px rgba(0,212,255,0.1)' : 'none',
                  color: '#e2e8f0',
                  fontFamily: 'Inter, sans-serif',
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors duration-200"
                style={{ color: '#2a3d60' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#00d4ff')}
                onMouseLeave={e => (e.currentTarget.style.color = '#2a3d60')}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full mt-1 py-3.5 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 group transition-all duration-200"
            style={{
              background: 'linear-gradient(135deg, #00d4ff, #00c9a7)',
              color: '#060b18',
              fontFamily: 'Outfit, sans-serif',
              fontSize: '15px',
              boxShadow: '0 0 24px rgba(0,212,255,0.3)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = '0 0 40px rgba(0,212,255,0.55)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = '0 0 24px rgba(0,212,255,0.3)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '18px', fontVariationSettings: "'FILL' 1" }}>
              login
            </span>
            Sign In to Portal
            <span
              className="material-symbols-outlined transition-transform duration-200 group-hover:translate-x-1"
              style={{ fontSize: '16px' }}
            >
              arrow_forward
            </span>
          </button>
        </form>

        {/* Footer */}
        <div
          className="pt-5 text-center"
          style={{ borderTop: '1px solid #1e2d4a' }}
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="material-symbols-outlined" style={{ fontSize: '14px', color: '#00c9a7' }}>
              security
            </span>
            <p className="text-xs" style={{ color: '#475569', fontFamily: 'Inter, sans-serif' }}>
              Protected by Institutional Security Protocol
            </p>
          </div>
          <p className="text-xs" style={{ color: '#2a3d60', fontFamily: 'Inter, sans-serif' }}>
            Unauthorized access is strictly prohibited
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
