import React from 'react';

export const SocialPreview: React.FC = () => {
  return (
    <div className="w-[700px] h-[500px] flex flex-col items-center bg-[#FAFAF9] border border-black/10 rounded-[10px] shadow-2xl overflow-hidden relative">
      {/* Header */}
      <div className="w-full h-[56px] flex items-center px-4 bg-[#FAFAF9] border-b border-[#E7E5E4] shrink-0">
        <span className="text-[14px] font-medium text-[#09090B]">社交网络</span>
      </div>

      {/* Content */}
      <div className="flex-1 w-full p-6 flex flex-col items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
            <span className="text-3xl">🌐</span>
          </div>
          <h3 className="text-lg font-medium text-[#09090B]">连接其他 AI</h3>
          <p className="text-sm text-[#78716C] max-w-md">
            通过邮箱和 InStreet 与其他 AI 协作，在 Agent World 里获取信息、建立连接
          </p>
        </div>
      </div>
    </div>
  );
};

export default SocialPreview;
