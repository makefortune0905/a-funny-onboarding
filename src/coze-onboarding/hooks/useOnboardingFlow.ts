import { useState, useMemo, useCallback } from 'react';
import type {
  OnboardingStep,
  OnboardingMode,
  UserInfo,
  SlideConfig,
  UseOnboardingFlowReturn,
} from '../types';
import {
  DEFAULT_USER_NAME,
  getDefaultSlides,
} from '../config/defaults';

interface UseOnboardingFlowOptions {
  initialStep?: OnboardingStep;
  initialMode?: OnboardingMode;
  initialUserName?: string;
  slides?: SlideConfig[];
  onComplete?: () => void;
  onStepChange?: (step: OnboardingStep) => void;
  onSlideChange?: (index: number, slide: SlideConfig) => void;
}

export function useOnboardingFlow(
  options: UseOnboardingFlowOptions = {}
): UseOnboardingFlowReturn {
  const {
    initialStep = 'name',
    initialMode = 'new',
    initialUserName = DEFAULT_USER_NAME,
    slides: customSlides,
    onComplete: onCompleteCallback,
    onStepChange,
    onSlideChange,
  } = options;

  // 流程状态
  const [step, setStep] = useState<OnboardingStep>(initialStep);
  const [mode, setMode] = useState<OnboardingMode>(initialMode);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  
  // 用户信息
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: initialUserName,
    displayName: initialUserName,
  });

  // Slides 数据
  const slides = useMemo(() => {
    return customSlides || getDefaultSlides(mode);
  }, [customSlides, mode]);

  // 计算属性
  const currentSlide = useMemo(() => {
    return slides[currentSlideIndex] || null;
  }, [slides, currentSlideIndex]);

  const totalSlides = useMemo(() => slides.length, [slides]);
  const isFirstSlide = useMemo(() => currentSlideIndex === 0, [currentSlideIndex]);
  const isLastSlide = useMemo(
    () => currentSlideIndex === totalSlides - 1,
    [currentSlideIndex, totalSlides]
  );

  // 设置步骤
  const handleSetStep = useCallback((newStep: OnboardingStep) => {
    setStep(newStep);
    onStepChange?.(newStep);
  }, [onStepChange]);

  // 设置模式
  const handleSetMode = useCallback((newMode: OnboardingMode) => {
    setMode(newMode);
    // 重置 slide 索引
    setCurrentSlideIndex(0);
  }, []);

  // 设置用户名
  const handleSetUserName = useCallback((name: string) => {
    setUserInfo(prev => ({
      ...prev,
      name,
      displayName: name || prev.displayName,
    }));
  }, []);

  // 跳转到指定 slide
  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index < totalSlides) {
      setCurrentSlideIndex(index);
      const slide = slides[index];
      if (slide) {
        onSlideChange?.(index, slide);
      }
    }
  }, [totalSlides, slides, onSlideChange]);

  // 下一个 slide
  const nextSlide = useCallback(() => {
    if (!isLastSlide) {
      const newIndex = currentSlideIndex + 1;
      setCurrentSlideIndex(newIndex);
      const slide = slides[newIndex];
      if (slide) {
        onSlideChange?.(newIndex, slide);
      }
    }
  }, [isLastSlide, currentSlideIndex, slides, onSlideChange]);

  // 上一个 slide
  const prevSlide = useCallback(() => {
    if (!isFirstSlide) {
      const newIndex = currentSlideIndex - 1;
      setCurrentSlideIndex(newIndex);
      const slide = slides[newIndex];
      if (slide) {
        onSlideChange?.(newIndex, slide);
      }
    }
  }, [isFirstSlide, currentSlideIndex, slides, onSlideChange]);

  // 完成流程
  const complete = useCallback(() => {
    onCompleteCallback?.();
  }, [onCompleteCallback]);

  return {
    // 状态
    step,
    mode,
    currentSlideIndex,
    userInfo,
    
    // 方法
    setStep: handleSetStep,
    setMode: handleSetMode,
    setUserName: handleSetUserName,
    goToSlide,
    nextSlide,
    prevSlide,
    complete,
    
    // 计算属性
    currentSlide,
    totalSlides,
    isFirstSlide,
    isLastSlide,
  };
}
