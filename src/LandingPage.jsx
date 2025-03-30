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
    <div className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "url('https://www.nitk.ac.in/design-system/Gallery/Kite-Festival.jpg')",
          filter: "brightness(0.7)"
        }}
      ></div>
      
      {/* Glass Container */}
      <div className="bg-opacity-20 backdrop-blur-md rounded-xl p-8 md:p-12 max-w-3xl w-full mx-4 z-10 text-center border border-white border-opacity-30 shadow-lg">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-6 leading-relaxed">
          DEPARTMENT OF INFORMATION TECHNOLOGY
        </h1>
        <h2 className="text-xl md:text-2xl font-semibold text-white mb-6">
          NATIONAL INSTITUTE OF TECHNOLOGY KARNATAKA, SURATHKAL
        </h2>
        <div className="w-24 h-1 bg-white bg-opacity-50 mx-auto mb-6"></div>
        <h3 className="text-lg md:text-xl font-bold text-white mb-4">
          Deep Learning Course Project: "<em className="text-red-500">Wildfire Detection using drone images</em>"
        </h3>
        <p className="text-md md:text-lg text-white mb-2">
          Carried out by: Vijay Kumar B (221AI043) & Tarlana Sahil (221AI040)
        </p>
        <p className="text-sm md:text-md text-white text-opacity-70 mb-10">
          Session January - April 2025
        </p>
        
        {/* Buttons */}
        <div className="flex justify-center space-x-4 mt-8">
          <button 
            className="bg-opacity-10 hover:bg-opacity-20 text-white px-8 py-2 rounded-md border border-white border-opacity-30 hover:border-opacity-50 transition-all"
            onClick={() => setInputOpen(true)}
            disabled={processing}
          >
            {processing ? "Processing..." : "Input"}
          </button>
          <button 
            className="bg-blue-600 bg-opacity-90 hover:bg-opacity-100 text-white px-8 py-2 rounded-md transition-all"
            onClick={() => setOutputOpen(true)}
            // disabled={!results}
          >
            Output
          </button>
        </div>
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