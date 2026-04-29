import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password });
    // For now, let's just navigate to the dashboard
    navigate('/generate');
  };

  return (
    <div className="bg-tertiary-container min-h-screen flex items-center justify-center p-margin-mobile md:p-margin-desktop relative overflow-hidden">
      <div 
        className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(circle at 50% 0%, #131b2e 0%, transparent 70%)' }}
      ></div>

      <div className="relative z-10 w-full max-w-[440px] bg-surface-container-lowest rounded-xl shadow-[0_12px_24px_rgba(13,28,47,0.15)] p-8 md:p-10 flex flex-col gap-stack-lg border border-outline-variant/30">
        
        <div className="flex flex-col items-center text-center gap-stack-sm">
          <div className="w-16 h-16 rounded-lg bg-surface-container flex items-center justify-center text-primary-container mb-2">
            <span className="material-symbols-outlined" style={{ fontSize: '36px', fontVariationSettings: "'FILL' 1" }}>
              admin_panel_settings
            </span>
          </div>
          <h1 className="font-h3 text-h3 text-on-surface">Digital ID Admin</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">Secure government portal access</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-stack-md">
          <div className="flex flex-col gap-stack-sm">
            <label className="font-label-caps text-label-caps text-on-surface-variant uppercase" htmlFor="email">
              Email Address
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline" style={{ fontSize: '20px' }}>
                mail
              </span>
              <input 
                className="w-full pl-10 pr-4 py-3 rounded-DEFAULT border border-outline-variant bg-surface focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary font-body-md text-body-md text-on-surface transition-all placeholder:text-outline/70" 
                id="email" 
                name="email" 
                type="email"
                placeholder="admin@gov.id" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col gap-stack-sm">
            <div className="flex justify-between items-center">
              <label className="font-label-caps text-label-caps text-on-surface-variant uppercase" htmlFor="password">
                Password
              </label>
              <a className="font-body-sm text-body-sm text-secondary hover:text-secondary-fixed-dim transition-colors font-medium" href="#">
                Forgot Password?
              </a>
            </div>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline" style={{ fontSize: '20px' }}>
                lock
              </span>
              <input 
                className="w-full pl-10 pr-12 py-3 rounded-DEFAULT border border-outline-variant bg-surface focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary font-body-md text-body-md text-on-surface transition-all placeholder:text-outline/70" 
                id="password" 
                name="password" 
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors flex items-center justify-center" 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          <button 
            className="w-full mt-2 bg-primary-container text-on-primary py-3 px-6 rounded-DEFAULT font-body-md text-body-md font-medium hover:bg-on-primary-fixed-variant active:scale-[0.98] transition-all flex items-center justify-center gap-2 group shadow-sm" 
            type="submit"
          >
            Sign In
            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform" style={{ fontSize: '18px' }}>
              arrow_forward
            </span>
          </button>
        </form>

        <div className="pt-4 border-t border-surface-variant text-center">
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Protected by Institutional Security Protocol.<br/>
            Unauthorized access is strictly prohibited.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
