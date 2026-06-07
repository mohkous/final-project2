import React, { useState, useRef, useCallback, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Webcam from "react-webcam";
import api from '../api';
import { useNavigate } from 'react-router-dom';

function IDCardGeneration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('id_form_data');
    return saved ? JSON.parse(saved) : {
      firstName: '',
      lastName: '',
      department: '',
      validUntil: ''
    };
  });

  const [capturedImage, setCapturedImage] = useState(() => {
    return localStorage.getItem('id_captured_image') || null;
  });

  const [showCamera, setShowCamera] = useState(false);
  const [loading, setLoading] = useState(false);
  const [generatedCard, setGeneratedCard] = useState(null);
  const webcamRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('id_form_data', JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    if (capturedImage) {
      localStorage.setItem('id_captured_image', capturedImage);
    } else {
      localStorage.removeItem('id_captured_image');
    }
  }, [capturedImage]);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    setShowCamera(false);
  }, [webcamRef]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleGenerate = async () => {
    if (!capturedImage) { alert("Please take a photo first!"); return; }
    if (!formData.firstName || !formData.lastName) { alert("Please enter both First Name and Last Name!"); return; }
    setLoading(true);
    try {
      const response = await api.post('/generate-id', { ...formData, image: capturedImage });
      if (response.data.success) {
        setGeneratedCard(response.data.card);
        alert("ID Generated Successfully!");
        localStorage.removeItem('id_form_data');
        localStorage.removeItem('id_captured_image');
      }
    } catch (error) {
      console.error(error);
      const serverMsg = error.response?.data?.message || error.message;
      alert("Error generating ID: " + serverMsg);
    } finally {
      setLoading(false);
    }
  };

  const videoConstraints = { facingMode: "user" };

  const handleCameraError = (error) => {
    console.error("Camera Error:", error);
    alert("Camera error: " + error.toString() + "\nPlease allow camera access.");
    setShowCamera(false);
  };

  const inputStyle = (focused) => ({
    background: '#0a0e1a',
    border: `1px solid ${focused ? 'rgba(0,212,255,0.5)' : '#1e2d4a'}`,
    boxShadow: focused ? '0 0 0 3px rgba(0,212,255,0.08)' : 'none',
    color: '#e2e8f0',
    fontFamily: 'Inter, sans-serif',
    borderRadius: '12px',
    padding: '12px 16px',
    width: '100%',
    fontSize: '14px',
    outline: 'none',
    transition: 'all 0.2s',
  });

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
          <div
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
          </div>
        </header>

        <main className="flex-1 mt-16 overflow-y-auto p-6 md:p-8" style={{ background: '#0a0e1a' }}>
          <div className="max-w-[1280px] mx-auto h-full flex flex-col lg:flex-row gap-6">

            {/* Form Panel */}
            <div
              className="flex-1 rounded-2xl p-8 flex flex-col gap-6 h-fit"
              style={{
                background: '#0f1629',
                border: '1px solid #1e2d4a',
                boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
              }}
            >
              <div>
                <h2
                  className="text-2xl font-black mb-1"
                  style={{
                    fontFamily: 'Outfit, sans-serif',
                    background: 'linear-gradient(135deg, #e2e8f0, #94a3b8)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Card Details
                </h2>
                <p className="text-sm" style={{ color: '#475569' }}>
                  Enter details to generate a new digital ID.
                </p>
              </div>

              {/* Photo Capture */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#475569' }}>
                  Profile Photo
                </label>
                {showCamera ? (
                  <div
                    className="relative rounded-2xl overflow-hidden bg-black"
                    style={{
                      border: '2px solid rgba(0,212,255,0.4)',
                      boxShadow: '0 0 20px rgba(0,212,255,0.15)',
                      aspectRatio: '1',
                      maxWidth: '300px',
                      margin: '0 auto',
                    }}
                  >
                    <Webcam
                      audio={false}
                      ref={webcamRef}
                      screenshotFormat="image/jpeg"
                      videoConstraints={videoConstraints}
                      onUserMediaError={handleCameraError}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={capture}
                      className="absolute bottom-4 left-1/2 -translate-x-1/2 p-4 rounded-full transition-all duration-200"
                      style={{
                        background: 'linear-gradient(135deg, #00d4ff, #00c9a7)',
                        boxShadow: '0 0 20px rgba(0,212,255,0.5)',
                        color: '#060b18',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.transform = 'translateX(-50%) scale(1.1)')}
                      onMouseLeave={e => (e.currentTarget.style.transform = 'translateX(-50%) scale(1)')}
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: '24px', fontVariationSettings: "'FILL' 1" }}>
                        photo_camera
                      </span>
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => setShowCamera(true)}
                    className="flex flex-col items-center justify-center gap-3 cursor-pointer rounded-2xl p-6 transition-all duration-200"
                    style={{
                      border: '2px dashed #1e2d4a',
                      minHeight: '180px',
                      background: 'rgba(0,212,255,0.02)',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = 'rgba(0,212,255,0.3)';
                      e.currentTarget.style.background = 'rgba(0,212,255,0.04)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = '#1e2d4a';
                      e.currentTarget.style.background = 'rgba(0,212,255,0.02)';
                    }}
                  >
                    {capturedImage ? (
                      <img src={capturedImage} alt="Captured" className="w-28 h-28 rounded-xl object-cover" style={{ border: '2px solid rgba(0,212,255,0.3)' }} />
                    ) : (
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center"
                        style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.2)' }}
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: '28px', color: '#00d4ff' }}>add_a_photo</span>
                      </div>
                    )}
                    <span className="text-sm font-semibold" style={{ color: '#00d4ff' }}>
                      {capturedImage ? 'Change Photo' : 'Click to take photo'}
                    </span>
                  </div>
                )}
              </div>

              {/* Form Fields */}
              <form className="flex flex-col gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField label="First Name" id="firstName" value={formData.firstName} onChange={handleChange} />
                  <InputField label="Last Name" id="lastName" value={formData.lastName} onChange={handleChange} />

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#475569' }}>
                      Department
                    </label>
                    <select
                      id="department"
                      value={formData.department}
                      onChange={handleChange}
                      style={{
                        background: '#0a0e1a',
                        border: '1px solid #1e2d4a',
                        color: formData.department ? '#e2e8f0' : '#475569',
                        fontFamily: 'Inter, sans-serif',
                        borderRadius: '12px',
                        padding: '12px 16px',
                        width: '100%',
                        fontSize: '14px',
                        outline: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                      onFocus={e => {
                        e.target.style.borderColor = 'rgba(0,212,255,0.5)';
                        e.target.style.boxShadow = '0 0 0 3px rgba(0,212,255,0.08)';
                      }}
                      onBlur={e => {
                        e.target.style.borderColor = '#1e2d4a';
                        e.target.style.boxShadow = 'none';
                      }}
                    >
                      <option value="">Select Department</option>
                      <option>Engineering</option>
                      <option>Human Resources</option>
                      <option>Operations</option>
                      <option>Security</option>
                    </select>
                  </div>
                </div>

                <InputField label="Valid Until" id="validUntil" type="date" value={formData.validUntil} onChange={handleChange} />

                {/* Buttons */}
                <div className="flex justify-end gap-3 mt-2">
                  <button
                    type="button"
                    onClick={() => { setCapturedImage(null); setGeneratedCard(null); setFormData({ firstName: '', lastName: '', department: '', validUntil: '' }); }}
                    className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
                    style={{
                      background: 'transparent',
                      color: '#475569',
                      border: '1px solid #1e2d4a',
                      fontFamily: 'Inter, sans-serif',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = '#2a3d60';
                      e.currentTarget.style.color = '#94a3b8';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = '#1e2d4a';
                      e.currentTarget.style.color = '#475569';
                    }}
                  >
                    Clear
                  </button>

                  {generatedCard ? (
                    <button
                      type="button"
                      onClick={() => navigate('/management')}
                      className="px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all duration-200"
                      style={{
                        background: 'linear-gradient(135deg, #00c9a7, #00a085)',
                        color: '#060b18',
                        fontFamily: 'Outfit, sans-serif',
                        boxShadow: '0 0 16px rgba(0,201,167,0.3)',
                      }}
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: '16px', fontVariationSettings: "'FILL' 1" }}>
                        credit_score
                      </span>
                      View in Management
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleGenerate}
                      disabled={loading}
                      className="px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all duration-200"
                      style={{
                        background: loading ? '#1e2845' : 'linear-gradient(135deg, #00d4ff, #00c9a7)',
                        color: loading ? '#475569' : '#060b18',
                        fontFamily: 'Outfit, sans-serif',
                        boxShadow: loading ? 'none' : '0 0 20px rgba(0,212,255,0.3)',
                        cursor: loading ? 'not-allowed' : 'pointer',
                      }}
                      onMouseEnter={e => {
                        if (!loading) e.currentTarget.style.boxShadow = '0 0 32px rgba(0,212,255,0.5)';
                      }}
                      onMouseLeave={e => {
                        if (!loading) e.currentTarget.style.boxShadow = '0 0 20px rgba(0,212,255,0.3)';
                      }}
                    >
                      {loading ? (
                        <>
                          <div className="w-4 h-4 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: '#475569', borderTopColor: 'transparent' }} />
                          Generating...
                        </>
                      ) : (
                        <>
                          <span className="material-symbols-outlined" style={{ fontSize: '16px', fontVariationSettings: "'FILL' 1" }}>
                            badge
                          </span>
                          Generate ID
                        </>
                      )}
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* ID Card Preview */}
            <div className="w-full lg:w-[400px] flex flex-col gap-4">
              <h3
                className="text-lg font-bold hidden lg:block"
                style={{ fontFamily: 'Outfit, sans-serif', color: '#94a3b8' }}
              >
                Live Preview
              </h3>

              <div
                className="rounded-3xl p-6 flex flex-col gap-5 relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #0d1c35 0%, #071020 50%, #0a1428 100%)',
                  border: '1px solid rgba(0,212,255,0.2)',
                  boxShadow: '0 0 40px rgba(0,212,255,0.1), 0 20px 60px rgba(0,0,0,0.5)',
                }}
              >
                {/* Background decorative elements */}
                <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full pointer-events-none"
                  style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 70%)' }}
                />
                <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full pointer-events-none"
                  style={{ background: 'radial-gradient(circle, rgba(0,201,167,0.06) 0%, transparent 70%)' }}
                />

                {/* Card Header */}
                <div className="flex justify-between items-start relative z-10">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'rgba(0,212,255,0.6)' }}>
                      Official Digital ID
                    </p>
                    <p className="text-sm font-bold mt-0.5" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'JetBrains Mono, monospace' }}>
                      GOV-2024
                    </p>
                  </div>
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.2)' }}
                  >
                    <span
                      className="material-symbols-outlined"
                      style={{ fontSize: '20px', color: '#00d4ff', fontVariationSettings: "'FILL' 1" }}
                    >
                      verified_user
                    </span>
                  </div>
                </div>

                {/* Photo + Info */}
                <div className="flex gap-4 items-center relative z-10">
                  <div
                    className="w-24 h-32 rounded-xl overflow-hidden flex items-center justify-center flex-shrink-0"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '2px solid rgba(0,212,255,0.2)',
                    }}
                  >
                    {capturedImage ? (
                      <img src={capturedImage} alt="Captured" className="w-full h-full object-cover" />
                    ) : (
                      <span className="material-symbols-outlined" style={{ fontSize: '40px', color: 'rgba(0,212,255,0.3)' }}>
                        person
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-widest" style={{ color: 'rgba(0,212,255,0.5)' }}>Name</p>
                      <p className="text-lg font-bold" style={{ color: '#e2e8f0', fontFamily: 'Outfit, sans-serif' }}>
                        {formData.firstName || 'First'} {formData.lastName || 'Last'}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest" style={{ color: 'rgba(0,212,255,0.5)' }}>Department</p>
                      <p className="text-sm font-medium" style={{ color: '#94a3b8' }}>
                        {formData.department || '—'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Details Row */}
                <div
                  className="grid grid-cols-2 gap-4 p-4 rounded-xl relative z-10"
                  style={{ background: 'rgba(0,212,255,0.05)', border: '1px solid rgba(0,212,255,0.1)' }}
                >
                  <div>
                    <p className="text-xs uppercase tracking-widest" style={{ color: 'rgba(0,212,255,0.5)' }}>ID Number</p>
                    <p className="text-sm font-medium truncate" style={{ color: '#94a3b8', fontFamily: 'JetBrains Mono, monospace' }}>
                      {generatedCard?.idNumber || 'Auto-generated'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest" style={{ color: 'rgba(0,212,255,0.5)' }}>Valid Until</p>
                    <p className="text-sm font-medium" style={{ color: '#94a3b8', fontFamily: 'JetBrains Mono, monospace' }}>
                      {formData.validUntil || '—'}
                    </p>
                  </div>
                </div>

                {/* QR + Status */}
                <div className="flex justify-between items-end relative z-10">
                  <div
                    className="p-2 rounded-xl"
                    style={{ background: '#fff', boxShadow: '0 0 16px rgba(0,212,255,0.2)' }}
                  >
                    {generatedCard?.qrCode ? (
                      <img src={generatedCard.qrCode} alt="QR Code" className="w-16 h-16" />
                    ) : (
                      <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center">
                        <span className="material-symbols-outlined" style={{ fontSize: '24px', color: '#ccc' }}>
                          qr_code_2
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-xs uppercase tracking-widest" style={{ color: 'rgba(0,212,255,0.4)' }}>Status</p>
                    <div className="flex items-center gap-1.5 justify-end mt-1">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ background: '#00c9a7', boxShadow: '0 0 8px #00c9a7' }}
                      />
                      <p className="text-sm font-bold" style={{ color: '#00c9a7' }}>Active</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function InputField({ label, id, type = "text", value, onChange }) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#475569' }} htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          background: '#0a0e1a',
          border: `1px solid ${focused ? 'rgba(0,212,255,0.5)' : '#1e2d4a'}`,
          boxShadow: focused ? '0 0 0 3px rgba(0,212,255,0.08)' : 'none',
          color: '#e2e8f0',
          fontFamily: 'Inter, sans-serif',
          borderRadius: '12px',
          padding: '12px 16px',
          width: '100%',
          fontSize: '14px',
          outline: 'none',
          transition: 'all 0.2s',
        }}
      />
    </div>
  );
}

export default IDCardGeneration;
