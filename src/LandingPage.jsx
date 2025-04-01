import React, { useState } from 'react';
import InputOverlay from './InputOverlay';
import OutputOverlay from './OutputOverlay';

const LandingPage = () => {
  const [inputOpen, setInputOpen] = useState(false);
  const [outputOpen, setOutputOpen] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [inputImages, setInputImages] = useState({
    rgb: null,
    ir: null,
    rgbPreview: null,
    irPreview: null
  });

  const handleProcessImages = async (rgbImage, irImage) => {
    try {
      setProcessing(true);
      setError(null);

      // Create preview URLs for display
      const rgbPreview = URL.createObjectURL(rgbImage);
      const irPreview = URL.createObjectURL(irImage);
      
      // Store images and previews in state
      setInputImages({
        rgb: rgbImage,
        ir: irImage,
        rgbPreview,
        irPreview
      });

      const formData = new FormData();
      formData.append('rgb_image', rgbImage);
      formData.append('ir_image', irImage);

      const apiUrl = import.meta.env.VITE_API_URL;

      const response = await fetch("https://dl-course-project-django-backend.onrender.com/api/upload/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload images');
      }

      const data = await response.json();
      setResults(data);
      setOutputOpen(false);
    }
    catch (err) {
      setError(err.message || "Failed to process images");
      console.error("Error:", err);
    }
    finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-100 font-sans">
      {/* Main Content */}
      <div className="w-full min-h-screen flex flex-col p-8">
        {/* Header Section */}
        <header className="w-full text-center py-8 border-b border-gray-200">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight mb-4">
            DEPARTMENT OF INFORMATION TECHNOLOGY
          </h1>
          <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-4">
            NATIONAL INSTITUTE OF TECHNOLOGY KARNATAKA, SURATHKAL
          </h2>
          <div className="w-32 h-1 bg-indigo-500 mx-auto my-6"></div>
        </header>

        {/* Project Info Section */}
        <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
          <div className="max-w-4xl w-full text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
              Deep Learning Course Project: <span className="text-red-600 font-semibold italic">Wildfire Detection using drone images</span>
            </h3>
            
            <p className="text-lg md:text-xl text-gray-700 mb-3">
              Carried out by: Vijay Kumar B (221AI043) & Tarlana Sahil (221AI040)
            </p>
            
            <p className="text-md md:text-lg text-gray-500 mb-16">
              Session January - April 2025
            </p>
            
            {/* Action Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 max-w-3xl mx-auto">
              <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300">
                <h4 className="text-xl font-semibold text-gray-800 mb-4">Input Images</h4>
                <p className="text-gray-600 mb-6">Upload RGB and IR drone images for wildfire detection analysis</p>
                <button 
                  className="w-full bg-white hover:bg-gray-50 text-indigo-600 font-medium px-6 py-3 rounded-lg border-2 border-indigo-600 hover:border-indigo-700 transition-colors duration-200"
                  onClick={() => setInputOpen(true)}
                  disabled={processing}
                >
                  {processing ? "Processing..." : "Upload Images"}
                </button>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300">
                <h4 className="text-xl font-semibold text-gray-800 mb-4">View Results</h4>
                <p className="text-gray-600 mb-6">Examine the wildfire detection results from model analysis</p>
                <button 
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200"
                  onClick={() => setOutputOpen(true)}
                >
                  View Output
                </button>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="w-full text-center py-6 border-t border-gray-200">
          <p className="text-gray-600">© 2025 Department of Information Technology, NITK Surathkal</p>
        </footer>
      </div>
      
      {/* Overlays */}
      <InputOverlay 
        open={inputOpen} 
        onOpenChange={setInputOpen} 
        onProcessImages={handleProcessImages}
        processsing={processing}
        error={error}
      />
      <OutputOverlay 
        open={outputOpen} 
        onOpenChange={setOutputOpen}
        response={results || null}
        images={inputImages}
      />
    </div>
  );
};

export default LandingPage;