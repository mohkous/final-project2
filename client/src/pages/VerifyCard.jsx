import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api';

function VerifyCard() {
  const { id } = useParams();
  const [cardData, setCardData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [manualId, setManualId] = useState('');

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
    if (id) {
      fetchCardData(id);
    }
  }, [id]);

  const handleManualSearch = (e) => {
    e.preventDefault();
    if (manualId.trim()) {
      fetchCardData(manualId.trim());
    }
  };

  if (!id && !cardData && !loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-3xl">qr_code_scanner</span>
            </div>
            <h2 className="font-h2 text-h2 text-primary">Identity Verification</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-2">Scan a QR code or enter the ID number manually.</p>
          </div>
          
          <form onSubmit={handleManualSearch} className="space-y-4">
            <div className="flex flex-col gap-2">
              <label className="font-label-caps text-label-caps text-on-surface-variant uppercase">Enter ID Number</label>
              <input 
                type="text" 
                value={manualId}
                onChange={(e) => setManualId(e.target.value)}
                placeholder="e.g. GID-1234-5678"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-data-mono"
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-primary text-on-primary py-3 rounded-lg font-medium hover:bg-primary-dark transition-all active:scale-95"
            >
              Verify Identity
            </button>
          </form>
          
          <div className="mt-8 text-center border-t pt-6">
            <Link to="/dashboard" className="text-on-surface-variant hover:text-primary font-body-sm text-body-sm flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              Return to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 bg-primary/20 rounded-full mb-4"></div>
          <div className="h-4 w-32 bg-slate-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error || !cardData) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl text-center">
          <div className="w-16 h-16 bg-error-container/30 text-error rounded-full flex items-center justify-center mx-auto mb-4 border border-error-container">
            <span className="material-symbols-outlined text-3xl">error</span>
          </div>
          <h2 className="font-h2 text-h2 text-error">Verification Failed</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-2 mb-6">
            {error || "This digital ID could not be verified in our records."}
          </p>
          <Link to="/" className="inline-block px-6 py-3 bg-primary text-on-primary rounded-lg font-medium">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        {/* Verification Success Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-secondary-container/30 text-secondary rounded-full flex items-center justify-center mx-auto mb-4 border border-secondary-container">
            <span className="material-symbols-outlined text-3xl">verified</span>
          </div>
          <h2 className="font-h2 text-h2 text-primary">Identity Verified</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">This digital ID is authentic and currently active.</p>
        </div>

        {/* The ID Card Preview (Matching the one in IDCardGeneration) */}
        <div className="bg-gradient-to-br from-primary-container to-tertiary-container rounded-[1.5rem] p-6 shadow-xl text-on-primary flex flex-col gap-6 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
          
          <div className="flex justify-between items-start z-10">
            <div>
              <h4 className="font-label-caps text-label-caps text-on-primary/80 uppercase tracking-widest">Official Digital ID</h4>
              <div className="font-data-mono text-data-mono text-on-primary mt-1">GOV-2024</div>
            </div>
            <span className="material-symbols-outlined text-3xl text-secondary-container">verified_user</span>
          </div>

          <div className="flex gap-6 items-center z-10">
            <div className="w-24 h-32 bg-surface-variant rounded-lg overflow-hidden border-2 border-on-primary/20">
              <img src={cardData.image} alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col gap-2">
              <div>
                <div className="font-label-caps text-label-caps text-on-primary/70 uppercase">Name</div>
                <div className="font-h3 text-h3 text-on-primary">{cardData.firstName} {cardData.lastName}</div>
              </div>
              <div>
                <div className="font-label-caps text-label-caps text-on-primary/70 uppercase">Department</div>
                <div className="font-body-md text-body-md text-on-primary">{cardData.department}</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 z-10 bg-primary/20 p-4 rounded-lg backdrop-blur-sm border border-on-primary/10">
            <div>
              <div className="font-label-caps text-label-caps text-on-primary/70 uppercase">ID Number</div>
              <div className="font-data-mono text-data-mono text-on-primary truncate">{cardData.idNumber}</div>
            </div>
            <div>
              <div className="font-label-caps text-label-caps text-on-primary/70 uppercase">Valid Until</div>
              <div className="font-data-mono text-data-mono text-on-primary">
                {new Date(cardData.validUntil).toLocaleDateString()}
              </div>
            </div>
          </div>

          <div className="flex justify-between items-end z-10">
            <div className="bg-white p-1 rounded-lg shadow-inner border border-on-primary/10">
              {cardData.qrCode ? (
                <img 
                  src={cardData.qrCode} 
                  alt="QR Code" 
                  className="w-20 h-20 block object-contain" 
                  style={{ imageRendering: 'pixelated' }}
                />
              ) : (
                <div className="w-20 h-20 bg-slate-100 rounded flex items-center justify-center">
                  <span className="material-symbols-outlined text-slate-300">qr_code_2</span>
                </div>
              )}
            </div>
            <div className="text-right">
              <div className="font-label-caps text-label-caps text-on-primary/50 uppercase">Status</div>
              <div className="font-body-md text-body-md text-secondary-container flex items-center gap-1 justify-end">
                <span className="w-2 h-2 rounded-full bg-secondary-container"></span>
                {cardData.status || 'Active'}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link to="/dashboard" className="text-primary hover:underline font-body-sm text-body-sm flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Return to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

export default VerifyCard;
