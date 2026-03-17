import React from 'react';
import type { ThemeConfig } from '../types';

interface OnboardingContainerProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  theme?: ThemeConfig;
}

/**
 * OnboardingContainer - 引导流程容器组件
 * 提供统一的样式和主题上下文
 */
export const OnboardingContainer: React.FC<OnboardingContainerProps> = ({
  children,
  className = '',
  style = {},
  theme,
}) => {
  // 构建 CSS 变量
  const cssVariables = theme
    ? {
        '--coze-primary-color': theme.primaryColor,
        '--coze-background-color': theme.backgroundColor,
        '--coze-text-color': theme.textColor,
        '--coze-border-color': theme.borderColor,
        '--coze-agent-bubble-color': theme.agentBubbleColor,
        '--coze-user-bubble-color': theme.userBubbleColor,
        ...style,
      }
    : style;

  return (
    <div
      className={`
        coze-onboarding
        flex h-full w-full items-center justify-center
        bg-[var(--coze-background-color,#FAFAF9)]
        px-4 lg:px-8 py-6
        font-sans overflow-hidden
        ${className}
      `}
      style={cssVariables}
    >
      {children}
    </div>
  );
};

export default OnboardingContainer;
