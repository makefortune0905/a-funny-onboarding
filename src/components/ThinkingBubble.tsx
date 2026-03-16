import React from 'react';

interface ThinkingBubbleProps {
  referenceTitle?: string;
  customHeader?: React.ReactNode;
  content?: React.ReactNode;
  className?: string;
  isExiting?: boolean;
}

export const ThinkingBubble: React.FC<ThinkingBubbleProps> = ({
  referenceTitle,
  customHeader,
  content = "我是扣子虾，我理性可靠，是你并肩创作的合伙人...",
  className = "",
  isExiting = false
}) => {
  return (
    <div 
      className={`absolute left-[48px] -top-[90px] z-20 origin-bottom-left ${
        isExiting 
          ? 'bubble-fade-out' 
          : 'bubble-fade-in'
      } ${className}`}
    >
      <div className="px-4 py-3 relative bg-white rounded-2xl shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.03)] shadow-[0px_4px_22px_-3px_rgba(0,0,0,0.10)] outline outline-[0.50px] outline-black/10 flex flex-col justify-center items-start gap-0.5 min-w-[320px] max-w-[400px]">
        {customHeader ? (
          <div className="justify-start text-[#A1A1AA] text-base font-medium font-['PingFang_SC'] leading-6 text-left whitespace-nowrap">
            {customHeader}
          </div>
        ) : referenceTitle ? (
          <div className="inline-flex justify-start items-center gap-1 whitespace-nowrap">
            <div className="justify-start text-[#A1A1AA] text-base font-medium font-['PingFang_SC'] leading-6">| 参考</div>
            <div className="justify-start text-[#A1A1AA] text-base font-medium font-['PingFang_SC'] leading-6">{referenceTitle}</div>
          </div>
        ) : null}
        
        <div className="justify-start text-[#09090B] text-base font-medium font-['PingFang_SC'] leading-6 text-left whitespace-normal w-full">
          {content}
        </div>
        
        {/* Tail dots - positioned relative to the bubble */}
        <div className="w-3 h-3 left-[-6px] bottom-[20px] absolute bg-white rounded-full outline outline-[0.50px] outline-black/10"></div>
        <div className="w-2 h-2 left-[-12px] bottom-[6px] absolute bg-white rounded-full outline outline-[0.50px] outline-black/10"></div>
      </div>
    </div>
  );
};
