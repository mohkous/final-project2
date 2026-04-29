import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-surface-container-lowest flex items-center justify-center p-6 text-center">
      <div className="max-w-md">
        <span className="material-symbols-outlined text-[80px] text-error mb-4">error_outline</span>
        <h1 className="font-h1 text-h1 text-on-surface mb-2">404 - Page Not Found</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link 
          to="/dashboard" 
          className="inline-block bg-primary text-on-primary px-8 py-3 rounded-lg font-medium hover:bg-on-surface transition-all active:scale-95 shadow-sm"
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
