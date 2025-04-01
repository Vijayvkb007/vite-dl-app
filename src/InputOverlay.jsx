import React, { useState } from 'react';

const InputOverlay = ({ open, onOpenChange, onProcessImages, processing, error }) => {
  const [rgbImage, setRgbImage] = useState(null);
  const [irImage, setIrImage] = useState(null);
  const [rgbPreview, setRgbPreview] = useState(null);
  const [irPreview, setIrPreview] = useState(null);

  const handleFile = (file, setImage, setPreview) => {
    if (file && file.type.match('image.*')) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e, setImage, setPreview) => {
    e.preventDefault();
    if (e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0], setImage, setPreview);
    }
  };

  const handleChange = (e, setImage, setPreview) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0], setImage, setPreview);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleProcess = () => {
    if (rgbImage && irImage && onProcessImages) {
      onProcessImages(rgbImage, irImage);
    }
    onOpenChange(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Upload Images</h2>
            <button 
              onClick={() => onOpenChange(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* RGB Image Upload */}
            <div className="flex flex-col items-center">
              <h3 className="text-lg font-medium mb-2">RGB Image</h3>
              <div
                className={`w-full h-48 border-2 border-dashed rounded-lg flex flex-col items-center justify-center p-4 ${
                  rgbPreview ? 'border-green-500' : 'border-gray-300 hover:border-blue-500'
                }`}
                onDrop={(e) => handleDrop(e, setRgbImage, setRgbPreview)}
                onDragOver={handleDragOver}
              >
                {rgbPreview ? (
                  <div className="relative w-full h-full">
                    <img
                      src={rgbPreview}
                      alt="RGB Preview"
                      className="w-full h-full object-contain"
                    />
                    <button
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center cursor-pointer"
                      onClick={() => {
                        setRgbImage(null);
                        setRgbPreview(null);
                      }}
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <>
                    <span className="text-4xl mb-2">📷</span>
                    <p className="text-sm text-gray-500 text-center mb-2">
                      Drag & drop RGB image here or
                    </p>
                    <label className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                      Browse Files
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => handleChange(e, setRgbImage, setRgbPreview)}
                      />
                    </label>
                  </>
                )}
              </div>
            </div>

            {/* IR Image Upload */}
            <div className="flex flex-col items-center">
              <h3 className="text-lg font-medium mb-2">IR Image</h3>
              <div
                className={`w-full h-48 border-2 border-dashed rounded-lg flex flex-col items-center justify-center p-4 ${
                  irPreview ? 'border-green-500' : 'border-gray-300 hover:border-blue-500'
                }`}
                onDrop={(e) => handleDrop(e, setIrImage, setIrPreview)}
                onDragOver={handleDragOver}
              >
                {irPreview ? (
                  <div className="relative w-full h-full">
                    <img
                      src={irPreview}
                      alt="IR Preview"
                      className="w-full h-full object-contain"
                    />
                    <button
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                      onClick={() => {
                        setIrImage(null);
                        setIrPreview(null);
                      }}
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <>
                    <span className="text-4xl mb-2">🌡️</span>
                    <p className="text-sm text-gray-500 text-center mb-2">
                      Drag & drop IR image here or
                    </p>
                    <label className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                      Browse Files
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => handleChange(e, setIrImage, setIrPreview)}
                      />
                    </label>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <button
              className={`px-6 py-2 rounded-md text-white ${
                rgbImage && irImage ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'
              }`}
              disabled={!rgbImage || !irImage || processing}
              onClick={handleProcess}
            >
              {processing ? "Processing..." : "Process Images"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputOverlay;
