const About = () => {
  const factors = [
    { name: "躯体化", desc: "反映身体不适感，包括心血管、胃肠道、呼吸和其他系统的主观不适。涉及题目：1、4、12、27、40、42、48、49、52、53、56、58。" },
    { name: "强迫症状", desc: "反映与强迫症状群相联系的行为和体验，包括那些明知没有必要但无法摆脱的思想、冲动和行为。涉及题目：3、9、10、28、38、45、46、51、55、65。" },
    { name: "人际关系敏感", desc: "反映个人的不自在感与自卑感，尤其是在与他人比较时更加突出。涉及题目：6、21、34、36、37、41、61、69。" },
    { name: "抑郁", desc: "反映与临床上抑郁症状群相联系的广泛概念，包括苦闷的情感与心境、对生活兴趣的减退等。涉及题目：5、14、15、19、20、26、29、30、32、44、54、59、60、64、71、79、89。" },
    { name: "焦虑", desc: "反映焦虑症状及焦虑发作时的身体征象，包括神经过敏、紧张和惊恐发作等。涉及题目：2、17、23、33、39、57、66、72、78、82。" },
    { name: "敌对", desc: "反映敌对的思想、感情及行为，包括厌烦、争论和不可控制的脾气暴发等。涉及题目：11、24、63、67、74、81。" },
    { name: "恐怖", desc: "反映恐惧性焦虑体验，更多的是指社交恐惧、广场恐惧等。涉及题目：13、25、47、50、70、73、75。" },
    { name: "偏执", desc: "反映猜疑和关系妄想等偏执思维，包括投射思维、敌意、猜疑、被动攻击等。涉及题目：8、18、22、43、68、76、83。" },
    { name: "精神病性", desc: "反映各式各样的急性症状和行为，即限定不严的精神病性过程的指标。涉及题目：7、16、35、62、77、80、84、85、86、87、88、90。" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="text-xl font-serif text-foreground hover:text-primary transition-colors">SCL-90</a>
          <nav className="flex gap-6 text-sm">
            <a href="/" className="text-muted-foreground hover:text-foreground transition-colors">首页</a>
          </nav>
        </div>
      </header>

      <main className="container max-w-3xl mx-auto px-6 py-12 fade-in-up">
        <h2 className="text-3xl font-serif text-foreground mb-8">关于 SCL-90</h2>

        <section className="mb-10">
          <h3 className="font-serif text-xl text-foreground mb-4">量表由来与发展</h3>
          <div className="text-muted-foreground leading-relaxed space-y-3 text-sm">
            <p>
              症状自评量表（Symptom Checklist 90，简称 SCL-90）由美国心理学家 L.R. Derogatis 于 1973 年编制。
              该量表是从 Hopkins 症状清单（HSCL）发展而来，是当前使用最为广泛的精神障碍和心理疾病门诊检查量表。
            </p>
            <p>
              SCL-90 包含 90 个条目，采用 5 级评分制（1–5 分），适用于 16 岁以上的人群。
              它能够反映测试者在感觉、情感、思维、行为、人际关系以及生活习惯等方面的心理健康状况。
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h3 className="font-serif text-xl text-foreground mb-4">9 个因子详解</h3>
          <div className="space-y-4">
            {factors.map((f) => (
              <div key={f.name} className="p-5 bg-card rounded-lg border border-border">
                <h4 className="font-serif text-foreground mb-2">{f.name}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h3 className="font-serif text-xl text-foreground mb-4">计分方式与参考阈值</h3>
          <div className="text-muted-foreground leading-relaxed space-y-3 text-sm bg-card rounded-lg border border-border p-6">
            <p><strong className="text-foreground">计分方式：</strong>每个因子的均分 = 该因子所含题目的总分 ÷ 该因子的题目数</p>
            <p><strong className="text-foreground">参考阈值：</strong></p>
            <ul className="list-disc pl-5 space-y-1">
              <li>因子均分 &lt; 2 分：正常范围</li>
              <li>因子均分 2 – 2.5 分：轻度异常</li>
              <li>因子均分 2.5 – 3 分：中度异常</li>
              <li>因子均分 ≥ 3 分：显著异常，建议寻求专业帮助</li>
            </ul>
            <p className="mt-3 text-xs">
              注：以上阈值为一般参考标准，具体解读需结合个人情况和专业判断。
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;
