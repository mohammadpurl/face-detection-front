
import React from "react";
import { Check, X } from "lucide-react";

interface CapturedImageProps {
  imageUrl: string | null;
  isBlurry: boolean;
  isFrontal: boolean;
  show: boolean;
}

const CapturedImage: React.FC<CapturedImageProps> = ({ imageUrl, isBlurry, isFrontal, show }) => {
  if (!show || !imageUrl) return null;
  
  return (
    <div className="relative w-full h-full">
      <img
        src={imageUrl}
        alt="Captured face"
        className="w-full h-full object-cover"
      />
      <div className="absolute top-2 right-2 flex gap-1">
        {isBlurry ? (
          <span className="bg-red-500 text-white px-2 py-1 rounded-md text-xs flex items-center">
            <X className="w-4 h-4 mr-1" /> Blurry
          </span>
        ) : (
          <span className="bg-green-500 text-white px-2 py-1 rounded-md text-xs flex items-center">
            <Check className="w-4 h-4 mr-1" /> Clear
          </span>
        )}
        
        {!isFrontal ? (
          <span className="bg-red-500 text-white px-2 py-1 rounded-md text-xs flex items-center">
            <X className="w-4 h-4 mr-1" /> Not frontal
          </span>
        ) : (
          <span className="bg-green-500 text-white px-2 py-1 rounded-md text-xs flex items-center">
            <Check className="w-4 h-4 mr-1" /> Frontal
          </span>
        )}
      </div>
    </div>
  );
};

export default CapturedImage;
