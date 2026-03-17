// 主组件
export { CozeOnboarding } from './components/CozeOnboarding';
export { default as CozeOnboardingDefault } from './components/CozeOnboarding';

// 容器组件
export { OnboardingContainer } from './components/OnboardingContainer';

// 步骤组件
export { NameInputStep } from './components/slides/NameInputStep';
export { SlidesStep } from './components/slides/SlidesStep';
export { SlideRenderer } from './components/slides/SlideRenderer';

// Mini UI 组件
export { ChatPreview } from './components/mini-ui/ChatPreview';
export { AutonomousPreview } from './components/mini-ui/AutonomousPreview';
export { SocialPreview } from './components/mini-ui/SocialPreview';
export { HistoryPreview } from './components/mini-ui/HistoryPreview';

// Hooks
export { useOnboardingFlow } from './hooks/useOnboardingFlow';
export { useBackgroundTasks } from './hooks/useBackgroundTasks';

// 类型
export type {
  OnboardingStep,
  OnboardingMode,
  UserInfo,
  AgentInfo,
  SlideType,
  SlideConfig,
  ChatMessage,
  ThinkingBubbleConfig,
  BackgroundTask,
  CarouselDot,
  CozeOnboardingProps,
  OnboardingOptions,
  ResponsiveConfig,
  ThemeConfig,
  UseOnboardingFlowReturn,
  MiniUiBaseProps,
  ChatPreviewProps,
  TaskPanelProps,
} from './types';

// 默认配置
export {
  DEFAULT_AGENT_INFO,
  DEFAULT_USER_NAME,
  DEFAULT_OPTIONS,
  DEFAULT_RESPONSIVE_CONFIG,
  DEFAULT_THEME_CONFIG,
  DEFAULT_BACKGROUND_TASKS,
  TASK_POOL,
  DEFAULT_NEW_USER_SLIDES,
  DEFAULT_RETURNING_USER_SLIDES,
  getDefaultSlides,
} from './config/defaults';

// 默认导出
export { default } from './components/CozeOnboarding';
