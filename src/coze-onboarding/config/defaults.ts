import type {
  AgentInfo,
  SlideConfig,
  OnboardingOptions,
  ResponsiveConfig,
  ThemeConfig,
  BackgroundTask,
} from '../types';
import {
  FileText,
  Files,
  FileImage,
  FileCode2,
  Activity,
  CalendarClock,
  FileSpreadsheet,
} from 'lucide-react';

// 默认 Agent 信息
export const DEFAULT_AGENT_INFO: AgentInfo = {
  name: '扣子虾',
  avatarVariant: 'shrimp',
  avatarImage: null,
  emoji: '🦐',
};

// 默认用户名
export const DEFAULT_USER_NAME = '李明';

// 默认响应式配置
export const DEFAULT_RESPONSIVE_CONFIG: ResponsiveConfig = {
  breakpoints: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
  },
  scales: {
    default: 0.5,
    sm: 0.65,
    md: 0.75,
    lg: 0.85,
    xl: 0.9,
    '2xl': 1,
  },
};

// 默认主题配置
export const DEFAULT_THEME_CONFIG: ThemeConfig = {
  primaryColor: '#1C1917',
  backgroundColor: '#FAFAF9',
  textColor: '#09090B',
  borderColor: '#E7E5E4',
  agentBubbleColor: '#F5F5F4',
  userBubbleColor: '#FFFFFF',
};

// 默认选项
export const DEFAULT_OPTIONS: OnboardingOptions = {
  enableAnimation: true,
  animationDuration: 300,
  autoPlay: false,
  autoPlayInterval: 5000,
  showNavigation: true,
  showDots: true,
  allowSwipe: true,
  responsive: DEFAULT_RESPONSIVE_CONFIG,
  theme: DEFAULT_THEME_CONFIG,
};

// 默认背景任务
export const DEFAULT_BACKGROUND_TASKS: BackgroundTask[] = [
  {
    id: 't1',
    title: '账号定位和内容策略拆解',
    icon: FileText,
    progress: 65,
    color: '#F4F4EF',
    status: 'normal',
  },
  {
    id: 't2',
    title: '竞品样本池与数据分析',
    icon: Files,
    progress: 40,
    color: '#F8F5F2',
    status: 'normal',
  },
  {
    id: 't3',
    title: '首批选题与封面风格产出',
    icon: FileImage,
    progress: 20,
    color: '#F2F5F2',
    status: 'normal',
  },
];

// 任务池（用于随机生成新任务）
export const TASK_POOL = [
  { title: '视频脚本自动生成', icon: FileCode2, color: '#F0F9FF' },
  { title: '评论区自动回复配置', icon: Activity, color: '#F0FDF4' },
  { title: '粉丝数据周报生成', icon: FileSpreadsheet, color: '#FEF2F2' },
  { title: '热门话题实时监控', icon: CalendarClock, color: '#FFF7ED' },
];

// 新用户默认 Slides
export const DEFAULT_NEW_USER_SLIDES: SlideConfig[] = [
  {
    id: 'new-slide-1',
    type: 'chat',
    title: '像朋友一样一直聊',
    description:
      '不是那种问一句答一句的工具。我会记住你、懂你、主动帮你做事——就像你的第二大脑，随时在线。',
    messages: [
      {
        id: 'msg-1',
        sender: 'agent',
        content: '你好 新朋友！以后我就是你的伙伴啦，能说说你最近主要在忙什么吗？',
        timestamp: '10:35',
        showThinkingBubble: false,
      },
      {
        id: 'msg-2',
        sender: 'user',
        content:
          '你好扣子虾，我在一家SaaS初创公司做市场，最近在策划季度活动冲KPI，主要是要面向中小企业拉新',
        timestamp: '10:35',
      },
      {
        id: 'msg-3',
        sender: 'agent',
        content:
          '新季度刚开始，开个好头就能轻松不少。你们的产品是做哪个方向的？目标客群大概是什么规模的企业？',
        timestamp: '10:36',
      },
      {
        id: 'msg-4',
        sender: 'user',
        content: 'HR SaaS，主要服务100人以下的小企业，决策人一般是老板或者HR负责人',
        timestamp: '10:36',
      },
    ],
    thinkingBubble: {
      id: 'thinking-1',
      content: '让我搜索补充一些背景知识...',
      position: 'left',
    },
  },
  {
    id: 'new-slide-2',
    type: 'autonomous',
    title: '主动为你工作',
    description:
      '不只是回答问题，我会主动分析、规划、执行。设定目标后，我能自主完成从调研到落地的全流程。',
    tasks: DEFAULT_BACKGROUND_TASKS,
  },
  {
    id: 'new-slide-3',
    type: 'social',
    title: '拥有自己的社交网络',
    description:
      '我会使用邮箱、InStreet 与其他 AI 协作，在 Agent World 里获取信息、建立连接，让能力不断扩展。',
  },
  {
    id: 'new-slide-4',
    type: 'history',
    title: '持续进化，越用越懂',
    description:
      '每一次对话我都会记住，形成专属记忆。时间越久，我越懂你的习惯、偏好和目标。',
  },
];

// 老用户默认 Slides
export const DEFAULT_RETURNING_USER_SLIDES: SlideConfig[] = [
  {
    id: 'returning-slide-1',
    type: 'chat',
    title: '欢迎回来',
    description: '看看这段时间我为你做了哪些准备',
    messages: [
      {
        id: 'msg-1',
        sender: 'agent',
        content: '欢迎回来！我已经整理好了你离开期间的待办事项。',
        timestamp: '10:00',
      },
    ],
  },
];

// 默认 Slides（根据模式选择）
export const getDefaultSlides = (mode: 'new' | 'returning'): SlideConfig[] => {
  return mode === 'new'
    ? DEFAULT_NEW_USER_SLIDES
    : DEFAULT_RETURNING_USER_SLIDES;
};
