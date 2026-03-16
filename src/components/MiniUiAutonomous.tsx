import React, { useState } from 'react';
import { CalendarClock, Files, Smartphone, ChevronLeft, ChevronRight, CheckCircle2, Circle, Clock, Loader2, FileText, FileSpreadsheet, FileArchive, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

type TabType = 'routine' | 'file' | 'device';

export function MiniUiAutonomous() {
  const [activeTab, setActiveTab] = useState<TabType>('routine');

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
            <button
              onClick={() => setActiveTab('routine')}
              className={cn(
                "flex items-center gap-1.5 px-2 py-1.5 rounded-md text-[11px] font-medium transition-colors",
                activeTab === 'routine' 
                  ? "bg-[#E7E5E4]/40 text-[#09090B]" 
                  : "text-[#78716C] hover:bg-[#E7E5E4]/20"
              )}
            >
              <CalendarClock className="w-3 h-3" />
              日程
            </button>
            <button
              onClick={() => setActiveTab('file')}
              className={cn(
                "flex items-center gap-1.5 px-2 py-1.5 rounded-md text-[11px] font-medium transition-colors",
                activeTab === 'file' 
                  ? "bg-[#E7E5E4]/40 text-[#09090B]" 
                  : "text-[#78716C] hover:bg-[#E7E5E4]/20"
              )}
            >
              <Files className="w-3 h-3" />
              文件
            </button>
            <button
              onClick={() => setActiveTab('device')}
              className={cn(
                "flex items-center gap-1.5 px-2 py-1.5 rounded-md text-[11px] font-medium transition-colors",
                activeTab === 'device' 
                  ? "bg-[#E7E5E4]/40 text-[#09090B]" 
                  : "text-[#78716C] hover:bg-[#E7E5E4]/20"
              )}
            >
              <Smartphone className="w-3 h-3" />
              设备
            </button>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="p-2">
           <div className="flex items-center gap-1.5 px-1">
              <div className="w-4 h-4 rounded-full bg-[#E7E5E4] overflow-hidden shrink-0">
                <img src="https://avatar.vercel.sh/user" alt="User" className="w-full h-full object-cover" />
              </div>
              <span className="text-[9px] font-medium text-[#09090B] truncate">王大壮</span>
           </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-white overflow-hidden">
        {activeTab === 'routine' && <RoutineView />}
        {activeTab === 'file' && <FileView />}
        {activeTab === 'device' && <DeviceView />}
      </div>
    </div>
  );
}

// 7天的假数据
const weekData = [
  {
    day: '周一',
    date: '7',
    isToday: false,
    tasks: [
      { title: '竞品分析报告', status: 'completed', time: '09:00', type: 'solid' },
      { title: '选题头脑风暴', status: 'pending', time: '14:00', type: 'dashed' },
      { title: '周报汇总', status: 'pending', time: '18:00', type: 'dashed' },
    ]
  },
  {
    day: '周二',
    date: '8',
    isToday: true,
    tasks: [
      { title: '平台更新扫描', status: 'completed', time: '05:40', type: 'solid' },
      { title: '选题盲盒', status: 'in-progress', time: '10:00', type: 'blue-dashed' },
      { title: '每日成长思考', status: 'pending', time: '22:00', type: 'dashed' },
      { title: '内容策略优化', status: 'pending', time: '15:30', type: 'dashed' },
    ]
  },
  {
    day: '周三',
    date: '9',
    isToday: false,
    tasks: [
      { title: '热点趋势分析', status: 'pending', time: '09:30', type: 'dashed' },
      { title: '视频脚本撰写', status: 'pending', time: '13:00', type: 'dashed' },
      { title: '粉丝互动回复', status: 'pending', time: '20:00', type: 'dashed' },
    ]
  },
  {
    day: '周四',
    date: '10',
    isToday: false,
    tasks: [
      { title: '内容发布排期', status: 'pending', time: '10:00', type: 'dashed' },
      { title: '数据分析复盘', status: 'pending', time: '16:00', type: 'dashed' },
      { title: '下周计划制定', status: 'pending', time: '19:00', type: 'dashed' },
      { title: '行业资讯整理', status: 'pending', time: '21:00', type: 'dashed' },
    ]
  },
  {
    day: '周五',
    date: '11',
    isToday: false,
    tasks: [
      { title: '周报提交', status: 'pending', time: '17:00', type: 'dashed' },
      { title: '团队会议', status: 'pending', time: '14:00', type: 'dashed' },
      { title: '周末内容预排', status: 'pending', time: '18:30', type: 'dashed' },
    ]
  },
  {
    day: '周六',
    date: '12',
    isToday: false,
    tasks: [
      { title: '周末热点监控', status: 'pending', time: '10:00', type: 'dashed' },
      { title: '灵感素材收集', status: 'pending', time: '15:00', type: 'dashed' },
    ]
  },
  {
    day: '周日',
    date: '13',
    isToday: false,
    tasks: [
      { title: '下周选题确认', status: 'pending', time: '14:00', type: 'dashed' },
      { title: '内容预发布检查', status: 'pending', time: '19:00', type: 'dashed' },
      { title: '个人学习总结', status: 'pending', time: '21:00', type: 'dashed' },
    ]
  },
];

