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
    if (!capturedImage) {
      alert("Please take a photo first!");
      return;
    }

    if (!formData.firstName || !formData.lastName) {
      alert("Please enter both First Name and Last Name!");
      return;
    }

    setLoading(true);
    try {
      const response = await api.post('/generate-id', {
        ...formData,
        image: capturedImage
      });
      
      if (response.data.success) {
        setGeneratedCard(response.data.card);
        alert("ID Generated Successfully!");
        // Clear local storage after successful generation if desired, 
        // but user might want to keep it as a template? 
        // Let's clear it to avoid confusion for the next one.
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

  const videoConstraints = {
    facingMode: "user"
  };

  const handleCameraError = (error) => {
    console.error("Camera Error:", error);
    alert("Camera error: " + error.toString() + "\nPlease make sure you have allowed camera access and you are using HTTPS or localhost.");
    setShowCamera(false);
  };

  return (
    <div className="bg-background text-on-background font-body-md h-screen overflow-hidden flex">
      <Sidebar />

      <div className="flex-1 md:ml-[280px] flex flex-col h-screen">
        <header className="fixed top-0 right-0 md:left-[280px] left-0 z-30 h-16 border-b border-slate-200 shadow-sm bg-white/80 backdrop-blur-md flex items-center justify-between px-8 w-full md:w-[calc(100%-280px)]">
          <div className="text-lg font-black text-slate-900 uppercase tracking-wider font-h3">
            Digital ID Admin
          </div>
        </header>

        <main className="flex-1 mt-16 overflow-y-auto p-gutter bg-surface-container-low">
          <div className="max-w-container-max mx-auto h-full flex flex-col lg:flex-row gap-gutter">
            
            <div className="flex-1 bg-surface-container-lowest rounded-xl shadow-sm border border-surface-variant p-8 flex flex-col gap-stack-lg h-fit">
              <div>
                <h2 className="font-h3 text-h3 text-on-surface mb-2">Card Details</h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Enter details to generate a new digital ID.</p>
              </div>
              
              <form className="flex flex-col gap-stack-md">
                <div className="flex flex-col gap-stack-sm">
                  <label className="font-label-caps text-label-caps text-on-surface uppercase">Profile Photo</label>
                  
                  {showCamera ? (
                    <div className="relative border-2 border-primary rounded-lg overflow-hidden bg-black aspect-square max-w-[300px] mx-auto">
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
                        className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-primary text-on-primary p-4 rounded-full shadow-lg hover:scale-110"
                      >
                        <span className="material-symbols-outlined">photo_camera</span>
                      </button>
                    </div>
                  ) : (
                    <div 
                      onClick={() => setShowCamera(true)}
                      className="border-2 border-dashed border-outline-variant rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-surface-container-highest min-h-[200px]"
                    >
                      {capturedImage ? (
                        <img src={capturedImage} alt="Captured" className="w-32 h-32 rounded-lg object-cover mb-2" />
                      ) : (
                        <span className="material-symbols-outlined text-4xl text-on-surface-variant mb-2">add_a_photo</span>
                      )}
                      <span className="font-body-md text-primary font-medium">
                        {capturedImage ? 'Change Photo' : 'Click to take photo'}
                      </span>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md">
                  <InputField label="First Name" id="firstName" value={formData.firstName} onChange={handleChange} />
                  <InputField label="Last Name" id="lastName" value={formData.lastName} onChange={handleChange} />
                  
                  <div className="flex flex-col gap-stack-sm">
                    <label className="font-label-caps text-label-caps text-on-surface uppercase">Department</label>
                    <select 
                      className="font-body-md bg-surface-container-lowest border border-outline rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary" 
                      id="department"
                      value={formData.department}
                      onChange={handleChange}
                    >
                      <option>Select Department</option>
                      <option>Engineering</option>
                      <option>Human Resources</option>
                      <option>Operations</option>
                      <option>Security</option>
                    </select>
                  </div>
                </div>

                <InputField label="Valid Until" id="validUntil" type="date" value={formData.validUntil} onChange={handleChange} />

                <div className="mt-stack-md flex justify-end gap-stack-sm">
                  <button 
                    onClick={() => { setCapturedImage(null); setGeneratedCard(null); setFormData({ firstName: '', lastName: '', department: '', validUntil: '' }); }}
                    className="px-6 py-3 rounded-md border border-primary text-primary" 
                    type="button"
                  >
                    Clear
                  </button>
                  {generatedCard ? (
                    <button 
                      onClick={() => navigate('/management')}
                      className="px-6 py-3 rounded-md bg-secondary text-on-secondary shadow-sm active:scale-98"
                      type="button"
                    >
                      View in Management
                    </button>
                  ) : (
                    <button 
                      onClick={handleGenerate}
                      disabled={loading}
                      className={`px-6 py-3 rounded-md bg-primary text-on-primary shadow-sm active:scale-98 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                      type="button"
                    >
                      {loading ? 'Generating...' : 'Generate ID'}
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="w-full lg:w-[400px] flex flex-col gap-stack-md">
              <h3 className="font-h3 text-on-surface hidden lg:block">Live Preview</h3>
              
              <div className="bg-gradient-to-br from-primary-container to-tertiary-container rounded-[1.5rem] p-6 shadow-lg text-on-primary flex flex-col gap-stack-md relative overflow-hidden">
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
                
                <div className="flex justify-between items-start z-10">
                  <div>
                    <h4 className="font-label-caps text-on-primary/80 uppercase tracking-widest">Official Digital ID</h4>
                    <div className="font-data-mono mt-1">GOV-2024</div>
                  </div>
                  <span className="material-symbols-outlined text-3xl text-secondary-container">verified_user</span>
                </div>

                <div className="flex gap-stack-md items-center z-10 mt-stack-sm">
                  <div className="w-24 h-32 bg-surface-variant rounded-lg overflow-hidden border-2 border-on-primary/20">
                    <div className="w-full h-full flex items-center justify-center bg-primary/20">
                      {capturedImage ? (
                        <img src={capturedImage} alt="Captured" className="w-full h-full object-cover" />
                      ) : (
                        <span className="material-symbols-outlined text-4xl text-on-primary/50">person</span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-unit">
                    <div>
                      <div className="font-label-caps text-on-primary/70 uppercase">Name</div>
                      <div className="font-h3">{formData.firstName} {formData.lastName}</div>
                    </div>
                    <div>
                      <div className="font-label-caps text-on-primary/70 uppercase">Department</div>
                      <div className="font-body-md">{formData.department}</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-stack-sm z-10 bg-primary/20 p-4 rounded-lg backdrop-blur-sm mt-stack-sm border border-on-primary/10">
                  <div>
                    <div className="font-label-caps text-on-primary/70 uppercase">ID Number</div>
                    <div className="font-data-mono truncate">{generatedCard?.idNumber || 'Auto-generated'}</div>
                  </div>
                  <div>
                    <div className="font-label-caps text-on-primary/70 uppercase">Valid Until</div>
                    <div className="font-data-mono">{formData.validUntil}</div>
                  </div>
                </div>

                <div className="flex justify-between items-end z-10 mt-stack-md">
                  <div className="bg-white p-1 rounded-lg">
                    {generatedCard?.qrCode ? (
                      <img src={generatedCard.qrCode} alt="QR Code" className="w-20 h-20" />
                    ) : (
                      <div className="w-20 h-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0xMCAxMGgzMHYzMEgxMHptMTAgMTBoMTB2MTBIMjB6bTQwLTIwaDMwdjMwSDYwem0xMCAxMGgxMHYxMEg3MHpNMTAgNjBoMzB2MzBIMTB6bTEwIDEwaDEwdjEwaC0yMHoiIGZpbGw9IiMwMDAiLz48L3N2Zz4=')] bg-cover opacity-80"></div>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="font-label-caps text-on-primary/50 uppercase">Status</div>
                    <div className="font-body-md text-secondary-container flex items-center gap-1 justify-end">
                      <span className="w-2 h-2 rounded-full bg-secondary-container"></span>
                      Active
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

function InputField({ label, id, type = "text", value, onChange, mono }) {
  return (
    <div className="flex flex-col gap-stack-sm">
      <label className="font-label-caps text-label-caps text-on-surface uppercase" htmlFor={id}>{label}</label>
      <input 
        className={`${mono ? 'font-data-mono' : 'font-body-md'} bg-surface-container-lowest border border-outline rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary`} 
        id={id} 
        type={type}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default IDCardGeneration;
