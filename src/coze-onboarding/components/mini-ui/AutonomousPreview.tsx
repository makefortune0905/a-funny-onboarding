import React from 'react';
import type { BackgroundTask } from '../../types';
import { useBackgroundTasks } from '../../hooks/useBackgroundTasks';

interface AutonomousPreviewProps {
  tasks: BackgroundTask[];
}

export const AutonomousPreview: React.FC<AutonomousPreviewProps> = ({
  tasks: initialTasks,
}) => {
  const { tasks, completedCount } = useBackgroundTasks({
    initialTasks,
    isActive: true,
  });

  return (
    <div className="w-[700px] h-[500px] flex flex-col items-center bg-[#FAFAF9] border border-black/10 rounded-[10px] shadow-2xl overflow-hidden relative">
      {/* Header */}
      <div className="w-full h-[56px] flex items-center px-4 bg-[#FAFAF9] border-b border-[#E7E5E4] shrink-0">
        <span className="text-[14px] font-medium text-[#09090B]">背景任务</span>
      </div>

      {/* Task List */}
      <div className="flex-1 w-full p-4 overflow-y-auto">
        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center gap-3 p-3 rounded-lg border border-[#E7E5E4] bg-white"
              style={{ backgroundColor: task.color }}
            >
              <task.icon className="w-5 h-5 text-[#3F3F46]" />
              <div className="flex-1">
                <p className="text-sm text-[#09090B]">{task.title}</p>
                <div className="w-full h-1 bg-gray-200 rounded-full mt-2">
                  <div
                    className="h-full bg-[#1C1917] rounded-full transition-all duration-500"
                    style={{ width: `${task.progress}%` }}
                  />
                </div>
              </div>
              <span className="text-xs text-[#78716C]">{task.progress}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Completed Count */}
      <div className="absolute bottom-4 right-4 px-3 py-1 bg-white rounded-full shadow-md">
        <span className="text-xs text-[#3F3F46]">
          已完成: {completedCount}
        </span>
      </div>
    </div>
  );
};

export default AutonomousPreview;
