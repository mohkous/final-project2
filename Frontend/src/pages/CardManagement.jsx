import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import api from '../api';

function CardManagement() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await api.get('/users');
        const allCards = response.data.flatMap(user =>
          (user.Cards || []).map(card => ({
            ...card,
            userName: `${user.firstName} ${user.lastName}`,
            department: user.department,
            profileImage: user.image
          }))
        );
        setCards(allCards);
      } catch (error) {
        console.error("Error fetching cards:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCards();
  }, []);

  const filteredCards = cards.filter(card =>
    card.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.idNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDownload = () => {
    if (!selectedCard?.qrCode) return;
    const link = document.createElement('a');
    link.href = selectedCard.qrCode;
    link.download = `QR_${selectedCard.idNumber}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyLink = () => {
    if (!selectedCard?.idNumber) return;
    const url = `${window.location.origin}/verify/${selectedCard.idNumber}`;
    navigator.clipboard.writeText(url);
    alert("Verification link copied to clipboard!");
  };

  const handleCopyImage = async () => {
    if (!selectedCard?.qrCode) return;
    try {
      const response = await fetch(selectedCard.qrCode);
      const blob = await response.blob();
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
      alert("QR Image copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy image:", err);
      alert("Failed to copy image. Your browser might not support this feature.");
    }
  };

  const thStyle = {
    padding: '14px 20px',
    fontSize: '10px',
    fontWeight: '700',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: '#475569',
    fontFamily: 'Inter, sans-serif',
    whiteSpace: 'nowrap',
  };

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#0a0e1a', fontFamily: 'Inter, sans-serif' }}>
      <Sidebar />

      <div className="flex-1 md:ml-[268px] flex flex-col h-screen">
        {/* Header */}
        <header
          className="fixed top-0 right-0 md:left-[268px] left-0 z-30 h-16 flex items-center justify-between px-8"
          style={{
            background: 'rgba(10,14,26,0.85)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderBottom: '1px solid #1e2d4a',
          }}
        >
          <span
            className="text-lg font-black uppercase tracking-widest"
            style={{
              fontFamily: 'Outfit, sans-serif',
              background: 'linear-gradient(135deg, #00d4ff, #00c9a7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Digital ID Admin
          </span>
        </header>

        <main className="flex-1 mt-16 p-6 md:p-8 overflow-y-auto" style={{ background: '#0a0e1a' }}>
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <h2
                className="text-3xl font-black mb-1"
                style={{
                  fontFamily: 'Outfit, sans-serif',
                  background: 'linear-gradient(135deg, #e2e8f0, #94a3b8)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Card Management
              </h2>
              <p className="text-sm" style={{ color: '#475569' }}>
                View status and generate QR codes for all issued digital IDs.
              </p>
            </div>
            <div className="relative w-full md:w-80">
              <span
                className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ fontSize: '18px', color: '#2a3d60' }}
              >
                search
              </span>
              <input
                type="text"
                placeholder="Search by name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm transition-all duration-200"
                style={{
                  background: '#0f1629',
                  border: '1px solid #1e2d4a',
                  color: '#e2e8f0',
                  fontFamily: 'Inter, sans-serif',
                }}
                onFocus={e => {
                  e.target.style.borderColor = 'rgba(0,212,255,0.4)';
                  e.target.style.boxShadow = '0 0 0 3px rgba(0,212,255,0.08)';
                }}
                onBlur={e => {
                  e.target.style.borderColor = '#1e2d4a';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* List Section */}
            <div
              className="rounded-2xl overflow-hidden"
              style={{ background: '#0f1629', border: '1px solid #1e2d4a', boxShadow: '0 4px 24px rgba(0,0,0,0.3)' }}
            >
              <table className="w-full text-left border-collapse">
                <thead style={{ background: '#0a0e1a', borderBottom: '1px solid #1e2d4a' }}>
                  <tr>
                    <th style={thStyle}>Card ID</th>
                    <th style={thStyle}>Holder</th>
                    <th style={thStyle}>Status</th>
                    <th style={{ ...thStyle, textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="4" style={{ padding: '48px', textAlign: 'center' }}>
                        <div className="flex flex-col items-center gap-3">
                          <div
                            className="w-8 h-8 rounded-full border-2 animate-spin"
                            style={{ borderColor: '#00d4ff', borderTopColor: 'transparent' }}
                          />
                          <p className="text-sm" style={{ color: '#475569' }}>Loading cards...</p>
                        </div>
                      </td>
                    </tr>
                  ) : filteredCards.length === 0 ? (
                    <tr>
                      <td colSpan="4" style={{ padding: '48px', textAlign: 'center' }}>
                        <div className="flex flex-col items-center gap-2">
                          <span className="material-symbols-outlined" style={{ fontSize: '40px', color: '#1e2d4a' }}>
                            credit_card_off
                          </span>
                          <p className="text-sm" style={{ color: '#475569' }}>No cards found.</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredCards.map((card) => (
                      <tr
                        key={card.id}
                        className="group cursor-pointer"
                        style={{
                          borderBottom: '1px solid #1e2d4a',
                          transition: 'background 0.15s',
                          background: selectedCard?.id === card.id ? '#141c33' : 'transparent',
                        }}
                        onMouseEnter={e => {
                          if (selectedCard?.id !== card.id)
                            e.currentTarget.style.background = '#111827';
                        }}
                        onMouseLeave={e => {
                          if (selectedCard?.id !== card.id)
                            e.currentTarget.style.background = 'transparent';
                        }}
                      >
                        <td style={{ padding: '14px 20px' }}>
                          <span
                            className="text-xs font-medium"
                            style={{ color: '#00d4ff', fontFamily: 'JetBrains Mono, monospace' }}
                          >
                            {card.idNumber}
                          </span>
                        </td>
                        <td style={{ padding: '14px 20px' }}>
                          <p className="text-sm font-semibold" style={{ color: '#e2e8f0' }}>{card.userName}</p>
                          <p className="text-xs mt-0.5" style={{ color: '#475569' }}>{card.department}</p>
                        </td>
                        <td style={{ padding: '14px 20px' }}>
                          <StatusBadge status={card.status} />
                        </td>
                        <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                          <button
                            onClick={() => setSelectedCard(card)}
                            className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200"
                            style={{
                              background: selectedCard?.id === card.id
                                ? 'linear-gradient(135deg, #00d4ff, #00c9a7)'
                                : 'rgba(0,212,255,0.08)',
                              color: selectedCard?.id === card.id ? '#060b18' : '#00d4ff',
                              border: '1px solid rgba(0,212,255,0.2)',
                              fontFamily: 'Inter, sans-serif',
                            }}
                          >
                            <span className="flex items-center gap-1">
                              <span className="material-symbols-outlined" style={{ fontSize: '14px', fontVariationSettings: "'FILL' 1" }}>
                                qr_code
                              </span>
                              View QR
                            </span>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* QR Preview Section */}
            <div
              className="rounded-2xl p-8 flex flex-col items-center justify-center"
              style={{
                background: '#0f1629',
                border: '1px solid #1e2d4a',
                boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
                minHeight: '400px',
              }}
            >
              {selectedCard ? (
                <div className="w-full space-y-6">
                  {/* Profile */}
                  <div className="flex flex-col items-center gap-3 text-center">
                    <div
                      className="w-20 h-20 rounded-2xl overflow-hidden flex items-center justify-center"
                      style={{
                        background: 'linear-gradient(135deg, rgba(0,212,255,0.15), rgba(0,201,167,0.15))',
                        border: '2px solid rgba(0,212,255,0.25)',
                        boxShadow: '0 0 20px rgba(0,212,255,0.15)',
                      }}
                    >
                      {selectedCard.profileImage ? (
                        <img src={selectedCard.profileImage} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <span className="material-symbols-outlined" style={{ fontSize: '32px', color: '#00d4ff' }}>person</span>
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold" style={{ fontFamily: 'Outfit, sans-serif', color: '#e2e8f0' }}>
                        {selectedCard.userName}
                      </h3>
                      <p className="text-sm" style={{ color: '#475569' }}>{selectedCard.department}</p>
                    </div>
                  </div>

                  {/* QR Code */}
                  <div className="flex flex-col items-center gap-3">
                    <div
                      className="p-4 rounded-2xl"
                      style={{
                        background: '#fff',
                        boxShadow: '0 0 30px rgba(0,212,255,0.2)',
                      }}
                    >
                      {selectedCard.qrCode ? (
                        <img src={selectedCard.qrCode} alt="QR Code" className="w-44 h-44" />
                      ) : (
                        <div className="w-44 h-44 flex items-center justify-center" style={{ color: '#94a3b8' }}>
                          No QR Saved
                        </div>
                      )}
                    </div>
                    <div className="text-center">
                      <p
                        className="text-sm font-bold"
                        style={{ color: '#00d4ff', fontFamily: 'JetBrains Mono, monospace' }}
                      >
                        {selectedCard.idNumber}
                      </p>
                      <p className="text-xs mt-1" style={{ color: '#475569' }}>
                        Valid until:{' '}
                        {selectedCard.validUntil ? new Date(selectedCard.validUntil).toLocaleDateString() : 'N/A'}
                      </p>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-col gap-3">
                    <GlowBtn
                      onClick={handleDownload}
                      disabled={!selectedCard.qrCode}
                      icon="download"
                      label="Download QR Code"
                      gradient="linear-gradient(135deg, #00d4ff, #00c9a7)"
                      glow="rgba(0,212,255,0.3)"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <OutlineBtn onClick={handleCopyLink} icon="link" label="Copy Link" />
                      <OutlineBtn onClick={handleCopyImage} icon="content_copy" label="Copy Image" />
                    </div>
                    <OutlineBtn
                      onClick={() => alert(`ID ${selectedCard.idNumber} is officially saved and ready for QR verification.`)}
                      icon="verified"
                      label="Save to Verification System"
                      color="#00c9a7"
                      borderColor="rgba(0,201,167,0.3)"
                    />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-4 text-center">
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center"
                    style={{
                      background: 'rgba(0,212,255,0.05)',
                      border: '1px solid #1e2d4a',
                    }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '40px', color: '#1e2d4a' }}>
                      qr_code_2
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold" style={{ color: '#2a3d60', fontFamily: 'Outfit, sans-serif' }}>
                      Select a card
                    </p>
                    <p className="text-sm mt-1" style={{ color: '#1e2d4a' }}>
                      Click "View QR" to preview the secure QR code
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const cfg = status === 'Active'
    ? { color: '#00c9a7', bg: 'rgba(0,201,167,0.12)', border: 'rgba(0,201,167,0.25)' }
    : { color: '#ef4444', bg: 'rgba(239,68,68,0.12)', border: 'rgba(239,68,68,0.25)' };
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
      style={{ background: cfg.bg, border: `1px solid ${cfg.border}`, color: cfg.color, fontFamily: 'Inter, sans-serif' }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: cfg.color, boxShadow: `0 0 6px ${cfg.color}` }} />
      {status}
    </span>
  );
}

function GlowBtn({ onClick, disabled, icon, label, gradient, glow }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full py-3 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-200"
      style={{
        background: gradient,
        color: '#060b18',
        fontFamily: 'Outfit, sans-serif',
        boxShadow: `0 0 20px ${glow}`,
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
      onMouseEnter={e => {
        if (!disabled) {
          e.currentTarget.style.boxShadow = `0 0 32px ${glow.replace('0.3', '0.55')}`;
          e.currentTarget.style.transform = 'translateY(-1px)';
        }
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = `0 0 20px ${glow}`;
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <span className="material-symbols-outlined" style={{ fontSize: '16px', fontVariationSettings: "'FILL' 1" }}>{icon}</span>
      {label}
    </button>
  );
}

function OutlineBtn({ onClick, icon, label, color = '#00d4ff', borderColor = 'rgba(0,212,255,0.25)' }) {
  return (
    <button
      onClick={onClick}
      className="w-full py-2.5 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200"
      style={{
        background: 'transparent',
        color: color,
        border: `1px solid ${borderColor}`,
        fontFamily: 'Inter, sans-serif',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = `${color}12`;
        e.currentTarget.style.borderColor = `${color}55`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'transparent';
        e.currentTarget.style.borderColor = borderColor;
      }}
    >
      <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>{icon}</span>
      {label}
    </button>
  );
}

export default CardManagement;
