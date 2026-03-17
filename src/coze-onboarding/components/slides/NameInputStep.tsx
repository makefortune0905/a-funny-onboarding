import React, { useState } from 'react';
import type { AgentInfo } from '../../types';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { AgentAvatar } from '../../../components/AgentAvatar';

interface NameInputStepProps {
  userName: string;
  onUserNameChange: (name: string) => void;
  onNext: () => void;
  agentInfo: AgentInfo;
}

export const NameInputStep: React.FC<NameInputStepProps> = ({
  userName,
  onUserNameChange,
  onNext,
  agentInfo,
}) => {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!userName.trim()) {
      setError('请输入你的名字');
      return;
    }
    setError(null);
    onNext();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto space-y-8">
      {/* Agent Avatar */}
      <div className="relative">
        <AgentAvatar
          variant={agentInfo.avatarVariant}
          image={agentInfo.avatarImage}
          size="lg"
        />
        {agentInfo.emoji && (
          <span className="absolute -bottom-2 -right-2 text-4xl">
            {agentInfo.emoji}
          </span>
        )}
      </div>

      {/* Title */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-medium text-[#0C0A09]">
          很高兴认识你
        </h1>
        <p className="text-[#78716C]">
          我是 {agentInfo.name}，你的 AI 伙伴
        </p>
      </div>

      {/* Input */}
      <div className="w-full space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-[#3F3F46]">
            怎么称呼你？
          </label>
          <Input
            type="text"
            placeholder="请输入你的名字"
            value={userName}
            onChange={(e) => {
              onUserNameChange(e.target.value);
              if (error) setError(null);
            }}
            onKeyDown={handleKeyDown}
            className="h-12 text-base"
          />
          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}
        </div>

        <Button
          onClick={handleSubmit}
          className="w-full h-12 bg-[#1C1917] hover:bg-[#1C1917]/90 text-white"
        >
          开始体验
        </Button>
      </div>
    </div>
  );
};

export default NameInputStep;
