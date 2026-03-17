import React from 'react';
import type {
  UseOnboardingFlowReturn,
  AgentInfo,
  OnboardingOptions,
  SlideConfig,
  UserInfo,
} from '../../types';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { SlideRenderer } from './SlideRenderer';

interface SlidesStepProps {
  flow: UseOnboardingFlowReturn;
  agentInfo: AgentInfo;
  options: OnboardingOptions;
  renderCustomSlide?: (slide: SlideConfig, index: number) => React.ReactNode;
  renderHeader?: (userInfo: UserInfo, mode: 'new' | 'returning') => React.ReactNode;
  renderFooter?: (onComplete: () => void) => React.ReactNode;
}

export const SlidesStep: React.FC<SlidesStepProps> = ({
  flow,
  agentInfo,
  options,
  renderCustomSlide,
  renderHeader,
  renderFooter,
}) => {
  const { userInfo, mode, currentSlideIndex, currentSlide, totalSlides } = flow;

  // 默认头部渲染
  const defaultHeader = () => (
    <div className="text-center px-4 shrink-0">
      <div className="text-[18px] lg:text-[36px] font-medium leading-tight text-[#78716C] opacity-60">
        {mode === 'returning'
          ? `又见面啦，${userInfo.displayName}`
          : `很高兴认识你，${userInfo.displayName}`}
      </div>
      <h2 className="mt-1 lg:mt-2 text-[20px] lg:text-[36px] font-medium leading-tight text-[#0C0A09]">
        {mode === 'returning'
          ? '1 分钟，了解下新版扣子虾可以为你做什么'
          : '1 分钟，了解下我可以为你做什么'}
      </h2>
    </div>
  );

  // 默认底部按钮渲染
  const defaultFooter = () => (
    <div className="hidden 2xl:flex justify-center shrink-0">
      <Button
        onClick={flow.complete}
        className="h-10 w-[264px] rounded-[10px] bg-[#1C1917] text-sm font-medium text-[#FAFAF9] shadow-xs hover:bg-[#1C1917]/90 active:scale-[0.98] transition-all"
      >
        立即开始
      </Button>
    </div>
  );

  return (
    <div className="flex flex-col items-center w-full max-w-[1392px] h-full">
      {/* Header */}
      {renderHeader ? renderHeader(userInfo, mode) : defaultHeader()}

      {/* Middle Content - Mini UI Area */}
      <div className="flex items-center justify-center w-full px-2 lg:px-0 mt-6 mb-6 overflow-hidden flex-1">
        <div className="w-full max-w-[95vw] lg:w-[1200px] lg:h-[620px] lg:max-h-none h-auto max-h-[calc(100vh-220px)] p-2 lg:p-[10px] gap-3 lg:gap-[32px] bg-ivory-yellow-1 rounded-[16px] flex flex-col lg:flex-row items-center justify-center shadow-none relative overflow-hidden">
          {/* Left Column: Mini UI Area */}
          <div className="w-full lg:w-[800px] h-full lg:h-[600px] max-h-[calc(100vh-280px)] lg:max-h-[600px] p-0 lg:p-[32px] gap-[10px] rounded-[6px] relative overflow-hidden flex flex-col items-center justify-center bg-ivory-yellow-2">
            {/* Navigation Buttons Overlay */}
            {options.showNavigation && (
              <div className="absolute top-1/2 left-0 right-0 w-full px-[4px] flex justify-between items-center -translate-y-1/2 z-10 pointer-events-none lg:pointer-events-auto">
                <button
                  type="button"
                  onClick={flow.prevSlide}
                  disabled={flow.isFirstSlide}
                  className={`w-[32px] h-[32px] lg:w-[40px] lg:h-[40px] bg-black/20 lg:bg-transparent rounded-full lg:rounded-none flex items-center justify-center text-white pointer-events-auto transition-opacity ${
                    flow.isFirstSlide
                      ? 'opacity-30 cursor-not-allowed'
                      : 'hover:text-white hover:bg-black/30 lg:hover:bg-transparent'
                  }`}
                  aria-label="上一页"
                >
                  <ChevronLeft size={20} className="lg:w-[24px] lg:h-[24px]" />
                </button>

                <button
                  type="button"
                  onClick={flow.nextSlide}
                  disabled={flow.isLastSlide}
                  className={`w-[32px] h-[32px] lg:w-[40px] lg:h-[40px] bg-black/20 lg:bg-transparent rounded-full lg:rounded-none flex items-center justify-center text-white pointer-events-auto transition-opacity ${
                    flow.isLastSlide
                      ? 'opacity-30 cursor-not-allowed'
                      : 'hover:text-white hover:bg-black/30 lg:hover:bg-transparent'
                  }`}
                  aria-label="下一页"
                >
                  <ChevronRight size={20} className="lg:w-[24px] lg:h-[24px]" />
                </button>
              </div>
            )}

            {/* Slide Content */}
            {currentSlide && (
              <SlideRenderer
                slide={currentSlide}
                agentInfo={agentInfo}
                renderCustomSlide={renderCustomSlide}
              />
            )}
          </div>

          {/* Right Column: Text Content */}
          <div className="w-full lg:w-[340px] flex flex-col items-center lg:items-start gap-2 lg:gap-[32px] shrink-0 px-2 lg:px-0">
            {currentSlide && (
              <>
                <div className="w-full flex flex-col items-center lg:items-start gap-[6px] text-center lg:text-left">
                  <div className="w-full text-[14px] lg:text-[20px] font-normal leading-tight text-[#09090B]">
                    {currentSlide.title}
                  </div>
                  <p className="w-full text-[12px] lg:text-[18px] font-normal leading-tight text-[#78716C]">
                    {currentSlide.description}
                  </p>
                </div>

                {/* Dots Indicator */}
                {options.showDots && (
                  <div className="flex items-center gap-[10px] w-[220px] justify-center lg:justify-start">
                    {Array.from({ length: totalSlides }).map((_, idx) => (
                      <div
                        key={`dot-${idx}`}
                        onClick={() => flow.goToSlide(idx)}
                        className={`h-[3px] rounded-[9999px] transition-all duration-300 cursor-pointer ${
                          idx === currentSlideIndex
                            ? 'w-[52px] bg-black/50'
                            : 'w-[12px] bg-black/10 hover:bg-black/20'
                        }`}
                      />
                    ))}
                  </div>
                )}

                {/* Button for <= 1536px */}
                <div className="block 2xl:hidden mt-8">
                  <Button
                    onClick={flow.complete}
                    className="h-10 w-[264px] rounded-[10px] bg-[#1C1917] text-sm font-medium text-[#FAFAF9] shadow-xs hover:bg-[#1C1917]/90 active:scale-[0.98] transition-all"
                  >
                    立即开始
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      {renderFooter ? renderFooter(flow.complete) : defaultFooter()}
    </div>
  );
};

export default SlidesStep;
