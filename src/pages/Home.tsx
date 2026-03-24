import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { hasIncompleteSession, clearSession } from "@/lib/session";
import { useState, useEffect } from "react";

const Home = () => {
  const navigate = useNavigate();
  const [showResume, setShowResume] = useState(false);

  useEffect(() => {
    setShowResume(hasIncompleteSession());
  }, []);

  const handleStart = () => {
    clearSession();
    navigate("/assessment");
  };

  const handleResume = () => {
    navigate("/assessment");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-serif text-foreground">SCL-90</h1>
          <nav className="flex gap-6 text-sm">
            <a href="/about" className="text-muted-foreground hover:text-foreground transition-colors">关于量表</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <main className="container max-w-4xl mx-auto px-6 py-16 fade-in-up">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full bg-sage-light text-accent-foreground text-sm mb-6">
            专业心理健康筛查工具
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-foreground leading-tight mb-6">
            SCL-90 心理健康自评量表
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            症状自评量表（SCL-90）是当前使用最广泛的心理健康测评工具之一，
            包含 90 个项目，涵盖感觉、情感、思维、行为等多个方面，
            帮助您全面了解自身心理健康状况。
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-card rounded-lg p-6 border border-border fade-in-delay">
            <div className="w-10 h-10 rounded-lg bg-sage-light flex items-center justify-center mb-4">
              <span className="text-accent-foreground font-serif text-lg">9</span>
            </div>
            <h3 className="font-serif text-lg mb-2 text-foreground">9 大因子</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              涵盖躯体化、强迫、人际敏感、抑郁、焦虑、敌对、恐怖、偏执、精神病性等维度
            </p>
          </div>
          <div className="bg-card rounded-lg p-6 border border-border fade-in-delay" style={{ animationDelay: "0.3s" }}>
            <div className="w-10 h-10 rounded-lg bg-sage-light flex items-center justify-center mb-4">
              <span className="text-accent-foreground font-serif text-lg">90</span>
            </div>
            <h3 className="font-serif text-lg mb-2 text-foreground">90 道题目</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              采用 5 级评分制，预计完成时间约 15–20 分钟，中途可暂停保存
            </p>
          </div>
          <div className="bg-card rounded-lg p-6 border border-border fade-in-delay" style={{ animationDelay: "0.4s" }}>
            <div className="w-10 h-10 rounded-lg bg-sage-light flex items-center justify-center mb-4">
              <span className="text-accent-foreground font-serif text-lg">✦</span>
            </div>
            <h3 className="font-serif text-lg mb-2 text-foreground">专业解读</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              完成后即时获得各因子分数、可视化图表及针对性心理健康建议
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-muted/50 border border-border rounded-lg p-6 mb-10 text-center">
          <p className="text-sm text-muted-foreground leading-relaxed">
            <span className="font-medium text-foreground">免责声明：</span>
            本量表为心理健康筛查评估工具，仅供参考，不能替代专业心理诊断。
            如您正在经历严重的心理困扰，请及时寻求专业心理咨询师或精神科医生的帮助。
          </p>
        </div>

        {/* CTA */}
        <div className="text-center space-y-4">
          <Button
            onClick={handleStart}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-6 text-lg rounded-lg transition-all duration-300 hover:shadow-lg"
          >
            开始测评
          </Button>
          {showResume && (
            <div>
              <Button
                onClick={handleResume}
                variant="outline"
                size="lg"
                className="border-primary/30 text-foreground hover:bg-accent px-8 py-5 rounded-lg"
              >
                继续上次未完成的测评
              </Button>
            </div>
          )}
          <p className="text-sm text-muted-foreground">预计完成时间：15–20 分钟</p>
        </div>
      </main>
    </div>
  );
};

export default Home;
