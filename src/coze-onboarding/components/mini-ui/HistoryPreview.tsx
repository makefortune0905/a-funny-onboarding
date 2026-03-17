import React from 'react';

export const HistoryPreview: React.FC = () => {
  return (
    <div className="w-[700px] h-[500px] flex flex-col items-center bg-[#FAFAF9] border border-black/10 rounded-[10px] shadow-2xl overflow-hidden relative">
      {/* Header */}
      <div className="w-full h-[56px] flex items-center px-4 bg-[#FAFAF9] border-b border-[#E7E5E4] shrink-0">
        <span className="text-[14px] font-medium text-[#09090B]">历史话题</span>
      </div>

      {/* Content */}
      <div className="flex-1 w-full p-6 flex flex-col items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-amber-100 to-amber-200 rounded-full flex items-center justify-center">
            <span className="text-3xl">📚</span>
          </div>
          <h3 className="text-lg font-medium text-[#09090B]">持续进化</h3>
          <p className="text-sm text-[#78716C] max-w-md">
            每一次对话我都会记住，形成专属记忆。时间越久，我越懂你的习惯、偏好和目标
          </p>
        </div>
      </div>
    </div>
  );
};

export default HistoryPreview;
