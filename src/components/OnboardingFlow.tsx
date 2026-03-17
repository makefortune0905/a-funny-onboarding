import React, { useState, useEffect, useMemo, useRef } from 'react';
import { MiniUiAutonomous } from './MiniUiAutonomous';
import { MiniUiSocial } from './MiniUiSocial';
import { MiniUiHistory } from './MiniUiHistory';
import { ThinkingBubble } from './ThinkingBubble';
import { 
  ChevronLeft, 
  ChevronRight, 
  LoaderCircle, 
  CalendarClock, 
  Files, 
  Activity, 
  FileText, 
  FileSpreadsheet, 
  FileCode2, 
  FileImage,
  ArrowRight,
  Check
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { AgentAvatar } from './AgentAvatar';
import { NEW_USER_ONBOARDING_SLIDES, RETURNING_USER_ONBOARDING_SLIDES } from '../constants';
import UserAvatar from '../assets/UserAvatar.png';

interface OnboardingFlowProps {
  onComplete: () => void;
  agentName?: string;
  agentAvatarVariant?: 'shrimp' | 'generic';
  agentAvatarImage?: string | null;
  initialUserName?: string;
}

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({
  onComplete,
  agentName = '扣子虾',
  agentAvatarVariant = 'shrimp',
  agentAvatarImage = null,
  initialUserName = '李明',
}) => {
  const [onboardingUiStep, setOnboardingUiStep] = useState<'name' | 'slides'>('name');
  const [onboardingMode, setOnboardingMode] = useState<'new' | 'returning'>('new');
  const [onboardingDraftName, setOnboardingDraftName] = useState('');
  const [onboardingFeatureIndex, setOnboardingFeatureIndex] = useState(0);
  const [onboardingPreviewSelectedId, setOnboardingPreviewSelectedId] = useState<string>('ob-msg-4');
  const [userName, setUserName] = useState(initialUserName);
  const [nameError, setNameError] = useState<string | null>(null);
  
  // Animation state for Thinking Bubble
  const [activeBubbleId, setActiveBubbleId] = useState<string | null>(null);
  const [renderedBubbleId, setRenderedBubbleId] = useState<string | null>(null);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [visibleMsgCount, setVisibleMsgCount] = useState(0);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTo({
        top: chatScrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [visibleMsgCount]);

  // Background Tasks State for Slide 1
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [bgTasks, setBgTasks] = useState([
    { id: 't1', title: '账号定位和内容策略拆解', icon: FileText, progress: 65, color: '#F4F4EF', status: 'normal' },
    { id: 't2', title: '竞品样本池与数据分析', icon: Files, progress: 40, color: '#F8F5F2', status: 'normal' },
    { id: 't3', title: '首批选题与封面风格产出', icon: FileImage, progress: 20, color: '#F2F5F2', status: 'normal' },
  ]);
  const [completedTaskCount, setCompletedTaskCount] = useState(0);

  // Fake Task Pool
  const taskPool = useMemo(() => [
    { title: '视频脚本自动生成', icon: FileCode2, color: '#F0F9FF' },
    { title: '评论区自动回复配置', icon: Activity, color: '#F0FDF4' },
    { title: '粉丝数据周报生成', icon: FileSpreadsheet, color: '#FEF2F2' },
    { title: '热门话题实时监控', icon: CalendarClock, color: '#FFF7ED' },
  ], []);

  // Manage transition between activeBubbleId and renderedBubbleId
  useEffect(() => {
    if (activeBubbleId) {
      // New bubble becomes active: show it immediately
      setRenderedBubbleId(activeBubbleId);
      setIsFadingOut(false);
    } else {
      // Bubble becomes inactive: start fade out
      if (renderedBubbleId) {
        setIsFadingOut(true);
        const timer = setTimeout(() => {
          setRenderedBubbleId(null);
          setIsFadingOut(false);
        }, 300); // Match animation duration
        return () => clearTimeout(timer);
      }
    }
  }, [activeBubbleId, renderedBubbleId]);

  // Background Task Animation Loop refined
  useEffect(() => {
    if (onboardingFeatureIndex !== 1 || !isPopoverOpen) return;

    // Use a ref to track if we're currently processing a transition to prevent overlaps
    let isProcessing = false;

    // Trigger animations sequentially for initial tasks
    const sequenceTimer = setTimeout(() => {
       setBgTasks(prev => {
         const newTasks = [...prev];
         if (newTasks.length > 0) newTasks[0].progress = 100; // Complete first task
         return newTasks;
       });
    }, 500);

    const timer = setInterval(() => {
      if (isProcessing) return;
      isProcessing = true;

      setBgTasks(prev => {
        const newTasks = [...prev];
        // Find the first task that is not exiting
        const firstActiveIdx = newTasks.findIndex(t => t.status !== 'exiting');
        
        if (firstActiveIdx === -1) {
           isProcessing = false;
           return prev;
        }

        const currentTask = newTasks[firstActiveIdx];

        // If it's already 100%, mark it as exiting to remove it
        if (currentTask.progress >= 100) {
           newTasks[firstActiveIdx] = { ...currentTask, status: 'exiting' };
           // Start the next task immediately
           if (firstActiveIdx + 1 < newTasks.length) {
              // Give it a random progress to start with, or animate it from its initial state?
              // Let's just bump it to 100% in the NEXT cycle to keep it smooth? 
              // Or bump it now? User said "第n个实例在有进度的时候，第N+1个也可以有"
              // So we should let the next one progress naturally.
              // For simplicity in this loop: when one finishes, we start filling the next one.
              // But wait, the next ones already have initial progress (40%, 20%).
              // So we just need to animate the current one to 100% if it's not, then exit it.
           }
        } else {
           // It's not 100% yet, so fill it to 100%
           newTasks[firstActiveIdx] = { ...currentTask, progress: 100 };
           // We only updated progress, we didn't start exit animation yet.
           // So we should NOT trigger the removal timeout below.
           // We'll let the next interval tick handle the exit.
           isProcessing = false; 
           return newTasks;
        }
        
        return newTasks;
      });

      // If we marked something as exiting, schedule its removal
      setTimeout(() => {
        setBgTasks(prev => {
          // Check if we have any exiting tasks to cleanup
          if (!prev.some(t => t.status === 'exiting')) {
             return prev;
          }

          const remaining = prev.filter(t => t.status !== 'exiting');
          
          // Add new task
          const nextTask = taskPool[Math.floor(Math.random() * taskPool.length)];

          return [...remaining, {
             id: `task-${Date.now()}`,
             title: nextTask.title,
             icon: nextTask.icon,
             color: nextTask.color,
             progress: 0,
             status: 'entering'
          }];
        });
        // We only reset isProcessing if we actually removed something
        // But wait, if we returned early above (no exiting tasks), isProcessing is still true from line 106?
        // Ah, if we updated progress (else block above), we set isProcessing = false.
        // If we marked exiting (if block above), isProcessing remains true, so we need to reset it here.
        
        // Actually, we need to be careful. The timeout runs unconditionally.
        // We should check inside the timeout if we need to reset isProcessing.
        
        setCompletedTaskCount(c => c + 1);
        isProcessing = false;
      }, 500);

    }, 1500); // Faster check

    return () => {
      clearInterval(timer);
      clearTimeout(sequenceTimer);
    };
  }, [onboardingFeatureIndex, isPopoverOpen, taskPool]);

  // Open popover when entering slide 1
  useEffect(() => {
    if (onboardingFeatureIndex === 1) {
      setIsPopoverOpen(true);
    } else {
      setIsPopoverOpen(false);
      // Reset tasks when leaving
      setBgTasks([
        { id: 't1', title: '账号定位和内容策略拆解', icon: FileText, progress: 65, color: '#F4F4EF', status: 'normal' },
        { id: 't2', title: '竞品样本池与数据分析', icon: Files, progress: 40, color: '#F8F5F2', status: 'normal' },
        { id: 't3', title: '首批选题与封面风格产出', icon: FileImage, progress: 20, color: '#F2F5F2', status: 'normal' },
      ]);
      setCompletedTaskCount(0);
    }
  }, [onboardingFeatureIndex]);

  const onboardingSlides = onboardingMode === 'returning' ? RETURNING_USER_ONBOARDING_SLIDES : NEW_USER_ONBOARDING_SLIDES;
  const canGoPrev = onboardingFeatureIndex > 0;
  const canGoNext = onboardingFeatureIndex < onboardingSlides.length - 1;

  const validateName = (name: string) => {
    if (name.includes('习大大')) {
      return '名称不合规，请修改';
    }
    return null;
  };

  const handleOnboardingNameSubmit = (name: string) => {
    const error = validateName(name);
    if (error) {
      setNameError(error);
      return;
    }
    setNameError(null);
    setUserName(name);
    setOnboardingFeatureIndex(0);
    setOnboardingUiStep('slides');
  };

  const handleOnboardingSkip = () => {
    setUserName('新朋友');
    setOnboardingFeatureIndex(0);
    setOnboardingUiStep('slides');
  };

  const activeSlide = onboardingSlides[onboardingFeatureIndex];
  const onboardingDisplayName = (onboardingDraftName.trim() || (onboardingMode === 'returning' ? userName : '') || '新朋友').trim();

  // Shared preview messages for index 0 and 1
  const clawName = '扣子虾';
  const rawPreviewMessages = [
    {
      id: 'ob-msg-1',
      sender: 'agent' as const,
      name: clawName,
      time: '10:35',
      text: `你好 ${onboardingDisplayName}！以后我就是你的伙伴啦，能说说你最近主要在忙什么吗？`,
      bubbleReference: "Soul.md",
      bubbleContent: "我是扣子虾，我理性可靠，是你并肩创作的合伙人...",
    },
    {
      id: 'ob-msg-2',
      sender: 'user' as const,
      name: onboardingDisplayName,
      time: '10:35',
      text: `你好${clawName}，我在一家SaaS初创公司做市场，最近在策划季度活动冲KPI，主要是要面向中小企业拉新`,
    },
    {
      id: 'ob-msg-3',
      sender: 'agent' as const,
      name: clawName,
      time: '10:36',
      text: '新季度刚开始，开个好头就能轻松不少。你们的产品是做哪个方向的？目标客群大概是什么规模的企业？',
      bubbleReference: "Memory.md",
      bubbleContent: "回答你最好是先结论后展开，格式遵循“问题-建议-行动”...",
    },
    {
      id: 'ob-msg-4',
      sender: 'user' as const,
      name: onboardingDisplayName,
      time: '10:36',
      text: 'HR SaaS，主要服务100人以下的小企业，决策人一般是老板或者HR负责人',
    },
    {
      id: 'ob-msg-5',
      sender: 'agent' as const,
      name: clawName,
      time: '10:36',
      text: '让我搜索补充一些背景知识...',
      bubbleReference: "Search.md",
      bubbleContent: "正在分析 HR SaaS 行业的中小企业痛点...",
    },
    {
      id: 'ob-msg-6',
      sender: 'agent' as const,
      name: clawName,
      time: '10:37',
      text: `HR SaaS竞争好激烈啊，小企业主要是关心一些基础功能和性价比？好有意思，希望可以跟你一起努力！你这次活动的核心指标是什么——注册量、留资，还是直接签约？`,
      bubbleReference: "Analysis.md",
      bubbleContent: "根据搜索结果，性价比和基础功能确实是关键...",
    },
    {
      id: 'ob-msg-7',
      sender: 'user' as const,
      name: onboardingDisplayName,
      time: '10:37',
      text: '主要看留资，能约到demo就算成功，而且活动预算也不多，大概就十几万',
    },
    {
      id: 'ob-msg-8',
      sender: 'agent' as const,
      name: clawName,
      time: '10:37',
      text: `这么少的预算，${onboardingDisplayName}你好厉害啊！有什么我可以帮你的吗？之前有没有跑过效果比较好的活动或内容形式？`,
      bubbleReference: "Strategy.md",
      bubbleContent: "基于预算限制，建议侧重于高转化率的精准投放...",
    },
    {
      id: 'ob-msg-9',
      sender: 'user' as const,
      name: onboardingDisplayName,
      time: '10:38',
      text: '案例类内容还行，小红书和公众号都试过，转化比干货类好，但持续做太累了',
    },
    {
      id: 'ob-msg-10',
      sender: 'agent' as const,
      name: clawName,
      time: '10:38',
      text: '所以瓶颈不是方向，是执行——内容知道怎么做，就是没人手。团队里其他同事负责什么呀？',
      bubbleReference: "Resource.md",
      bubbleContent: "检测到团队配置不足，正在调取自动化执行方案...",
    },
    {
      id: 'ob-msg-11',
      sender: 'user' as const,
      name: onboardingDisplayName,
      time: '10:38',
      text: '公司刚开始，市场就我一个',
    },
    {
      id: 'ob-msg-12',
      sender: 'agent' as const,
      name: clawName,
      time: '10:39',
      text: '收到。那以后给你的方案都是1个人跑得动的，不整虚的！既然持续做案例内容有效但耗精力，我每天定时帮你整理一批高潜力的案例方向？可以先跑一批，你品品？',
      bubbleReference: "Plan.md",
      bubbleContent: "已生成每日案例整理工作流，准备执行...",
    },
    {
      id: 'ob-msg-13',
      sender: 'user' as const,
      name: onboardingDisplayName,
      time: '10:39',
      text: '可以，那你试试',
    },
    {
      id: 'ob-msg-14',
      sender: 'agent' as const,
      name: clawName,
      time: '10:39',
      text: '扣子虾正在搜集案例内容...',
      bubbleReference: "Action.md",
      bubbleContent: "正在执行搜集指令...",
    },
  ];

  const previewMessages = useMemo(() => rawPreviewMessages, [onboardingDisplayName]);

  // Dynamic background for the left preview container
  const getPreviewContainerBackground = () => {
    if (onboardingFeatureIndex === 1) {
      // Green gradient for the "Complex tasks" slide
      return 'bg-ivory-yellow-2';
    }
    return 'bg-ivory-yellow-2';
  };

  useEffect(() => {
    // Handle cleanup when leaving supported slides (0 and 5)
    const isSlide0 = onboardingFeatureIndex === 0;
    const isSlide5 = onboardingMode === 'returning' && onboardingFeatureIndex === 5;
    
    if (!isSlide0 && !isSlide5) {
      setActiveBubbleId(null);
      setRenderedBubbleId(null);
      return;
    }
    
    // Slide 0 Logic - only auto-scroll messages, no auto bubble
    if (isSlide0) {
      setVisibleMsgCount(0);
      const interval = setInterval(() => {
        setVisibleMsgCount(prev => {
          if (prev >= previewMessages.length) {
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, 1200); // Changed from 600ms to 1200ms
      return () => clearInterval(interval);
    }

    // Slide 5 Logic (Returning User)
    if (isSlide5) {
       // No auto bubble, only show on hover
       setActiveBubbleId(null);
       setRenderedBubbleId(null);
    }
  }, [onboardingFeatureIndex, previewMessages, onboardingMode]);

  const renderOnboardingSlidePreview = () => {
    if (onboardingFeatureIndex === 0) {
      return (
        <div className="w-[700px] h-[500px] flex flex-col items-center bg-[#FAFAF9] border border-black/10 rounded-[10px] shadow-2xl overflow-hidden relative ring-[0.5px] ring-[var(--alpha-black-90)]">
          {/* Window Header */}
          <div className="w-[700px] h-[56px] flex items-center px-4 bg-[#FAFAF9] border-b border-[#E7E5E4] shrink-0">
             <div className="flex items-center gap-[6px]">
               <span className="text-[14px] font-medium text-[#09090B] leading-[20px] shrink-0">扣子虾</span>
             </div>
          </div>

          {/* Chat Content */}
          <div 
            ref={chatScrollRef}
            className="flex-1 w-full flex flex-col items-center overflow-y-auto py-0 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent"
            onScroll={() => {
              // Handle scroll to show thinking bubble for visible agent messages
              if (chatScrollRef.current) {
                const messages = chatScrollRef.current.querySelectorAll('[id^="preview-msg-"]');
                let visibleAgentMsgId = null;
                
                messages.forEach((msgEl) => {
                  const rect = msgEl.getBoundingClientRect();
                  const chatRect = chatScrollRef.current?.getBoundingClientRect();
                  
                  if (chatRect && rect.top >= chatRect.top && rect.bottom <= chatRect.bottom) {
                    // Check if this is an agent message
                    const avatarId = msgEl.id.replace('preview-msg-', 'avatar-');
                    const avatarEl = document.getElementById(avatarId);
                    if (avatarEl) {
                      const isAgent = avatarEl.querySelector('span')?.textContent === '🦐';
                      if (isAgent) {
                        visibleAgentMsgId = msgEl.id.replace('preview-msg-', '');
                      }
                    }
                  }
                });
                
                if (visibleAgentMsgId) {
                  setActiveBubbleId(visibleAgentMsgId);
                } else {
                  setActiveBubbleId(null);
                }
              }
            }}
          >
            <div className="w-full flex flex-col items-center gap-[10px] py-[12px]">
              {previewMessages.slice(0, visibleMsgCount).map((msg, idx) => {
                const isAgent = msg.sender === 'agent';
                // Show bubble if it's the active one OR if it's the one currently fading out
                const showBubble = renderedBubbleId === msg.id;
                const isCurrentBubbleFading = isFadingOut && renderedBubbleId === msg.id;

                return (
                  <div 
                    key={msg.id} 
                    id={`preview-msg-${msg.id}`}
                    className="w-[680px] min-h-[92px] p-[12px_24px] rounded-[10px] flex flex-col gap-[10px] message-fade-in-up hover:bg-[#F5F5F4]/50 transition-colors shrink-0"
                    style={{ animationDelay: `${idx * 50}ms` }}
                    onMouseEnter={() => {
                       if (isAgent) {
                         setActiveBubbleId(msg.id);
                       }
                    }}
                    onMouseLeave={() => {
                       if (isAgent) {
                         setActiveBubbleId(null);
                       }
                    }}
                  >
                  <div className="flex items-start gap-2.5">
                    {/* Avatar Area */}
                    <div className="w-[40px] h-[40px] shrink-0 relative" id={`avatar-${msg.id}`}>
                       <div className="absolute inset-0 rounded-full border border-black/5 bg-[linear-gradient(147.5deg,#F4F4EF_20.63%,#B5D8DC_141.93%)]" />
                       <div className="absolute inset-0 flex items-center justify-center opacity-80">
                         {isAgent ? (
                           <span className="text-[18.2px] leading-[26px]">🦐</span>
                         ) : (
                           <img src={UserAvatar} alt="User" className="w-full h-full object-cover rounded-full" />
                         )}
                       </div>
                    </div>

                    {/* Content Area */}
                    <div className="flex flex-col items-start gap-1 flex-1">
                      {/* Name & Time */}
                      <div className="flex items-center gap-1.5 h-4">
                        <span className="text-xs font-medium text-[#3F3F46] leading-4">{msg.name}</span>
                        <span className="text-xs text-[#A1A1AA] font-mono leading-4 font-normal">{msg.time}</span>
                      </div>
                      
                      {/* Message Text */}
                      <div className="flex items-center w-full">
                        <p className="text-base leading-6 text-[#09090B] font-normal">{msg.text}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            </div>
          </div>
          
          {/* Render Bubble at Container Level to avoid clipping */}
          {renderedBubbleId && (
            (() => {
              const msg = previewMessages.find(m => m.id === renderedBubbleId);
              if (!msg) return null;
              
              const isCurrentBubbleFading = isFadingOut;
              // We need to find the avatar element position relative to the container
              // Since we can't easily get refs in this map structure without a lot of state, 
              // and this is a fixed demo, we can use a simpler approach or a Portal if needed.
              // BUT, for this specific request "not obscured by top nav", we can just render it here
              // and use a fixed position relative to the message? 
              // No, message scrolls. 
              
              // Let's use a specialized component that finds its target and renders itself?
              // Or better: Use the existing structure but add z-index to the bubble and ensure it's in a portal?
              // The user asked to fix the obscuring.
              
              // Let's use the Portal approach by modifying ThinkingBubble.tsx to support a 'portal' prop or similar?
              // Or just render ThinkingBubble here if we can get the position.
              
              return null; // Placeholder, I will modify ThinkingBubble.tsx instead.
            })()
          )}
          
          {/* Fade Overlay at Bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#FAFAF9] to-transparent pointer-events-none" />
          
          {/* Status Indicator at Bottom */}
          <div className="absolute bottom-[12px] left-1/2 -translate-x-1/2 z-20 flex items-center gap-1 px-[10px] py-0 h-[28px] bg-white border border-[#E7E5E4] rounded-[10px] shadow-md shrink-0">
              <LoaderCircle className="w-3 h-3 animate-spin text-[#C8B5A5]" />
              <span className="text-[12px] font-medium text-[#3F3F46] leading-[16px] whitespace-nowrap">正在整理下周执行清单</span>
          </div>
        </div>
      );
    }

    if (onboardingFeatureIndex === 1) {
      return (
        <div className="w-[700px] h-[500px] flex flex-col items-center bg-[#FAFAF9] border border-black/10 rounded-[10px] shadow-2xl overflow-hidden relative ring-[0.5px] ring-[var(--alpha-black-90)]">
          {/* Window Header */}
          <div className="w-[700px] h-[56px] flex items-center justify-between px-4 bg-[#FAFAF9] border-b border-[#E7E5E4] shrink-0">
             <div className="flex-1 flex items-center gap-[6px]">
               <span className="text-[14px] font-medium text-[#09090B] leading-[20px] shrink-0">扣子虾</span>
             </div>
             <div 
               className="flex items-center gap-1 px-4 py-2 h-[32px] bg-white border border-[#E7E5E4] rounded-[10px] shadow-sm cursor-pointer hover:bg-gray-50 transition-colors"
               onClick={() => setIsPopoverOpen(!isPopoverOpen)}
             >
                <Activity className="w-4 h-4 text-[#059669]" />
                <span className="text-[14px] font-medium text-[#059669] leading-[20px]">后台任务</span>
             </div>
          </div>

          {/* Chat Content */}
          <div className="flex-1 w-full flex flex-col items-center overflow-y-auto py-0 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
            <div className="w-full flex flex-col items-center gap-[10px] py-[12px]">
              {previewMessages.map((msg, idx) => {
                const isAgent = msg.sender === 'agent';
                return (
                  <div
                    key={msg.id}
                    className="w-[680px] min-h-[92px] p-[12px_24px] rounded-[10px] flex flex-col gap-[10px] message-fade-in-up hover:bg-[#F5F5F4]/50 transition-colors shrink-0"
                    style={{ animationDelay: `${idx * 150}ms` }}
                  >
                  <div className="flex items-start gap-2.5">
                    {/* Avatar Area */}
                    <div className="w-[40px] h-[40px] shrink-0 relative">
                       <div className="absolute inset-0 rounded-full border border-black/5 bg-[linear-gradient(147.5deg,#F4F4EF_20.63%,#B5D8DC_141.93%)]" />
                       <div className="absolute inset-0 flex items-center justify-center opacity-80">
                         {isAgent ? (
                           <span className="text-[18.2px] leading-[26px]">🦐</span>
                         ) : (
                           <img src={UserAvatar} alt="User" className="w-full h-full object-cover rounded-full" />
                         )}
                       </div>
                    </div>

                    {/* Content Area */}
                    <div className="flex flex-col items-start gap-1 flex-1">
                      {/* Name & Time */}
                      <div className="flex items-center gap-1.5 h-4">
                        <span className="text-xs font-medium text-[#3F3F46] leading-4">{msg.name}</span>
                        <span className="text-xs text-[#A1A1AA] font-mono leading-4 font-normal">{msg.time}</span>
                      </div>
                      
                      {/* Message Text */}
                      <div className="flex items-center w-full">
                        <p className="text-base leading-6 text-[#09090B] font-normal">{msg.text}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            </div>
          </div>

          {/* Floating Background Tasks Card */}
          {isPopoverOpen && (
            <div className="absolute right-4 top-[60px] w-[320px] bg-white rounded-[10px] shadow-md border-[0.5px] border-[#E7E5E4] p-2 flex flex-col gap-4 animate-in slide-in-from-bottom-4 fade-in duration-700 ease-out fill-mode-both z-10">
             <div className="flex items-center justify-between px-2 py-1.5 h-[28px]">
               <span className="text-[12px] font-medium leading-[16px] text-[#78716C]">后台任务</span>
               <div className="flex items-center gap-[6px]">
                 <span className="text-[12px] font-medium leading-[16px] text-[#A1A1AA]">进行</span>
                 <span className="text-[12px] font-medium leading-[16px] text-[#78716C]">{3}</span>
               </div>
             </div>
             
             <div className="flex flex-col gap-0 w-full overflow-hidden">
               {bgTasks.map((task) => (
                 <div 
                   key={task.id}
                   className={`p-2 rounded-[6px] flex items-center gap-3 w-full hover:bg-[#FAFAF9] transition-all h-[48px] ${
                     task.status === 'exiting' ? 'animate-out slide-out-to-right-2 fade-out duration-500 fill-mode-forwards' : 
                     task.status === 'entering' ? 'animate-in slide-in-from-bottom-2 fade-in duration-500 fill-mode-both' : ''
                   }`}
                 >
                   <div 
                     className="w-[32px] h-[32px] rounded-[10px] border border-black/5 flex items-center justify-center shrink-0"
                     style={{ backgroundColor: task.color }}
                   >
                      <task.icon className="w-[18px] h-[18px] text-[#0A0A0A]/60" />
                   </div>
                   <div className="flex-1 flex flex-col gap-2 w-[244px]">
                     <span className="text-[14px] font-normal leading-[20px] text-[#0C0A09] truncate">{task.title}</span>
                     {/* Progress Bar Container: Background is Light, Fill is Dark */}
                     <div className="h-[4px] bg-[#E7E5E4] rounded-full overflow-hidden w-full relative">
                       <div 
                         className="absolute top-0 left-0 h-full bg-[#A8A29E] transition-all duration-1000 ease-linear" 
                         style={{ width: task.status === 'exiting' ? '100%' : `${task.progress}%` }} 
                       />
                     </div>
                   </div>
                 </div>
               ))}
             </div>
          </div>
          )}

          {/* Status Indicator at Bottom */}
          <div className="absolute bottom-[12px] left-1/2 -translate-x-1/2 z-20 flex items-center gap-1 px-[10px] py-0 h-[28px] bg-white border border-[#E7E5E4] rounded-[10px] shadow-md shrink-0">
              <LoaderCircle className="w-3 h-3 animate-spin text-[#C8B5A5]" />
              <span className="text-[12px] font-medium text-[#3F3F46] leading-[16px] whitespace-nowrap">正在处理下周执行清单</span>
          </div>
        </div>
      );
    }

    if (onboardingFeatureIndex === 2) {
      return (
        <div className="w-full h-full flex items-center justify-center">
          <MiniUiAutonomous />
        </div>
      );
    }

    if (onboardingFeatureIndex === 3) {
      return (
        <div className="w-full h-full flex items-center justify-center">
          <MiniUiSocial />
        </div>
      );
    }

    if (onboardingMode === 'returning' && onboardingFeatureIndex === 4) {
      return (
        <div className="w-full h-full flex items-center justify-center">
          <MiniUiHistory />
        </div>
      );
    }

    if (onboardingMode === 'returning' && onboardingFeatureIndex === 5) {
      return (
        <div className="w-[700px] h-[500px] flex flex-col items-center bg-[#FAFAF9] border border-black/10 rounded-[10px] shadow-2xl overflow-hidden relative ring-[0.5px] ring-[var(--alpha-black-90)]">
          {/* Window Header */}
          <div className="w-[700px] h-[56px] flex items-center justify-between px-4 bg-[#FAFAF9] border-b border-[#E7E5E4] shrink-0">
             <div className="flex-1 flex items-center gap-[6px]">
               <span className="text-[14px] font-medium text-[#09090B] leading-[20px] shrink-0">扣子虾</span>
             </div>
          </div>

          {/* Chat Content */}
          <div className="flex-1 w-full flex flex-col items-center overflow-y-auto py-0 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
            <div className="w-full flex flex-col items-center gap-[10px] py-[12px]">
              {/* User Message 1 */}
              <div className="w-[680px] min-h-[72px] p-[12px_24px] rounded-[10px] flex flex-col gap-[10px] message-fade-in-up hover:bg-[#F5F5F4]/50 transition-colors shrink-0" style={{ animationDelay: '0ms' }}>
                  <div className="flex items-start gap-2.5">
                    <div className="w-[40px] h-[40px] shrink-0 relative">
                       <img src={UserAvatar} alt="User" className="w-full h-full object-cover rounded-full border border-black/5" />
                    </div>
                    <div className="flex flex-col items-start gap-1 flex-1">
                      <div className="flex items-center gap-1.5 h-4">
                        <span className="text-xs font-medium text-[#3F3F46] leading-4">{onboardingDisplayName}</span>
                        <span className="text-xs text-[#A1A1AA] font-mono leading-4 font-normal">10:35</span>
                      </div>
                      <div className="flex items-center w-full">
                        <p className="text-base leading-6 text-[#09090B] font-normal">我之前有一批长期计划：每周内容复盘、竞品追踪、热点扫描。新版里怎么继续？</p>
                      </div>
                    </div>
                  </div>
              </div>

              {/* Agent Message 1 */}
              <div
                className="w-[680px] min-h-[92px] p-[12px_24px] rounded-[10px] flex flex-col gap-[10px] message-fade-in-up hover:bg-[#F5F5F4]/50 transition-colors shrink-0"
                style={{ animationDelay: '150ms' }}
                onMouseEnter={() => setActiveBubbleId('returning-bubble')}
                onMouseLeave={() => setActiveBubbleId(null)}
              >
                  <div className="flex items-start gap-2.5">
                    <div className="w-[40px] h-[40px] shrink-0 relative" id="avatar-returning-bubble">
                       <div className="absolute inset-0 rounded-full border border-black/5 bg-[linear-gradient(147.5deg,#F4F4EF_20.63%,#B5D8DC_141.93%)]" />
                       <div className="absolute inset-0 flex items-center justify-center opacity-80">
                           <span className="text-[18.2px] leading-[26px]">🦐</span>
                       </div>
                    </div>
                    <div className="flex flex-col items-start gap-1 flex-1">
                      <div className="flex items-center gap-1.5 h-4">
                        <span className="text-xs font-medium text-[#3F3F46] leading-4">扣子虾</span>
                        <span className="text-xs text-[#A1A1AA] font-mono leading-4 font-normal">10:36</span>
                      </div>
                      <div className="flex items-center w-full">
                        <p className="text-base leading-6 text-[#09090B] font-normal">我已经识别到这些历史目标，并重规划为可执行日程。先给你三个核心日程：周一竞品复盘、每日热点扫描、周五周报汇总。</p>
                      </div>
                    </div>
                  </div>
              </div>

              {/* User Message 2 */}
              <div className="w-[680px] min-h-[72px] p-[12px_24px] rounded-[10px] flex flex-col gap-[10px] message-fade-in-up hover:bg-[#F5F5F4]/50 transition-colors shrink-0" style={{ animationDelay: '300ms' }}>
                  <div className="flex items-start gap-2.5">
                    <div className="w-[40px] h-[40px] shrink-0 relative">
                       <img src={UserAvatar} alt="User" className="w-full h-full object-cover rounded-full border border-black/5" />
                    </div>
                    <div className="flex flex-col items-start gap-1 flex-1">
                      <div className="flex items-center gap-1.5 h-4">
                        <span className="text-xs font-medium text-[#3F3F46] leading-4">{onboardingDisplayName}</span>
                        <span className="text-xs text-[#A1A1AA] font-mono leading-4 font-normal">10:36</span>
                      </div>
                      <div className="flex items-center w-full">
                        <p className="text-base leading-6 text-[#09090B] font-normal">OK，按这个来，直接创建并接手推进吧。</p>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
          </div>
          
          {/* Fade Overlay at Bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#FAFAF9] to-transparent pointer-events-none" />

          {/* Status Indicator at Bottom */}
          <div className="absolute bottom-[12px] left-1/2 -translate-x-1/2 z-20 flex items-center gap-1 px-[10px] py-0 h-[28px] bg-white border border-[#E7E5E4] rounded-[10px] shadow-md shrink-0">
              <LoaderCircle className="w-3 h-3 animate-spin text-[#C8B5A5]" />
              <span className="text-[12px] font-medium text-[#3F3F46] leading-[16px] whitespace-nowrap">正在为你创建日程</span>
          </div>
        </div>
      );
    }

    return (
      <div className="w-full max-w-3xl rounded-2xl border border-border/60 bg-card p-5 shadow-md">
        <div className="mb-3 flex items-center justify-between border-b border-border/70 pb-3">
          <div className="text-sm font-semibold text-foreground">和{agentName}的对话</div>
          <div className="relative">
            <div className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-xs text-emerald-700">
              <Activity size={12} />
              后台任务 3
            </div>
            <div className="absolute right-0 top-full z-10 mt-2 w-64 rounded-xl border border-border bg-card p-2 shadow-lg shadow-black/10">
              {[
                { name: '账号定位与内容策略拆解', type: 'strategy', progress: 88 },
                { name: '竞品样本池与数据分析', type: 'analysis', progress: 63 },
                { name: '首批选题与封面风格产出', type: 'creation', progress: 41 },
              ].map(task => (
                <div key={task.name} className="mb-2 last:mb-0 rounded-lg bg-muted/40 p-2">
                  <div className="mb-1 flex items-center justify-between text-[11px]">
                    <span className="font-medium text-foreground">{task.name}</span>
                    <span className="text-muted-foreground">{task.type}</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-foreground/80" style={{ width: `${task.progress}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="rounded-xl border border-border/70 bg-background p-2">
            <div className="mb-2 text-[11px] font-medium text-muted-foreground">技能池</div>
            <div className="flex flex-wrap gap-1.5">
              {['设计', '视频', 'PPT', 'Excel', '播客', '图表'].map(skill => (
                <span key={skill} className="rounded-md bg-muted/55 px-2 py-1 text-[11px] text-foreground">
                  {skill}
                </span>
              ))}
              {[
                'AI漫剧制作',
                '10W+爆文操盘手',
                '全球热点新闻',
                '公众号自动一键排版',
                '社媒封面设计',
                '数据分析技能',
              ].map(skill => (
                <span key={skill} className="rounded-md bg-emerald-50/85 px-2 py-1 text-[11px] text-emerald-700">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="max-h-[270px] space-y-2 overflow-y-auto rounded-xl border border-border/70 bg-background p-3">
            <div className="flex items-start gap-2">
              <div className="mt-1 h-6 w-6 shrink-0 rounded-full bg-muted text-[11px] leading-6 text-center text-muted-foreground">
                {onboardingDisplayName.slice(0, 1)}
              </div>
              <div className="rounded-lg bg-muted/45 px-3 py-2 text-sm text-foreground">
                我希望成为小红书的头部账号。
              </div>
            </div>

            <div className="flex items-start gap-2">
              <AgentAvatar size="sm" variant={agentAvatarVariant} imageUrl={agentAvatarImage} />
              <div className="rounded-lg bg-card px-3 py-2 text-sm text-foreground ring-1 ring-border/70">
                这几个技能可能适合我们：社媒封面设计、10W+爆文操盘手、数据分析技能。
              </div>
            </div>

            <div className="flex items-start gap-2">
              <AgentAvatar size="sm" variant={agentAvatarVariant} imageUrl={agentAvatarImage} />
              <div className="rounded-lg bg-card px-3 py-2 text-sm text-foreground ring-1 ring-border/70">
                让我来拆解几个任务并行开展。
              </div>
            </div>

            <div className="flex items-start gap-2">
              <AgentAvatar size="sm" variant={agentAvatarVariant} imageUrl={agentAvatarImage} />
              <div className="rounded-lg bg-card px-3 py-2 text-sm text-foreground ring-1 ring-emerald-200/80">
                调研已完成，你可以先看看这个 PPT 和竞品数据分析。
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1 rounded-md border border-border bg-muted/45 px-2 py-1 text-[11px] text-foreground">
                    <FileText size={12} />
                    PPT 产物
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-md border border-border bg-muted/45 px-2 py-1 text-[11px] text-foreground">
                    <FileSpreadsheet size={12} />
                    Excel 产物
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <AgentAvatar size="sm" variant={agentAvatarVariant} imageUrl={agentAvatarImage} />
              <div className="rounded-lg bg-card px-3 py-2 text-sm text-foreground ring-1 ring-border/70">
                我帮你规划了最适合的账号设计和选题规划，看看这个文档产物。
                <div className="mt-2 inline-flex items-center gap-1 rounded-md border border-border bg-muted/45 px-2 py-1 text-[11px] text-foreground">
                  <FileCode2 size={12} />
                  文档产物
                </div>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <AgentAvatar size="sm" variant={agentAvatarVariant} imageUrl={agentAvatarImage} />
              <div className="rounded-lg bg-card px-3 py-2 text-sm text-foreground ring-1 ring-border/70">
                账号资产也设计好了。
                <div className="mt-2 inline-flex items-center gap-1 rounded-md border border-border bg-muted/45 px-2 py-1 text-[11px] text-foreground">
                  <FileImage size={12} />
                  图片产物
                </div>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <AgentAvatar size="sm" variant={agentAvatarVariant} imageUrl={agentAvatarImage} />
              <div className="rounded-lg bg-card px-3 py-2 text-sm text-foreground ring-1 ring-border/70">
                如果你需要的话，我可以根据第一个选题帮你生成视频？
              </div>
            </div>

            <div className="flex items-start gap-2">
              <div className="mt-1 h-6 w-6 shrink-0 rounded-full bg-muted text-[11px] leading-6 text-center text-muted-foreground">
                {onboardingDisplayName.slice(0, 1)}
              </div>
              <div className="rounded-lg bg-muted/45 px-3 py-2 text-sm text-foreground">
                <div className="mb-2 inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-1 text-[11px] text-emerald-700">
                  <Files size={12} />
                  已选中技能：视频
                </div>
                没问题，开始吧。
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (onboardingUiStep === 'name') {
    return (
      <div className="flex h-full w-full items-center justify-center bg-[var(--primary-foreground)] px-8 py-10 font-sans">
        <div className="flex w-full max-w-[1392px] h-[900px] flex-col items-center justify-center gap-12 relative overflow-hidden">
          
          {/* Mode Switcher - Fixed Position */}
          <div className="absolute right-6 top-6 inline-flex items-center gap-1 rounded-lg bg-[var(--ivory-yellow-1)] p-1 z-10">
            <button
              type="button"
              onClick={() => {
                setOnboardingMode('new');
                setOnboardingDraftName('');
                setNameError(null);
              }}
              className={`rounded-md px-2.5 py-1 text-xs transition-colors ${
                onboardingMode === 'new' ? 'bg-white shadow-xs' : 'text-[#78716C]'
              }`}
            >
              新用户
            </button>
            <button
              type="button"
              onClick={() => {
                setOnboardingMode('returning');
                setOnboardingDraftName(userName || '李明');
                setNameError(null);
              }}
              className={`rounded-md px-2.5 py-1 text-xs transition-colors ${
                onboardingMode === 'returning' ? 'bg-white shadow-xs' : 'text-[#78716C]'
              }`}
            >
              老用户
            </button>
          </div>

          {/* Title Area */}
          <div className="flex flex-col items-center gap-[6px] w-[288px]">
            <div className="text-[36px] font-medium leading-none text-[#78716C] opacity-60 text-center">
              欢迎来到扣子虾
            </div>
            <h2 className="text-[36px] font-medium leading-none text-[#3F3F46] text-center">
              请问怎么称呼您？
            </h2>
          </div>

          {onboardingMode === 'new' ? (
            <div className="flex flex-col items-center gap-4 w-full">
              <form
                className="relative flex items-center w-[600px] h-[64px] px-2 pl-8 gap-2 bg-white border border-[#E7E5E4] rounded-full shadow-xs transition-all duration-200"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!onboardingDraftName.trim()) return;
                  handleOnboardingNameSubmit(onboardingDraftName);
                }}
              >
                <input
                  value={onboardingDraftName}
                  onChange={(e) => {
                    setOnboardingDraftName(e.target.value);
                    if (nameError) setNameError(null);
                  }}
                  placeholder="在此输入你的昵称"
                  className={`flex-1 bg-transparent border-none outline-none text-[20px] font-normal leading-none placeholder-[#78716C] ${
                    nameError ? 'text-destructive' : 'text-foreground'
                  }`}
                  autoFocus
                />
                <button
                  type="submit"
                  disabled={!onboardingDraftName.trim()}
                  className={`flex items-center justify-center w-[48px] h-[48px] rounded-full shadow-xs transition-all duration-300 active:scale-95 ${
                    onboardingDraftName.trim() 
                      ? 'bg-[#1C1917] hover:bg-[#1C1917]/90' 
                      : 'bg-[#1C1917]/20 cursor-not-allowed opacity-50'
                  }`}
                >
                  <ArrowRight size={24} className="text-[#FAFAF9]" />
                </button>
              </form>
              
              {/* Error Message */}
              {nameError && (
                <div className="text-sm font-medium text-destructive animate-in fade-in slide-in-from-top-1 duration-200">
                  {nameError}
                </div>
              )}

              {/* Skip Button */}
              <div className="flex justify-center mt-8">
                <button
                  type="button"
                  onClick={handleOnboardingSkip}
                  className="w-[120px] h-[40px] flex items-center justify-center text-[14px] font-medium leading-none text-[#0C0A09] hover:opacity-70 transition-opacity"
                >
                  跳过
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4 w-full">
              <div className="rounded-xl border border-border/70 bg-muted/35 px-6 py-4 text-center text-sm text-muted-foreground">
                已识别你的昵称：<span className="font-medium text-foreground">{userName || '李明'}</span>
                <div className="mt-1 text-xs text-muted-foreground/80">实际老用户无此流程，此处仅作为演示入口。</div>
              </div>
              <Button
                type="button"
                onClick={() => {
                  setOnboardingDraftName(userName || '李明');
                  setOnboardingFeatureIndex(0);
                  setOnboardingUiStep('slides');
                }}
                className="h-10 px-8 rounded-xl bg-[#1C1917] text-white hover:bg-[#1C1917]/90 transition-all active:scale-[0.98]"
              >
                查看新版变化
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (onboardingUiStep === 'slides') {
    return (
      <div className="flex h-full w-full items-center justify-center bg-[var(--primary-foreground)] px-4 md:px-8 py-6 font-sans overflow-hidden">
        <div className="flex flex-col items-center w-full max-w-[1392px]">
          {/* Header - Welcome Text */}
          <div className="text-center px-4 shrink-0">
            <div className="text-[18px] md:text-[36px] font-medium leading-tight text-[#78716C] opacity-60">
              {onboardingMode === 'returning' ? `又见面啦，${onboardingDisplayName}` : `很高兴认识你，${onboardingDisplayName}`}
            </div>
            <h2 className="mt-1 md:mt-2 text-[20px] md:text-[36px] font-medium leading-tight text-[#0C0A09]">
              {onboardingMode === 'returning' ? '1 分钟，了解下新版扣子虾可以为你做什么' : '1 分钟，了解下我可以为你做什么'}
            </h2>
          </div>

          {/* Middle Content - Mini UI Area */}
          <div className="flex items-center justify-center w-full px-2 md:px-0 mt-6 mb-6">
            <div className="w-full max-w-[360px] md:max-w-[1200px] md:w-[1200px] h-auto max-h-[calc(100vh-200px)] p-3 md:p-[10px] gap-4 md:gap-[32px] bg-ivory-yellow-1 rounded-[16px] flex flex-col md:flex-row items-center justify-center shadow-none relative">
              {/* Left Column: Mini UI Area */}
              <div className={`w-full md:w-[800px] h-auto max-h-[600px] p-0 md:p-[32px] gap-[10px] rounded-[6px] relative overflow-hidden flex flex-col items-center justify-center ${getPreviewContainerBackground()} [&>div]:scale-[0.45] sm:[&>div]:scale-[0.6] lg:[&>div]:scale-[0.85] xl:[&>div]:scale-100 [&>div]:origin-center`}>
                {/* Navigation Buttons Overlay */}
                <div className="absolute top-1/2 left-0 right-0 w-full px-[4px] flex justify-between items-center -translate-y-1/2 z-10 pointer-events-none md:pointer-events-auto">
                  <button
                    type="button"
                    onClick={() => canGoPrev && setOnboardingFeatureIndex(prev => Math.max(0, prev - 1))}
                    className={`w-[32px] h-[32px] md:w-[40px] md:h-[40px] bg-black/20 md:bg-transparent rounded-full md:rounded-none flex items-center justify-center text-white pointer-events-auto transition-opacity ${
                      canGoPrev ? 'hover:text-white hover:bg-black/30 md:hover:bg-transparent' : 'opacity-30 cursor-not-allowed'
                    }`}
                    aria-label="上一页"
                  >
                    <ChevronLeft size={20} className="md:w-[24px] md:h-[24px]" />
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => canGoNext && setOnboardingFeatureIndex(prev => Math.min(onboardingSlides.length - 1, prev + 1))}
                    className={`w-[32px] h-[32px] md:w-[40px] md:h-[40px] bg-black/20 md:bg-transparent rounded-full md:rounded-none flex items-center justify-center text-white pointer-events-auto transition-opacity ${
                      canGoNext ? 'hover:text-white hover:bg-black/30 md:hover:bg-transparent' : 'opacity-30 cursor-not-allowed'
                    }`}
                    aria-label="下一页"
                  >
                    <ChevronRight size={20} className="md:w-[24px] md:h-[24px]" />
                  </button>
                </div>

                {renderOnboardingSlidePreview()}
              </div>

              {/* Right Column: Text Content */}
              <div className="w-full md:w-[340px] flex flex-col items-center md:items-start gap-3 md:gap-[32px] shrink-0">
                <div className="w-full flex flex-col items-center md:items-start gap-[6px] text-center md:text-left">
                  <div className="w-full text-[14px] md:text-[20px] font-normal leading-tight text-[#09090B]">
                    {activeSlide.title}
                  </div>
                  <p className="w-full text-[12px] md:text-[18px] font-normal leading-tight text-[#78716C]">
                    {activeSlide.description}
                  </p>
                </div>
                
                <div className="flex items-center gap-[10px] w-[220px] justify-center md:justify-start">
                  {onboardingSlides.map((_, idx) => (
                    <div
                      key={`ob-dot-${idx}`}
                      onClick={() => setOnboardingFeatureIndex(idx)}
                      className={`h-[3px] rounded-[9999px] transition-all duration-300 cursor-pointer ${
                        idx === onboardingFeatureIndex 
                          ? 'w-[52px] bg-black/50' 
                          : 'w-[12px] bg-black/10 hover:bg-black/20'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer - Button */}
          <div className="flex justify-center shrink-0">
            <Button
              onClick={onComplete}
              className="h-10 w-[264px] rounded-[10px] bg-[#1C1917] text-sm font-medium text-[#FAFAF9] shadow-xs hover:bg-[#1C1917]/90 active:scale-[0.98] transition-all"
            >
              立即开始
            </Button>
          </div>
        </div>
        
        {/* Global Bubble Overlay - Rendered via Portal logic manually here or using component */}
        {/* We use a simple absolute positioned component that finds the target by ID */}
        {renderedBubbleId && (
          <BubbleOverlay 
            renderedBubbleId={renderedBubbleId} 
            isFadingOut={isFadingOut} 
            messages={previewMessages} 
          />
        )}
      </div>
    );
  }

  return null;
};

// Internal Component for Bubble Overlay
const BubbleOverlay = ({ renderedBubbleId, isFadingOut, messages }: { renderedBubbleId: string, isFadingOut: boolean, messages: any[] }) => {
  const [position, setPosition] = useState<{top: number, left: number} | null>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updatePosition = () => {
      const targetId = `avatar-${renderedBubbleId}`;
      const targetEl = document.getElementById(targetId);
      if (!targetEl) return;

      const rect = targetEl.getBoundingClientRect();
      // We want to position it relative to the viewport (fixed) or document (absolute)
      // Since we are rendering in the main flow but outside the scaled container... wait.
      // If we render at the root, we need to deal with the scaling of the container.
      // Easiest is to use Fixed positioning based on getBoundingClientRect.
      
      setPosition({
        top: rect.top,
        left: rect.left
      });
    };

    updatePosition();
    // Add scroll/resize listeners to update position
    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);
    
    // Also need a loop or MutationObserver if the content animates/scrolls?
    // The chat scrolls on mount (animate-in).
    const interval = setInterval(updatePosition, 16); // 60fps update for smooth tracking

    return () => {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
      clearInterval(interval);
    };
  }, [renderedBubbleId]);

  if (!position) return null;

  const msg = messages.find(m => m.id === renderedBubbleId);
  // Allow rendering if it's the special returning bubble, even if not in messages
  if (!msg && renderedBubbleId !== 'returning-bubble') return null;

  // We render the ThinkingBubble in a Portal-like way (fixed position)
  // But we need to handle the content prop which might be complex (for returning user bubble)
  
  // Wait, for 'returning-bubble', the content is hardcoded in the original render.
  // We need to pass that content here or duplicate the logic.
  // The 'messages' array has 'bubbleContent' string for Slide 0.
  // For Slide 5, 'returning-bubble' is special.
  
  let content: React.ReactNode = msg?.bubbleContent;
  let header: React.ReactNode = undefined;
  let referenceTitle: string | undefined = msg?.bubbleReference;

  if (renderedBubbleId === 'returning-bubble') {
     header = (
        <span className="text-[14px] text-[#A1A1AA] font-medium flex items-center gap-1">
          努力创建日程 (没有忘记我们的历史目标 <span className="text-[16px]">🤔</span>)
        </span>
     );
     content = (
        <div className="flex flex-col gap-2 mt-2 w-full">
          <div className="flex items-center gap-2">
            <div className="w-[18px] h-[18px] bg-[#22C55E] rounded-[4px] flex items-center justify-center shrink-0">
               <Check className="w-3 h-3 text-white" strokeWidth={3} />
            </div>
            <span className="text-[14px] font-medium text-[#09090B] leading-tight">每周一 10:00 · 竞品复盘同步</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-[18px] h-[18px] bg-[#22C55E] rounded-[4px] flex items-center justify-center shrink-0">
               <Check className="w-3 h-3 text-white" strokeWidth={3} />
            </div>
            <span className="text-[14px] font-medium text-[#09090B] leading-tight">每天 05:40 · 平台热点扫描</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-[18px] h-[18px] bg-[#22C55E] rounded-[4px] flex items-center justify-center shrink-0">
               <Check className="w-3 h-3 text-white" strokeWidth={3} />
            </div>
            <span className="text-[14px] font-medium text-[#09090B] leading-tight">每周五 18:00 · 周报自动汇总</span>
          </div>
        </div>
     );
     referenceTitle = undefined;
  }

  return (
    <div 
      style={{
        position: 'fixed',
        top: position.top,
        left: position.left,
        zIndex: 9999,
        pointerEvents: 'none' // Allow clicking through if needed, but bubble usually blocks? 
        // Actually bubble might need interaction (copy text?).
        // But user said "unobscured".
      }}
    >
       {/* Relative container to match original structure */}
       <div className="relative w-0 h-0"> 
          <ThinkingBubble
            isExiting={isFadingOut}
            className="left-[48px] -top-[90px] md:-top-[90px]" // Use original offsets
            // Note: Returning bubble used -top-[130px]
            // We need to adjust based on ID
            customHeader={header}
            content={content}
            referenceTitle={referenceTitle}
            // Dynamic className override for returning bubble
            {...(renderedBubbleId === 'returning-bubble' ? { className: "left-[48px] -top-[130px]" } : {})}
          />
       </div>
    </div>
  );
};