function TaskCard({ task }: { task: typeof weekData[0]['tasks'][0] }) {
  const getStatusIcon = () => {
    switch (task.status) {
      case 'completed':
        return <div className="w-2.5 h-2.5 bg-[#86EFAC] rounded-full" />;
      case 'in-progress':
        return <Loader2 className="w-3 h-3 text-[#A5AFC8] animate-spin" />;
      default:
        return <div className="w-2.5 h-2.5 rounded-full border border-[#C8C1A5]" />;
    }
  };

  const getStatusText = () => {
    switch (task.status) {
      case 'completed':
        return '已完成';
      case 'in-progress':
        return '进行中';
      default:
        return '待执行';
    }
  };

  const getCardStyles = () => {
    if (task.type === 'solid') {
      return 'bg-white border-[#E7E5E4] opacity-60';
    } else if (task.type === 'blue-dashed') {
      return 'bg-[#F2F4F8] border-dashed border-[#A5AFC8]';
    }
    return 'bg-[#F8F5F2] border-dashed border-[#C8B5A5]';
  };

  return (
    <div className={`flex flex-col items-start p-2 gap-1.5 w-full border rounded-md box-border shrink-0 ${getCardStyles()}`}>
      <div className="w-full text-[10px] font-normal leading-4 text-[#09090B] break-words">
        {task.title}
      </div>
      <div className="w-full flex flex-col items-start gap-1">
        <div className="w-full flex flex-row items-center gap-1.5">
          {getStatusIcon()}
          <div className="text-[10px] font-normal leading-4 text-[#808087] flex items-center">
            {getStatusText()}
          </div>
        </div>
        <div className="w-full flex flex-row items-center gap-1.5">
          <Clock className="w-3 h-3 text-[#A1A1AA]" />
          <div className="text-[10px] font-normal leading-4 text-[#808087] flex items-center">
            {task.time}
          </div>
        </div>
      </div>
    </div>
  );
}

