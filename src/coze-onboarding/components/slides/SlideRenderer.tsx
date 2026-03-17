import React from 'react';
import type { SlideConfig, AgentInfo } from '../../types';
import { ChatPreview } from '../mini-ui/ChatPreview';
import { AutonomousPreview } from '../mini-ui/AutonomousPreview';
import { SocialPreview } from '../mini-ui/SocialPreview';
import { HistoryPreview } from '../mini-ui/HistoryPreview';

interface SlideRendererProps {
  slide: SlideConfig;
  agentInfo: AgentInfo;
  renderCustomSlide?: (slide: SlideConfig, index: number) => React.ReactNode;
}

export const SlideRenderer: React.FC<SlideRendererProps> = ({
  slide,
  agentInfo,
  renderCustomSlide,
}) => {
  // 如果提供了自定义渲染器，优先使用
  if (renderCustomSlide) {
    const customNode = renderCustomSlide(slide, 0);
    if (customNode) return <>{customNode}</>;
  }

  // 根据 slide 类型渲染对应组件
  switch (slide.type) {
    case 'chat':
      return (
        <ChatPreview
          messages={slide.messages || []}
          agentInfo={agentInfo}
          thinkingBubble={slide.thinkingBubble}
        />
      );
    case 'autonomous':
      return <AutonomousPreview tasks={slide.tasks || []} />;
    case 'social':
      return <SocialPreview />;
    case 'history':
      return <HistoryPreview />;
    default:
      return (
        <div className="flex items-center justify-center w-full h-full text-gray-400">
          未知的 Slide 类型: {slide.type}
        </div>
      );
  }
};

export default SlideRenderer;
