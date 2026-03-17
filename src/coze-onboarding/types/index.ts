import type { ReactNode, ComponentType } from 'react';

// 流程状态
export type OnboardingStep = 'name' | 'slides';
export type OnboardingMode = 'new' | 'returning';

// 用户信息
export interface UserInfo {
  name: string;
  displayName: string;
}

// Agent 信息
export interface AgentInfo {
  name: string;
  avatarVariant: 'shrimp' | 'generic';
  avatarImage?: string | null;
  emoji?: string;
}

// Slide 类型
export type SlideType = 'chat' | 'autonomous' | 'social' | 'history';

// Slide 配置
export interface SlideConfig {
  id: string;
  type: SlideType;
  title: string;
  description: string;
  // Chat 类型特有
  messages?: ChatMessage[];
  thinkingBubble?: ThinkingBubbleConfig;
  // Autonomous 类型特有
  tasks?: BackgroundTask[];
  // 自定义渲染
  customRenderer?: () => ReactNode;
}

// 聊天消息
export interface ChatMessage {
  id: string;
  sender: 'agent' | 'user';
  content: string;
  timestamp?: string;
  avatar?: string;
  showThinkingBubble?: boolean;
}

// Thinking Bubble 配置
export interface ThinkingBubbleConfig {
  id: string;
  content: string;
  position?: 'left' | 'right';
}

// 背景任务
export interface BackgroundTask {
  id: string;
  title: string;
  icon: ComponentType<{ className?: string }>;
  progress: number;
  color: string;
  status?: 'normal' | 'exiting' | 'entering';
}

// 轮播指示器
export interface CarouselDot {
  index: number;
  isActive: boolean;
}

// 组件对外 Props
export interface CozeOnboardingProps {
  // 回调
  onComplete: () => void;
  onStepChange?: (step: OnboardingStep) => void;
  onSlideChange?: (index: number, slide: SlideConfig) => void;
  
  // Agent 配置
  agentInfo?: Partial<AgentInfo>;
  
  // 用户配置
  initialUserName?: string;
  
  // 内容配置
  slides?: SlideConfig[];
  mode?: OnboardingMode;
  
  // 样式配置
  className?: string;
  style?: React.CSSProperties;
  
  // 自定义渲染
  renderCustomSlide?: (slide: SlideConfig, index: number) => ReactNode;
  renderHeader?: (userInfo: UserInfo, mode: OnboardingMode) => ReactNode;
  renderFooter?: (onComplete: () => void) => ReactNode;
  
  // 配置选项
  options?: OnboardingOptions;
}

// 配置选项
export interface OnboardingOptions {
  // 动画
  enableAnimation?: boolean;
  animationDuration?: number;
  
  // 自动播放
  autoPlay?: boolean;
  autoPlayInterval?: number;
  
  // 导航
  showNavigation?: boolean;
  showDots?: boolean;
  allowSwipe?: boolean;
  
  // 响应式
  responsive?: ResponsiveConfig;
  
  // 主题
  theme?: ThemeConfig;
}

// 响应式配置
export interface ResponsiveConfig {
  breakpoints?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    '2xl'?: number;
  };
  scales?: {
    default?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    '2xl'?: number;
  };
}

// 主题配置
export interface ThemeConfig {
  primaryColor?: string;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  agentBubbleColor?: string;
  userBubbleColor?: string;
}

// Hook 返回类型
export interface UseOnboardingFlowReturn {
  // 状态
  step: OnboardingStep;
  mode: OnboardingMode;
  currentSlideIndex: number;
  userInfo: UserInfo;
  
  // 方法
  setStep: (step: OnboardingStep) => void;
  setMode: (mode: OnboardingMode) => void;
  setUserName: (name: string) => void;
  goToSlide: (index: number) => void;
  nextSlide: () => void;
  prevSlide: () => void;
  complete: () => void;
  
  // 计算属性
  currentSlide: SlideConfig | null;
  totalSlides: number;
  isFirstSlide: boolean;
  isLastSlide: boolean;
}

// Mini UI 组件 Props
export interface MiniUiBaseProps {
  className?: string;
  style?: React.CSSProperties;
}

// Chat Preview Props
export interface ChatPreviewProps extends MiniUiBaseProps {
  messages: ChatMessage[];
  agentInfo: AgentInfo;
  userAvatar?: string;
  thinkingBubble?: ThinkingBubbleConfig;
  onMessageHover?: (messageId: string | null) => void;
}

// Task Panel Props
export interface TaskPanelProps extends MiniUiBaseProps {
  tasks: BackgroundTask[];
  completedCount: number;
  isOpen: boolean;
  onToggle: () => void;
  onTaskComplete?: (taskId: string) => void;
}
