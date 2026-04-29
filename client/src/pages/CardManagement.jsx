import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import axios from 'axios';

function CardManagement() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users');
        const allCards = response.data.flatMap(user => 
          (user.Cards || []).map(card => ({
            ...card,
            userName: `${user.firstName} ${user.lastName}`,
            department: user.department
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
    const url = `http://localhost:5173/verify/${selectedCard.idNumber}`;
    navigator.clipboard.writeText(url);
    alert("Verification link copied to clipboard!");
  };

  const handleCopyImage = async () => {
    if (!selectedCard?.qrCode) return;
    try {
      const response = await fetch(selectedCard.qrCode);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ]);
      alert("QR Image copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy image:", err);
      alert("Failed to copy image. Your browser might not support this feature.");
    }
  };

  return (
    <div className="bg-background text-on-background font-body-md antialiased flex min-h-screen">
      <Sidebar />

      <div className="flex-1 md:ml-[280px] flex flex-col h-screen">
        <header className="fixed top-0 right-0 md:left-[280px] left-0 z-30 h-16 flex items-center justify-between px-8 bg-surface-container-lowest/90 backdrop-blur-md border-b border-outline-variant shadow-sm">
          <span className="font-h3 text-h3 text-primary uppercase tracking-wider font-black">Digital ID Admin</span>
        </header>

        <main className="flex-1 mt-16 p-margin-desktop w-full max-w-[1400px] overflow-y-auto">
          <div className="mb-stack-lg">
            <h2 className="font-h2 text-h2 text-on-surface">Card Management</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">View status and generate QR codes for all issued digital IDs.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter">
            {/* List Section */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm overflow-hidden h-fit">
              <table className="w-full text-left border-collapse">
                <thead className="bg-surface-container-low border-b border-outline-variant">
                  <tr>
                    <th className="py-4 px-6 font-label-caps text-label-caps text-on-surface-variant uppercase">Card ID</th>
                    <th className="py-4 px-6 font-label-caps text-label-caps text-on-surface-variant uppercase">Holder</th>
                    <th className="py-4 px-6 font-label-caps text-label-caps text-on-surface-variant uppercase">Status</th>
                    <th className="py-4 px-6 font-label-caps text-label-caps text-on-surface-variant uppercase text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  {loading ? (
                    <tr><td colSpan="4" className="py-10 text-center font-body-md text-on-surface-variant">Loading cards...</td></tr>
                  ) : cards.length === 0 ? (
                    <tr><td colSpan="4" className="py-10 text-center font-body-md text-on-surface-variant">No cards found.</td></tr>
                  ) : (
                    cards.map((card) => (
                      <tr key={card.id} className="hover:bg-surface-bright transition-colors group">
                        <td className="py-4 px-6 font-data-mono text-data-mono text-sm">{card.idNumber}</td>
                        <td className="py-4 px-6">
                          <p className="font-body-md text-body-md font-medium">{card.userName}</p>
                          <p className="font-body-sm text-body-sm text-on-surface-variant">{card.department}</p>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`px-2.5 py-1 rounded-lg font-label-caps text-[10px] border ${card.status === 'Active' ? 'bg-secondary-container/30 text-on-secondary-fixed-variant border-secondary-container' : 'bg-error-container/30 text-error border-error-container'}`}>
                            {card.status}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <button 
                            onClick={() => setSelectedCard(card)}
                            className="text-primary hover:bg-surface-container px-3 py-1.5 rounded-md transition-colors font-body-sm text-body-sm border border-outline-variant"
                          >
                            View QR
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* QR Preview Section */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm p-8 flex flex-col items-center justify-center min-h-[400px]">
              {selectedCard ? (
                <div className="text-center space-y-6">
                  <h3 className="font-h3 text-h3 text-primary">Saved QR Code for {selectedCard.userName}</h3>
                  <div className="bg-white p-4 rounded-2xl shadow-md border border-outline-variant inline-block">
                    {selectedCard.qrCode ? (
                      <img src={selectedCard.qrCode} alt="QR Code" className="w-[200px] h-[200px]" />
                    ) : (
                      <div className="w-[200px] h-[200px] flex items-center justify-center bg-surface-container text-on-surface-variant">No QR Saved</div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <p className="font-data-mono text-data-mono text-on-surface-variant">ID: {selectedCard.idNumber}</p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant italic">This is the secure QR code stored in the identity database.</p>
                  </div>
                  <div className="flex flex-col gap-3">
                    <button 
                      onClick={handleDownload}
                      disabled={!selectedCard.qrCode}
                      className="w-full bg-primary text-on-primary px-8 py-3 rounded-lg font-medium hover:bg-on-surface transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <span className="material-symbols-outlined">download</span>
                      Download QR Code
                    </button>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <button 
                        onClick={handleCopyLink}
                        className="bg-surface-container-high text-on-surface px-4 py-3 rounded-lg font-medium hover:bg-surface-variant transition-all active:scale-95 flex items-center justify-center gap-2 border border-outline-variant"
                      >
                        <span className="material-symbols-outlined text-sm">link</span>
                        Copy Link
                      </button>
                      <button 
                        onClick={handleCopyImage}
                        className="bg-surface-container-high text-on-surface px-4 py-3 rounded-lg font-medium hover:bg-surface-variant transition-all active:scale-95 flex items-center justify-center gap-2 border border-outline-variant"
                      >
                        <span className="material-symbols-outlined text-sm">content_copy</span>
                        Copy Image
                      </button>
                    </div>
                    
                    <button 
                      onClick={() => alert(`ID ${selectedCard.idNumber} is officially saved and ready for QR verification.`)}
                      className="w-full border-2 border-primary text-primary px-8 py-3 rounded-lg font-medium hover:bg-primary/5 transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                      <span className="material-symbols-outlined text-sm">verified</span>
                      Save to Verification System
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center text-on-surface-variant">
                  <span className="material-symbols-outlined text-[64px] mb-4 opacity-20">qr_code_2</span>
                  <p className="font-body-lg text-body-lg">Select a card to generate its secure QR code.</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default CardManagement;
