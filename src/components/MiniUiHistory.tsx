import React from 'react';
import { History, Pin, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

export function MiniUiHistory() {
  // 置顶记录
  const pinnedItems = [
    {
      id: 1,
      title: '寿司的历史',
      subtitle: '起源：寿司的雏形出现在弥生时代，当时人们发明了将鱼与米饭一起发酵的技术，这种方法被称为"熟寿司"（なれずし）。在这一阶段，米饭主要用于发酵，而不...',
      time: '2026年03月03日 19:35',
      pinned: true
    },
    {
      id: 2,
      title: '复变函数',
      subtitle: '复变函数（Complex Function）是数学中研究复数变量的函数。它是复分析的核心内容，涉及到复数的性质及其在不同领域中的应用。以下是复变函数的一些基...',
      time: '2026年03月03日 19:35',
      pinned: true
    }
  ];

  // 普通历史记录
  const historyItems = [
    {
      id: 3,
      title: '英文介绍Shadcn组件库',
      subtitle: 'Shadcn/ui is a popular, open-source UI component library for React that focuses on flexibility and customization. It provides a set of accessible, cus...',
      time: '2026年03月03日 19:35',
      pinned: false
    },
    {
      id: 4,
      title: '目前有多少个AI应用已经使用deepseek R1模型',
      subtitle: 'Shadcn/ui is a popular, open-source UI component library for React that focuses on flexibility and customization. It provides a set of accessible, cus...',
      time: '2026年03月03日 19:35',
      pinned: false
    },
    {
      id: 5,
      title: '喝水提醒（每天提醒我喝1.8L）',
      subtitle: '设置每日喝水提醒，目标1.8升，分8次提醒，帮助保持身体健康和水分平衡...',
      time: '2026年03月03日 19:35',
      pinned: false
    },
    {
      id: 6,
      title: '黄金投资指南',
      subtitle: '黄金作为避险资产，在经济不确定时期表现出色。本指南将介绍黄金投资的基本知识、投资方式以及风险控制策略...',
      time: '2026年03月03日 19:35',
      pinned: false
    }
  ];

  return (
    <div className="w-full h-full bg-[#F5F5F0] rounded-[10px] shadow-xl overflow-hidden flex border border-[#E7E5E4] ring-[0.5px] ring-[var(--alpha-black-90)]">
      {/* Sidebar */}
      <div className="w-[120px] bg-[#FAFAF9] border-r border-[#E7E5E4] flex flex-col justify-between shrink-0">
        <div className="p-2 flex flex-col gap-3">
          {/* User Profile */}
          <div className="flex items-center gap-1.5">
             <div className="w-7 h-7 rounded-full bg-gradient-to-br from-stone-100 to-slate-300 border border-black/5 relative shrink-0">
                <div className="absolute inset-0 flex items-center justify-center opacity-80 text-xs">
                  🦐
                </div>
                <div className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-500 border-2 border-[#FAFAF9] rounded-full"></div>
             </div>
             <div className="flex flex-col overflow-hidden">
               <span className="text-[11px] font-medium text-[#09090B] truncate">扣子虾</span>
               <span className="text-[9px] text-[#78716C] truncate">工作中</span>
             </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-1">
            <button className="flex items-center gap-1.5 px-2 py-1.5 rounded-md text-[11px] font-medium bg-[#E7E5E4]/40 text-[#09090B]">
              <History className="w-3 h-3" />
              历史话题
            </button>
          </div>

          {/* 被指定的话题 */}
          <div className="flex flex-col gap-2 mt-2">
            <div className="px-2 text-[10px] text-[#A1A1AA] font-medium">置顶</div>
            <div className="flex flex-col gap-1">
              <button className="flex items-center gap-1.5 px-2 py-1.5 rounded-md text-[10px] text-[#78716C] hover:bg-[#E7E5E4]/20 transition-colors text-left">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C8B5A5] shrink-0"></span>
                <span className="truncate">长期计划：每周内容复盘</span>
              </button>
              <button className="flex items-center gap-1.5 px-2 py-1.5 rounded-md text-[10px] text-[#78716C] hover:bg-[#E7E5E4]/20 transition-colors text-left">
                <span className="w-1.5 h-1.5 rounded-full bg-[#A5AFC8] shrink-0"></span>
                <span className="truncate">竞品追踪任务</span>
              </button>
              <button className="flex items-center gap-1.5 px-2 py-1.5 rounded-md text-[10px] text-[#78716C] hover:bg-[#E7E5E4]/20 transition-colors text-left">
                <span className="w-1.5 h-1.5 rounded-full bg-[#86EFAC] shrink-0"></span>
                <span className="truncate">热点扫描清单</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-[#FAFAF9] overflow-hidden">
        {/* Header */}
        <div className="h-10 border-b border-[#E7E5E4] flex items-center justify-between px-4 bg-[#FAFAF9]/50 shrink-0">
           <span className="text-[10px] text-[#78716C]">共 20 条记录</span>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto">
          {/* 置顶记录 */}
          {pinnedItems.map((item) => (
            <div 
              key={item.id} 
              className="group px-4 py-3 border-b border-[#E7E5E4] hover:bg-[#F5F5F4] transition-colors cursor-pointer flex flex-col gap-2"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-[13px] font-medium text-[#09090B] line-clamp-1 flex-1">{item.title}</h3>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                   <button className="p-1 hover:bg-[#E7E5E4] rounded">
                     <Pin className="w-3.5 h-3.5 text-[#78716C] fill-current" />
                   </button>
                   <button className="p-1 hover:bg-[#E7E5E4] rounded">
                     <MoreHorizontal className="w-3.5 h-3.5 text-[#78716C]" />
                   </button>
                </div>
              </div>
              <p className="text-[11px] text-[#78716C] leading-5 line-clamp-2">{item.subtitle}</p>
              <div className="flex items-center gap-1.5 text-[10px] text-[#A1A1AA]">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                <span>{item.time}</span>
              </div>
            </div>
          ))}
          
          {/* 普通记录 */}
          {historyItems.map((item) => (
            <div 
              key={item.id} 
              className="group px-4 py-3 border-b border-[#E7E5E4] hover:bg-[#F5F5F4] transition-colors cursor-pointer flex flex-col gap-2"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-[13px] font-medium text-[#09090B] line-clamp-1 flex-1">{item.title}</h3>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                   <button className="p-1 hover:bg-[#E7E5E4] rounded">
                     <Pin className="w-3.5 h-3.5 text-[#78716C]" />
                   </button>
                   <button className="p-1 hover:bg-[#E7E5E4] rounded">
                     <MoreHorizontal className="w-3.5 h-3.5 text-[#78716C]" />
                   </button>
                </div>
              </div>
              <p className="text-[11px] text-[#78716C] leading-5 line-clamp-2">{item.subtitle}</p>
              <div className="flex items-center gap-1.5 text-[10px] text-[#A1A1AA]">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                <span>{item.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
