import React from 'react';
import type { ChatPreviewProps } from '../../types';

export const ChatPreview: React.FC<ChatPreviewProps> = ({
  messages,
  agentInfo,
  userAvatar,
  thinkingBubble,
}) => {
  return (
    <div className="w-[700px] h-[500px] flex flex-col items-center bg-[#FAFAF9] border border-black/10 rounded-[10px] shadow-2xl overflow-hidden relative">
      {/* Header */}
      <div className="w-full h-[56px] flex items-center px-4 bg-[#FAFAF9] border-b border-[#E7E5E4] shrink-0">
        <div className="flex items-center gap-[6px]">
          <span className="text-[14px] font-medium text-[#09090B]">
            {agentInfo.name}
          </span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 w-full flex flex-col items-center overflow-y-auto py-3">
        <div className="w-full flex flex-col items-center gap-[10px] py-[12px]">
          {messages.map((msg, idx) => (
            <div
              key={msg.id}
              className="w-[680px] min-h-[92px] p-[12px_24px] rounded-[10px] flex flex-col gap-[10px] hover:bg-[#F5F5F4]/50 transition-colors"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              <div className="flex items-start gap-2.5">
                <div className="w-[40px] h-[40px] shrink-0 relative">
                  <div className="absolute inset-0 rounded-full border border-black/5 bg-gradient-to-br from-[#F4F4EF] to-[#B5D8DC]" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-80">
                    {msg.sender === 'agent' ? (
                      <span className="text-[18px]">{agentInfo.emoji || '🤖'}</span>
                    ) : (
                      <img
                        src={userAvatar || '/src/assets/UserAvatar.png'}
                        alt="User"
                        className="w-full h-full object-cover rounded-full"
                      />
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-start gap-1 flex-1">
                  <div className="flex items-center gap-1.5 h-4">
                    <span className="text-xs font-medium text-[#3F3F46]">
                      {msg.sender === 'agent' ? agentInfo.name : '用户'}
                    </span>
                    <span className="text-xs text-[#A1A1AA] font-mono">
                      {msg.timestamp}
                    </span>
                  </div>
                  <div className="flex items-center w-full">
                    <p className="text-base leading-6 text-[#09090B]">
                      {msg.content}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Thinking Bubble */}
      {thinkingBubble && (
        <div className="absolute bottom-[12px] left-1/2 -translate-x-1/2 z-20 flex items-center gap-1 px-[10px] py-0 h-[28px] bg-white border border-[#E7E5E4] rounded-[10px] shadow-md">
          <span className="text-[12px] font-medium text-[#3F3F46]">
            {thinkingBubble.content}
          </span>
        </div>
      )}
    </div>
  );
};

export default ChatPreview;
