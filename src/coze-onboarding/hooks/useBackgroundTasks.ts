import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import type { BackgroundTask } from '../types';
import { DEFAULT_BACKGROUND_TASKS, TASK_POOL } from '../config/defaults';

interface UseBackgroundTasksOptions {
  initialTasks?: BackgroundTask[];
  taskPool?: typeof TASK_POOL;
  isActive?: boolean;
  interval?: number;
}

interface UseBackgroundTasksReturn {
  tasks: BackgroundTask[];
  completedCount: number;
  isProcessing: boolean;
  start: () => void;
  stop: () => void;
  reset: () => void;
  addTask: (task: Omit<BackgroundTask, 'id'>) => void;
  removeTask: (taskId: string) => void;
}

export function useBackgroundTasks(
  options: UseBackgroundTasksOptions = {}
): UseBackgroundTasksReturn {
  const {
    initialTasks = DEFAULT_BACKGROUND_TASKS,
    taskPool = TASK_POOL,
    isActive: initialActive = false,
    interval = 1500,
  } = options;

  const [tasks, setTasks] = useState<BackgroundTask[]>(initialTasks);
  const [completedCount, setCompletedCount] = useState(0);
  const [isActive, setIsActive] = useState(initialActive);
  const isProcessingRef = useRef(false);

  // 开始任务动画
  const start = useCallback(() => {
    setIsActive(true);
  }, []);

  // 停止任务动画
  const stop = useCallback(() => {
    setIsActive(false);
  }, []);

  // 重置任务
  const reset = useCallback(() => {
    setTasks(initialTasks);
    setCompletedCount(0);
    isProcessingRef.current = false;
  }, [initialTasks]);

  // 添加任务
  const addTask = useCallback((task: Omit<BackgroundTask, 'id'>) => {
    const newTask: BackgroundTask = {
      ...task,
      id: `task-${Date.now()}`,
    };
    setTasks(prev => [...prev, newTask]);
  }, []);

  // 移除任务
  const removeTask = useCallback((taskId: string) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
  }, []);

  // 任务动画循环
  useEffect(() => {
    if (!isActive) return;

    let isProcessing = false;

    // 初始序列动画
    const sequenceTimer = setTimeout(() => {
      setTasks(prev => {
        const newTasks = [...prev];
        if (newTasks.length > 0) {
          newTasks[0] = { ...newTasks[0], progress: 100 };
        }
        return newTasks;
      });
    }, 500);

    const timer = setInterval(() => {
      if (isProcessing) return;
      isProcessing = true;
      isProcessingRef.current = true;

      setTasks(prev => {
        const newTasks = [...prev];
        const firstActiveIdx = newTasks.findIndex(t => t.status !== 'exiting');

        if (firstActiveIdx === -1) {
          isProcessing = false;
          isProcessingRef.current = false;
          return prev;
        }

        const currentTask = newTasks[firstActiveIdx];

        if (currentTask.progress >= 100) {
          newTasks[firstActiveIdx] = { ...currentTask, status: 'exiting' };
        } else {
          newTasks[firstActiveIdx] = { ...currentTask, progress: 100 };
          isProcessing = false;
          isProcessingRef.current = false;
          return newTasks;
        }

        return newTasks;
      });

      // 移除已完成的任务并添加新任务
      setTimeout(() => {
        setTasks(prev => {
          if (!prev.some(t => t.status === 'exiting')) {
            return prev;
          }

          const remaining = prev.filter(t => t.status !== 'exiting');
          const nextTaskTemplate = taskPool[Math.floor(Math.random() * taskPool.length)];

          return [
            ...remaining,
            {
              id: `task-${Date.now()}`,
              title: nextTaskTemplate.title,
              icon: nextTaskTemplate.icon,
              color: nextTaskTemplate.color,
              progress: 0,
              status: 'entering',
            },
          ];
        });

        setCompletedCount(c => c + 1);
        isProcessing = false;
        isProcessingRef.current = false;
      }, 500);
    }, interval);

    return () => {
      clearInterval(timer);
      clearTimeout(sequenceTimer);
    };
  }, [isActive, interval, taskPool]);

  return {
    tasks,
    completedCount,
    isProcessing: isProcessingRef.current,
    start,
    stop,
    reset,
    addTask,
    removeTask,
  };
}
