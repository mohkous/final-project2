import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api';

function VerifyCard() {
  const { id } = useParams();
  const [cardData, setCardData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [manualId, setManualId] = useState('');
  const [focused, setFocused] = useState(false);

  const fetchCardData = async (searchId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get(`/verify-card/${searchId}`);
      if (response.data.success) {
        setCardData(response.data.card);
      } else {
        setError(response.data.message || "Failed to verify ID");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error connecting to verification server");
      setCardData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) { fetchCardData(id); }
  }, [id]);

  const handleManualSearch = (e) => {
    e.preventDefault();
    if (manualId.trim()) { fetchCardData(manualId.trim()); }
  };

  const bgBase = (
    <div className="fixed inset-0 pointer-events-none" style={{ background: '#060b18', zIndex: 0 }}>
      <div style={{
        position: 'absolute', top: '-20%', left: '-10%',
        width: '500px', height: '500px',
        background: 'radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)',
      }} />
      <div style={{
        position: 'absolute', bottom: '-15%', right: '-10%',
        width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(0,201,167,0.06) 0%, transparent 70%)',
      }} />
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.15,
        backgroundImage: 'radial-gradient(circle, #1e2d4a 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }} />
    </div>
  );

  // Manual search / landing screen
  if (!id && !cardData && !loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 relative" style={{ background: '#060b18' }}>
        {bgBase}
        <div
          className="relative z-10 max-w-md w-full rounded-2xl p-8"
          style={{
            background: 'rgba(15,22,41,0.8)',
            backdropFilter: 'blur(24px)',
            border: '1px solid rgba(255,255,255,0.07)',
            boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
          }}
        >
          <div className="flex flex-col items-center text-center mb-8">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
              style={{
                background: 'linear-gradient(135deg, rgba(0,212,255,0.12), rgba(0,201,167,0.12))',
                border: '1px solid rgba(0,212,255,0.25)',
                boxShadow: '0 0 24px rgba(0,212,255,0.15)',
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '32px', color: '#00d4ff', fontVariationSettings: "'FILL' 1" }}>
                qr_code_scanner
              </span>
            </div>
            <h2
              className="text-2xl font-black mb-2"
              style={{
                fontFamily: 'Outfit, sans-serif',
                background: 'linear-gradient(135deg, #e2e8f0, #94a3b8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Identity Verification
            </h2>
            <p className="text-sm" style={{ color: '#475569' }}>
              Scan a QR code or enter the ID number manually.
            </p>
          </div>

          <form onSubmit={handleManualSearch} className="space-y-4">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#475569' }}>
                Enter ID Number
              </label>
              <input
                type="text"
                value={manualId}
                onChange={(e) => setManualId(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="e.g. GID-1234-5678"
                style={{
                  background: '#0a0e1a',
                  border: `1px solid ${focused ? 'rgba(0,212,255,0.5)' : '#1e2d4a'}`,
                  boxShadow: focused ? '0 0 0 3px rgba(0,212,255,0.08)' : 'none',
                  color: '#e2e8f0',
                  fontFamily: 'JetBrains Mono, monospace',
                  borderRadius: '12px',
                  padding: '12px 16px',
                  width: '100%',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'all 0.2s',
                }}
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-200"
              style={{
                background: 'linear-gradient(135deg, #00d4ff, #00c9a7)',
                color: '#060b18',
                fontFamily: 'Outfit, sans-serif',
                boxShadow: '0 0 20px rgba(0,212,255,0.3)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = '0 0 32px rgba(0,212,255,0.55)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = '0 0 20px rgba(0,212,255,0.3)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '18px', fontVariationSettings: "'FILL' 1" }}>
                verified_user
              </span>
              Verify Identity
            </button>
          </form>

          <div className="mt-8 pt-6 text-center" style={{ borderTop: '1px solid #1e2d4a' }}>
            <Link
              to="/dashboard"
              className="text-sm flex items-center justify-center gap-2 transition-colors"
              style={{ color: '#475569' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#00d4ff')}
              onMouseLeave={e => (e.currentTarget.style.color = '#475569')}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_back</span>
              Return to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#060b18' }}>
        {bgBase}
        <div className="relative z-10 flex flex-col items-center gap-4">
          <div
            className="w-16 h-16 rounded-full border-2 animate-spin"
            style={{ borderColor: '#00d4ff', borderTopColor: 'transparent', boxShadow: '0 0 20px rgba(0,212,255,0.3)' }}
          />
          <p className="text-sm font-medium" style={{ color: '#475569', fontFamily: 'Inter, sans-serif' }}>
            Verifying identity...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !cardData) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6" style={{ background: '#060b18' }}>
        {bgBase}
        <div
          className="relative z-10 max-w-md w-full rounded-2xl p-8 text-center"
          style={{
            background: 'rgba(15,22,41,0.8)',
            backdropFilter: 'blur(24px)',
            border: '1px solid rgba(239,68,68,0.2)',
            boxShadow: '0 24px 64px rgba(0,0,0,0.5), 0 0 20px rgba(239,68,68,0.08)',
          }}
        >
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
            style={{
              background: 'rgba(239,68,68,0.1)',
              border: '1px solid rgba(239,68,68,0.3)',
              boxShadow: '0 0 20px rgba(239,68,68,0.15)',
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '32px', color: '#ef4444', fontVariationSettings: "'FILL' 1" }}>
              gpp_bad
            </span>
          </div>
          <h2 className="text-2xl font-black mb-2" style={{ fontFamily: 'Outfit, sans-serif', color: '#ef4444' }}>
            Verification Failed
          </h2>
          <p className="text-sm mb-6" style={{ color: '#475569', fontFamily: 'Inter, sans-serif' }}>
            {error || "This digital ID could not be verified in our records."}
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200"
            style={{
              background: 'rgba(239,68,68,0.1)',
              color: '#ef4444',
              border: '1px solid rgba(239,68,68,0.3)',
              fontFamily: 'Outfit, sans-serif',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(239,68,68,0.15)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(239,68,68,0.1)';
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_back</span>
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  // Success state
  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative" style={{ background: '#060b18' }}>
      {bgBase}
      <div className="relative z-10 max-w-md w-full">
        {/* Success Header */}
        <div className="text-center mb-6">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{
              background: 'rgba(0,201,167,0.1)',
              border: '1px solid rgba(0,201,167,0.3)',
              boxShadow: '0 0 24px rgba(0,201,167,0.2)',
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '32px', color: '#00c9a7', fontVariationSettings: "'FILL' 1" }}>
              verified
            </span>
          </div>
          <h2 className="text-2xl font-black mb-1" style={{ fontFamily: 'Outfit, sans-serif', color: '#00c9a7' }}>
            Identity Verified
          </h2>
          <p className="text-sm" style={{ color: '#475569' }}>
            This digital ID is authentic and currently active.
          </p>
        </div>

        {/* ID Card */}
        <div
          className="rounded-3xl p-6 flex flex-col gap-5 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #0d1c35 0%, #071020 50%, #0a1428 100%)',
            border: '1px solid rgba(0,212,255,0.2)',
            boxShadow: '0 0 40px rgba(0,212,255,0.1), 0 20px 60px rgba(0,0,0,0.5)',
          }}
        >
          <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 70%)' }}
          />

          <div className="flex justify-between items-start z-10">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'rgba(0,212,255,0.6)' }}>
                Official Digital ID
              </p>
              <p className="text-sm font-bold mt-0.5" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'JetBrains Mono, monospace' }}>
                GOV-2024
              </p>
            </div>
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.2)' }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#00d4ff', fontVariationSettings: "'FILL' 1" }}>
                verified_user
              </span>
            </div>
          </div>

          <div className="flex gap-4 items-center z-10">
            <div
              className="w-24 h-32 rounded-xl overflow-hidden flex-shrink-0"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '2px solid rgba(0,212,255,0.2)',
              }}
            >
              <img src={cardData.image} alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col gap-3">
              <div>
                <p className="text-xs uppercase tracking-widest" style={{ color: 'rgba(0,212,255,0.5)' }}>Name</p>
                <p className="text-lg font-bold" style={{ color: '#e2e8f0', fontFamily: 'Outfit, sans-serif' }}>
                  {cardData.firstName} {cardData.lastName}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest" style={{ color: 'rgba(0,212,255,0.5)' }}>Department</p>
                <p className="text-sm" style={{ color: '#94a3b8' }}>{cardData.department}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 p-4 rounded-xl z-10" style={{ background: 'rgba(0,212,255,0.05)', border: '1px solid rgba(0,212,255,0.1)' }}>
            <div>
              <p className="text-xs uppercase tracking-widest" style={{ color: 'rgba(0,212,255,0.5)' }}>ID Number</p>
              <p className="text-sm font-medium truncate" style={{ color: '#94a3b8', fontFamily: 'JetBrains Mono, monospace' }}>
                {cardData.idNumber}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest" style={{ color: 'rgba(0,212,255,0.5)' }}>Valid Until</p>
              <p className="text-sm font-medium" style={{ color: '#94a3b8', fontFamily: 'JetBrains Mono, monospace' }}>
                {new Date(cardData.validUntil).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="flex justify-between items-end z-10">
            <div className="p-2 rounded-xl" style={{ background: '#fff', boxShadow: '0 0 16px rgba(0,212,255,0.2)' }}>
              {cardData.qrCode ? (
                <img src={cardData.qrCode} alt="QR Code" className="w-16 h-16 block object-contain" style={{ imageRendering: 'pixelated' }} />
              ) : (
                <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center">
                  <span className="material-symbols-outlined" style={{ fontSize: '24px', color: '#ccc' }}>qr_code_2</span>
                </div>
              )}
            </div>
            <div className="text-right">
              <p className="text-xs uppercase tracking-widest" style={{ color: 'rgba(0,212,255,0.4)' }}>Status</p>
              <div className="flex items-center gap-1.5 justify-end mt-1">
                <span className="w-2 h-2 rounded-full" style={{ background: '#00c9a7', boxShadow: '0 0 8px #00c9a7' }} />
                <p className="text-sm font-bold" style={{ color: '#00c9a7' }}>{cardData.status || 'Active'}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link
            to="/dashboard"
            className="text-sm flex items-center justify-center gap-2 transition-colors"
            style={{ color: '#475569' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#00d4ff')}
            onMouseLeave={e => (e.currentTarget.style.color = '#475569')}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_back</span>
            Return to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

export default VerifyCard;
