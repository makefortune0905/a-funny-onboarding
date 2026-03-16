import React, { useState } from 'react';
import { OnboardingFlow } from './components/OnboardingFlow';
import { Button } from './components/ui/button';
import { Bot, MessageSquare, LayoutGrid, Database, Image, Settings } from 'lucide-react';

const App: React.FC = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);

  const startOnboarding = () => {
    setShowOnboarding(true);
  };

  const completeOnboarding = () => {
    setShowOnboarding(false);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background text-foreground">
      {/* Sidebar Simulation */}
      <div className="flex w-16 flex-col items-center border-r border-border bg-muted/30 py-4">
        <button
          onClick={startOnboarding}
          className="mb-6 flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm hover:opacity-90 transition-opacity"
          title="点击 Logo 开始 Onboarding 流程"
        >
          <Bot size={24} />
        </button>

        <div className="flex flex-1 flex-col gap-2 w-full px-2">
          <Button variant="ghost" size="icon" className="w-full rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground">
            <MessageSquare size={20} />
          </Button>
          <Button variant="ghost" size="icon" className="w-full rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground">
            <LayoutGrid size={20} />
          </Button>
          <Button variant="ghost" size="icon" className="w-full rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground">
            <Database size={20} />
          </Button>
          <Button variant="ghost" size="icon" className="w-full rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground">
            <Image size={20} />
          </Button>
        </div>

        <div className="mt-auto px-2 w-full">
          <Button variant="ghost" size="icon" className="w-full rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground">
            <Settings size={20} />
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative">
        {showOnboarding ? (
          <div className="absolute inset-0 z-50 bg-background">
            <OnboardingFlow onComplete={completeOnboarding} />
          </div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center p-8 text-center">
            <div className="max-w-md space-y-6">
              <div className="h-24 w-24 bg-muted rounded-full mx-auto flex items-center justify-center mb-6">
                <Bot size={48} className="text-muted-foreground" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight">欢迎使用 Coze Demo</h1>
              <p className="text-muted-foreground text-lg">
                这是一个独立的 Onboarding 流程演示项目。
              </p>
              <div className="p-4 bg-muted/50 rounded-xl border border-border text-sm text-left">
                <p className="font-medium mb-2">如何使用：</p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>点击左上角的 <strong className="text-primary">Logo</strong> 图标</li>
                  <li>或者点击下方的按钮</li>
                </ul>
              </div>
              <Button size="lg" onClick={startOnboarding} className="w-full">
                开始 Onboarding 演示
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