function RoutineView() {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="h-12 border-b border-[#E7E5E4] flex items-center justify-between px-4 bg-[#FAFAF9]/50 shrink-0">
        <div className="flex items-center gap-2">
           <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-[#E7E5E4] rounded-md shadow-sm text-xs font-medium text-[#44403C]">
             <ChevronLeft className="w-3 h-3 text-[#A1A1AA]" />
             <span>2026年4月7日 至 13日</span>
             <ChevronRight className="w-3 h-3 text-[#A1A1AA]" />
           </div>
        </div>
      </div>

      {/* 7-Day Calendar Grid */}
      <div className="flex-1 flex overflow-hidden">
        {weekData.map((day, index) => (
          <div 
            key={day.day} 
            className={`flex-1 flex flex-col min-w-0 ${index < 6 ? 'border-r border-[#E7E5E4]' : ''} ${day.isToday ? 'bg-[#FAFAF9]/30' : ''}`}
          >
            {/* Day Header */}
            <div className={`h-16 border-b border-[#E7E5E4] p-2 flex flex-col justify-between ${day.isToday ? 'bg-[#FAFAF9]' : ''}`}>
               <span className="text-[10px] font-medium text-[#78716C]">
                 {day.day}
                 {day.isToday && <span className="text-[#059669] ml-1">今日</span>}
               </span>
               <span className={`text-2xl font-light ${day.isToday ? 'text-[#09090B]' : 'text-[#A1A1AA]'}`}>
                 {day.date}
               </span>
            </div>
            
            {/* Tasks */}
            <div className="flex-1 p-2 flex flex-col gap-2 overflow-y-auto">
              {day.tasks.map((task, taskIndex) => (
                <TaskCard key={taskIndex} task={task} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FileView() {
  const files = [
    { name: '内容策略周报_v5.md', size: '6kb', date: '2025-11-28 15:10', type: 'md' },
    { name: '小红书竞品矩阵.xlsx', size: '24kb', date: '2025-11-28 14:20', type: 'xlsx' },
    { name: '账号视觉资产包_v3.zip', size: '128mb', date: '2025-11-28 12:05', type: 'zip' },
    { name: '当日全网热点新问整理-精简版.md', size: '12kb', date: '2025-11-28 10:00', type: 'md' },
    { name: '账号视觉资产包_v2.zip', size: '125mb', date: '2025-11-27 18:30', type: 'zip' },
    { name: '账号视觉资产包_v1.zip', size: '120mb', date: '2025-11-26 11:15', type: 'zip' },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'md': return <FileText className="w-5 h-5 text-blue-500" />;
      case 'xlsx': return <FileSpreadsheet className="w-5 h-5 text-green-500" />;
      case 'zip': return <FileArchive className="w-5 h-5 text-amber-500" />;
      default: return <Files className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="h-14 border-b border-[#E7E5E4] flex items-center justify-between px-6 bg-[#FAFAF9]/50">
        <span className="text-sm font-medium text-[#09090B]">全部文件</span>
        <div className="flex gap-2">
            <div className="p-1.5 hover:bg-[#E7E5E4] rounded-md cursor-pointer"><MoreHorizontal className="w-4 h-4 text-[#78716C]" /></div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex flex-col gap-1">
          {files.map((file, i) => (
            <div key={i} className="flex items-center justify-between p-3 hover:bg-[#F5F5F4] rounded-lg group transition-colors cursor-default">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-10 h-10 rounded-lg bg-white border border-[#E7E5E4] flex items-center justify-center shrink-0">
                  {getIcon(file.type)}
                </div>
                <div className="flex flex-col overflow-hidden">
                  <span className="text-sm text-[#09090B] font-medium truncate">{file.name}</span>
                  <span className="text-xs text-[#A1A1AA]">{file.size} · {file.date}</span>
                </div>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                 <button className="px-3 py-1 text-xs font-medium text-[#09090B] bg-white border border-[#E7E5E4] rounded-md shadow-sm hover:bg-[#FAFAF9]">下载</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import { useEffect } from 'react';

// ... (existing imports)

function DeviceView() {
  const [scanLines, setScanLines] = useState<{ id: number; width: string; top: string; delay: string }[]>([]);

  useEffect(() => {
    // Generate random scan lines
    const lines = Array.from({ length: 6 }).map((_, i) => ({
      id: i,
      width: `${Math.random() * 40 + 30}%`,
      top: `${Math.random() * 60 + 20}%`,
      delay: `${Math.random() * 2}s`
    }));
    setScanLines(lines);
  }, []);

  return (
    <div className="flex flex-col h-full items-center justify-center bg-[#F5F5F4] p-8">
       <div className="relative w-[240px] h-[480px] bg-[#18181B] rounded-[36px] shadow-2xl p-[6px] border-[1px] border-[#27272A]/50 ring-1 ring-black/10">
          {/* Dynamic Island / Notch */}
          <div className="absolute top-[12px] left-1/2 -translate-x-1/2 w-20 h-6 bg-black rounded-full z-20 flex items-center justify-center">
             <div className="w-12 h-3 rounded-full bg-[#18181B]"></div>
          </div>
          
          {/* Screen */}
          <div className="w-full h-full bg-white rounded-[30px] overflow-hidden relative flex flex-col">
             {/* Status Bar */}
             <div className="h-10 w-full flex items-center justify-between px-6 pt-3 z-10">
               <span className="text-[10px] font-semibold text-black/80">10:42</span>
               <div className="flex gap-1">
                 <div className="w-3.5 h-2 bg-black rounded-[2px]"></div>
                 <div className="w-0.5 h-2 bg-black/20 rounded-[1px]"></div>
               </div>
             </div>

             {/* App Content */}
             <div className="flex-1 flex flex-col items-center justify-center gap-4 bg-gradient-to-b from-orange-50/30 to-white relative overflow-hidden">
                {/* Background Floating Elements (Data Particles) */}
                <div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none">
                  {scanLines.map((line) => (
                    <div 
                      key={line.id}
                      className="absolute h-1 bg-orange-200/50 rounded-full animate-pulse"
                      style={{ 
                        width: line.width, 
                        top: line.top, 
                        left: '-10%',
                        animation: `scan-slide 3s infinite linear ${line.delay}`
                      }}
                    />
                  ))}
                  <style>{`
                    @keyframes scan-slide {
                      0% { transform: translateX(0); opacity: 0; }
                      20% { opacity: 1; }
                      80% { opacity: 1; }
                      100% { transform: translateX(300px); opacity: 0; }
                    }
                  `}</style>
                </div>

                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/10 border border-orange-100 z-10 relative">
                  <span className="text-3xl animate-bounce" style={{ animationDuration: '2s' }}>🦐</span>
                  {/* Radar Scan Effect */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-orange-500/30 animate-ping" style={{ animationDuration: '3s' }}></div>
                  <div className="absolute inset-0 rounded-2xl border border-orange-500/10 scale-150 animate-ping" style={{ animationDuration: '3s', animationDelay: '0.5s' }}></div>
                </div>
                
                <div className="flex flex-col items-center gap-1.5 z-10">
                  <h3 className="text-sm font-bold text-[#09090B]">正在抓取热点</h3>
                  <div className="flex flex-col items-center gap-1">
                    <p className="text-[10px] text-[#A1A1AA] font-mono">Scanning Social Media...</p>
                    <div className="flex gap-1">
                      <span className="w-1 h-1 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
                      <span className="w-1 h-1 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                      <span className="w-1 h-1 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                    </div>
                  </div>
                </div>
                
                {/* Data Cards Stacking Effect */}
                <div className="mt-6 w-48 h-24 relative">
                   <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-16 bg-white border border-[#E7E5E4] rounded-xl shadow-sm p-2 flex items-center gap-2 animate-in slide-in-from-bottom-4 fade-in duration-700" style={{ animationFillMode: 'both', animationDelay: '0.5s' }}>
                      <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center shrink-0">
                        <span className="text-xs text-red-500">🔥</span>
                      </div>
                      <div className="flex flex-col gap-1 w-full">
                         <div className="h-1.5 w-16 bg-[#E7E5E4] rounded-full"></div>
                         <div className="h-1.5 w-10 bg-[#E7E5E4]/60 rounded-full"></div>
                      </div>
                   </div>
                   <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-36 h-14 bg-white/60 border border-[#E7E5E4]/60 rounded-xl shadow-sm z-[-1] scale-95"></div>
                   <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-32 h-12 bg-white/30 border border-[#E7E5E4]/30 rounded-xl shadow-sm z-[-2] scale-90"></div>
                </div>
             </div>
             
             {/* Home Indicator */}
             <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-24 h-1 bg-black/20 rounded-full"></div>
          </div>
       </div>
    </div>
  );
}
