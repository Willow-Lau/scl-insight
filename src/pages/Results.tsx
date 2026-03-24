import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAnswers, clearSession } from "@/lib/session";
import { calculateResults, getInterpretation, FactorResult } from "@/lib/scoring";
import { Button } from "@/components/ui/button";
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
} from "recharts";
import { RotateCcw } from "lucide-react";

const statusColors: Record<string, string> = {
  normal: "bg-sage-light text-accent-foreground",
  mild: "bg-yellow-50 text-yellow-700",
  moderate: "bg-orange-50 text-orange-700",
  severe: "bg-red-50 text-red-700",
};

const Results = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState<FactorResult[]>([]);
  const [tips, setTips] = useState<string[]>([]);

  useEffect(() => {
    const answers = getAnswers();
    if (Object.keys(answers).length < 90) {
      navigate("/assessment");
      return;
    }
    const r = calculateResults(answers);
    setResults(r);
    setTips(getInterpretation(r));
  }, [navigate]);

  const handleRestart = () => {
    clearSession();
    navigate("/");
  };

  const radarData = results.map((r) => ({
    factor: r.label,
    score: r.meanScore,
    fullMark: 5,
  }));

  const barData = results.map((r) => ({
    name: r.label,
    均分: r.meanScore,
  }));

  if (results.length === 0) return null;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-serif text-foreground">测评结果</h1>
          <a href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">返回首页</a>
        </div>
      </header>

      <main className="container max-w-4xl mx-auto px-6 py-12 fade-in-up">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif text-foreground mb-3">您的 SCL-90 测评报告</h2>
          <p className="text-muted-foreground">以下是基于您的作答计算得出的 9 个因子分析结果</p>
        </div>

        {/* Radar Chart */}
        <div className="bg-card rounded-lg border border-border p-6 mb-8">
          <h3 className="font-serif text-lg mb-4 text-foreground text-center">因子均分雷达图</h3>
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis dataKey="factor" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
              <PolarRadiusAxis angle={90} domain={[0, 5]} tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
              <Radar
                name="均分"
                dataKey="score"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary))"
                fillOpacity={0.2}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-card rounded-lg border border-border p-6 mb-8">
          <h3 className="font-serif text-lg mb-4 text-foreground text-center">因子均分柱状图</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
              <YAxis domain={[0, 5]} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
              <Tooltip />
              <Bar dataKey="均分" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-center gap-6 mt-4 text-xs text-muted-foreground">
            <span>均分 &lt; 2：正常</span>
            <span>2–2.5：轻度异常</span>
            <span>2.5–3：中度异常</span>
            <span>≥ 3：显著异常</span>
          </div>
        </div>

        {/* Factor Details */}
        <div className="bg-card rounded-lg border border-border p-6 mb-8">
          <h3 className="font-serif text-lg mb-6 text-foreground">各因子详细得分</h3>
          <div className="grid gap-4">
            {results.map((r) => (
              <div key={r.factor} className="flex items-center justify-between p-4 rounded-lg bg-background border border-border">
                <div>
                  <span className="font-medium text-foreground">{r.label}</span>
                  <span className="text-sm text-muted-foreground ml-3">
                    总分 {r.totalScore}（{r.questionCount} 题）
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-lg font-serif text-foreground">{r.meanScore}</span>
                  <span className={`text-xs px-2.5 py-1 rounded-full ${statusColors[r.statusLevel]}`}>
                    {r.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interpretation */}
        <div className="bg-card rounded-lg border border-border p-6 mb-8">
          <h3 className="font-serif text-lg mb-4 text-foreground">结果解读与建议</h3>
          <div className="space-y-4">
            {tips.map((tip, i) => (
              <p key={i} className="text-sm text-muted-foreground leading-relaxed pl-4 border-l-2 border-primary/30">
                {tip}
              </p>
            ))}
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

        {/* Actions */}
        <div className="text-center">
          <Button
            onClick={handleRestart}
            variant="outline"
            size="lg"
            className="border-primary/30 text-foreground hover:bg-accent rounded-lg"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            重新测评
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Results;
