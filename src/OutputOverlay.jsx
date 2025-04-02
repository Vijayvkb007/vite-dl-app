import React, { useState } from 'react';

const OutputOverlay = ({ 
  open, 
  onOpenChange,
  response,
  images
}) => {
  if (!open) return null;
  let message = null;
  let output = null;
  let inputImages = null;

  try {
    message = response.message;
    output = response.data["prediction"];
    inputImages = images;
  } 
  catch (err) {
    console.log(err);
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-center">Wildfire Detection Results</h2>
            <button 
              onClick={() => onOpenChange(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          {response ? (
          <div>
            <div>
              <div className="bg-gray-100 rounded-lg p-4 mb-6">
                <h2 className="text-lg font-medium">{message}!</h2>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-100 rounded-lg p-4">
                <h3 className="text-lg font-medium mb-3 text-center">Input Images</h3>
                <div className="flex justify-around">
                <div className="flex flex-col items-center">
                    <img 
                      key='1'
                      src={inputImages.rgbPreview} 
                      alt={`RGB Image`} 
                      className="rounded-md object-contain mx-4 shadow-neutral-600"
                    />
                    <p className="text-center">{`RGB Image`}</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <img 
                      key='2'
                      src={inputImages.irPreview} 
                      alt={`IR Image`} 
                      className="rounded-md object-contain mx-4 shadow-neutral-600"
                    />
                    <p className="text-center">{`IR Image`}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-100 rounded-lg p-4">
                <h3 className="text-lg font-medium mb-3 text-center">Model's Detection</h3>
                <div className="flex justify-center gap-10">
                  <div className="bg-gray-100 rounded-md p-4 shadow">
                    <h4 className="font-bold text-lg">Fire Detected</h4>
                    <p className="text-blue-600 font-semibold mt-2 text-center">{output['fire_detected']}</p>
                  </div>
                  <div className="bg-gray-100 rounded-md p-4 shadow">
                    <h4 className="font-bold text-lg">Smoke Detected</h4>
                    <p className="text-blue-600 font-semibold mt-2 text-center">{output['smoke_detected']}</p>
                  </div>

                </div>
              </div>
            </div>
          </div>
          )
          :
          (<p>No results available! Possible errors: Error on server side.</p>)}
        </div>
      </div>
    </div>
  );
};

export default OutputOverlay;