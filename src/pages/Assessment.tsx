import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { questions, likertOptions } from "@/data/scl90-questions";
import { getAnswers, saveAnswer, getCurrentQuestion, saveCurrentQuestion } from "@/lib/session";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Assessment = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showSkipHint, setShowSkipHint] = useState(false);

  useEffect(() => {
    const saved = getAnswers();
    const savedIndex = getCurrentQuestion();
    setAnswers(saved);
    if (savedIndex > 0 && savedIndex < 90) {
      setCurrentIndex(savedIndex);
    }
  }, []);

  const question = questions[currentIndex];
  const progress = (Object.keys(answers).length / 90) * 100;
  const selectedValue = answers[question.id];

  const handleSelect = useCallback((value: number) => {
    const newAnswers = { ...answers, [question.id]: value };
    setAnswers(newAnswers);
    saveAnswer(question.id, value);
    setShowSkipHint(false);

    // Auto advance after short delay
    setTimeout(() => {
      if (currentIndex < 89) {
        const nextIndex = currentIndex + 1;
        setCurrentIndex(nextIndex);
        saveCurrentQuestion(nextIndex);
      } else if (Object.keys(newAnswers).length === 90) {
        navigate("/results");
      }
    }, 300);
  }, [answers, question.id, currentIndex, navigate]);

  const handlePrev = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      saveCurrentQuestion(prevIndex);
      setShowSkipHint(false);
    }
  };

  const handleNext = () => {
    if (!selectedValue) {
      setShowSkipHint(true);
      return;
    }
    if (currentIndex < 89) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      saveCurrentQuestion(nextIndex);
      setShowSkipHint(false);
    } else if (Object.keys(answers).length === 90) {
      navigate("/results");
    }
  };

  const handleForceSkip = () => {
    if (currentIndex < 89) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      saveCurrentQuestion(nextIndex);
      setShowSkipHint(false);
    }
  };

  const handleSubmit = () => {
    const unanswered = questions.filter((q) => !answers[q.id]);
    if (unanswered.length > 0) {
      setCurrentIndex(questions.indexOf(unanswered[0]));
      setShowSkipHint(true);
      return;
    }
    navigate("/results");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container max-w-3xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-lg font-serif text-foreground">SCL-90 测评</h1>
            <span className="text-sm text-muted-foreground">
              第 {currentIndex + 1} / 90 题
            </span>
          </div>
          <Progress value={progress} className="h-1.5" />
        </div>
      </header>

      {/* Question */}
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-xl fade-in" key={question.id}>
          <div className="text-center mb-10">
            <span className="text-sm text-muted-foreground mb-4 block">
              请根据最近一周内的实际感受，选择最符合您的选项
            </span>
            <h2 className="text-2xl md:text-3xl font-serif text-foreground leading-relaxed">
              {question.id}. {question.content}
            </h2>
          </div>

          {/* Options */}
          <div className="space-y-3 mb-8">
            {likertOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleSelect(opt.value)}
                className={`w-full text-left px-6 py-4 rounded-lg border transition-all duration-200 ${
                  selectedValue === opt.value
                    ? "border-primary bg-sage-light shadow-sm"
                    : "border-border bg-card hover:border-primary/40 hover:bg-accent/50"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-medium transition-colors ${
                      selectedValue === opt.value
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-muted-foreground/30 text-muted-foreground"
                    }`}
                  >
                    {opt.value}
                  </div>
                  <div>
                    <span className="font-medium text-foreground">{opt.label}</span>
                    <span className="text-sm text-muted-foreground ml-2">{opt.description}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Skip hint */}
          {showSkipHint && (
            <div className="text-center mb-6 fade-in">
              <p className="text-sm text-muted-foreground mb-2">
                这道题还没有作答，建议您完成后再继续
              </p>
              <button
                onClick={handleForceSkip}
                className="text-sm text-primary hover:underline"
              >
                仍然跳过
              </button>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="text-muted-foreground"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              上一题
            </Button>

            {currentIndex === 89 ? (
              <Button
                onClick={handleSubmit}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
              >
                提交测评
              </Button>
            ) : (
              <Button
                variant="ghost"
                onClick={handleNext}
                className="text-muted-foreground"
              >
                下一题
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Assessment;
