
import React from "react";
import { Progress } from "@/components/ui/progress";

interface QualityIndicatorsProps {
  blurScore: number;
  frontalConfidence: number;
  show: boolean;
}

const QualityIndicators: React.FC<QualityIndicatorsProps> = ({ 
  blurScore, 
  frontalConfidence,
  show
}) => {
  if (!show) return null;
  
  return (
    <div className="mt-4 space-y-3">
      <div className="space-y-1">
        <div className="flex justify-between text-sm">
          <span>Sharpness</span>
          <span>{Math.round(blurScore)}%</span>
        </div>
        <Progress value={blurScore} className="h-2" />
      </div>
      
      <div className="space-y-1">
        <div className="flex justify-between text-sm">
          <span>Face position</span>
          <span>{Math.round(frontalConfidence)}%</span>
        </div>
        <Progress value={frontalConfidence} className="h-2" />
      </div>
    </div>
  );
};

export default QualityIndicators;
