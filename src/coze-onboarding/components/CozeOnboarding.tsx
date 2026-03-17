import React, { useMemo } from 'react';
import type { CozeOnboardingProps } from '../types';
import { useOnboardingFlow } from '../hooks/useOnboardingFlow';
import { DEFAULT_AGENT_INFO, DEFAULT_OPTIONS } from '../config/defaults';
import { OnboardingContainer } from './OnboardingContainer';
import { NameInputStep } from './slides/NameInputStep';
import { SlidesStep } from './slides/SlidesStep';

// 合并默认配置
function mergeWithDefaults(props: CozeOnboardingProps) {
  const agentInfo = {
    ...DEFAULT_AGENT_INFO,
    ...props.agentInfo,
  };

  const options = {
    ...DEFAULT_OPTIONS,
    ...props.options,
    responsive: {
      ...DEFAULT_OPTIONS.responsive,
      ...props.options?.responsive,
    },
    theme: {
      ...DEFAULT_OPTIONS.theme,
      ...props.options?.theme,
    },
  };

  return { agentInfo, options };
}

/**
 * CozeOnboarding - 可复用的引导流程组件
 * 
 * @example
 * ```tsx
 * <CozeOnboarding
 *   onComplete={() => console.log('completed')}
 *   agentInfo={{ name: '扣子虾', emoji: '🦐' }}
 *   mode="new"
 * />
 * ```
 */
export const CozeOnboarding: React.FC<CozeOnboardingProps> = (props) => {
  const {
    onComplete,
    initialUserName,
    slides: customSlides,
    mode = 'new',
    className,
    style,
    renderCustomSlide,
    renderHeader,
    renderFooter,
  } = props;

  const { agentInfo, options } = useMemo(() => mergeWithDefaults(props), [props]);

  // 使用流程管理 hook
  const flow = useOnboardingFlow({
    initialMode: mode,
    initialUserName,
    slides: customSlides,
    onComplete,
    onStepChange: props.onStepChange,
    onSlideChange: props.onSlideChange,
  });

  // 渲染当前步骤
  const renderStep = () => {
    switch (flow.step) {
      case 'name':
        return (
          <NameInputStep
            userName={flow.userInfo.name}
            onUserNameChange={flow.setUserName}
            onNext={() => flow.setStep('slides')}
            agentInfo={agentInfo}
          />
        );
      case 'slides':
        return (
          <SlidesStep
            flow={flow}
            agentInfo={agentInfo}
            options={options}
            renderCustomSlide={renderCustomSlide}
            renderHeader={renderHeader}
            renderFooter={renderFooter}
          />
        );
      default:
        return null;
    }
  };

  return (
    <OnboardingContainer
      className={className}
      style={style}
      theme={options.theme}
    >
      {renderStep()}
    </OnboardingContainer>
  );
};

export default CozeOnboarding;
