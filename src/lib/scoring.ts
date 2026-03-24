import { Factor, factorLabels, questions } from "@/data/scl90-questions";

export interface FactorResult {
  factor: Factor;
  label: string;
  totalScore: number;
  questionCount: number;
  meanScore: number;
  status: string;
  statusLevel: "normal" | "mild" | "moderate" | "severe";
}

function getStatus(mean: number): { status: string; statusLevel: FactorResult["statusLevel"] } {
  if (mean < 2) return { status: "正常", statusLevel: "normal" };
  if (mean < 2.5) return { status: "轻度异常", statusLevel: "mild" };
  if (mean < 3) return { status: "中度异常", statusLevel: "moderate" };
  return { status: "显著异常", statusLevel: "severe" };
}

export function calculateResults(answers: Record<number, number>): FactorResult[] {
  const factorQuestions: Record<Factor, number[]> = {} as any;

  for (const q of questions) {
    if (!factorQuestions[q.factor]) factorQuestions[q.factor] = [];
    factorQuestions[q.factor].push(q.id);
  }

  const factors: Factor[] = [
    "somatization", "obsessive_compulsive", "interpersonal_sensitivity",
    "depression", "anxiety", "hostility", "phobic_anxiety",
    "paranoid_ideation", "psychoticism",
  ];

  return factors.map((factor) => {
    const qIds = factorQuestions[factor] || [];
    const totalScore = qIds.reduce((sum, id) => sum + (answers[id] || 1), 0);
    const meanScore = qIds.length > 0 ? totalScore / qIds.length : 0;
    const { status, statusLevel } = getStatus(meanScore);

    return {
      factor,
      label: factorLabels[factor],
      totalScore,
      questionCount: qIds.length,
      meanScore: Math.round(meanScore * 100) / 100,
      status,
      statusLevel,
    };
  });
}

export function getInterpretation(results: FactorResult[]): string[] {
  const interpretations: Record<Factor, string> = {
    somatization: "躯体化因子反映身体不适感，包括心血管、胃肠道、呼吸等系统的主诉不适。您可能正在经历一些身体上的不适，建议关注身体健康，必要时进行体检。",
    obsessive_compulsive: "强迫症状因子反映那些明知没有必要但又无法摆脱的思想、冲动和行为。建议尝试放松训练，减少对重复行为的关注。",
    interpersonal_sensitivity: "人际关系敏感因子反映个人不自在感与自卑感，尤其是在与他人比较时。建议多参与社交活动，建立积极的人际关系。",
    depression: "抑郁因子反映与临床抑郁症状群相联系的广泛概念。建议保持规律作息，适当运动，与亲友保持联系，必要时寻求专业帮助。",
    anxiety: "焦虑因子反映焦虑症状及焦虑发作时的身体征象。建议练习深呼吸和放松技巧，减少不必要的压力源。",
    hostility: "敌对因子反映敌对的思想、感情及行为。建议学习情绪管理技巧，尝试用建设性的方式表达不满。",
    phobic_anxiety: "恐怖因子反映恐惧性焦虑体验，对特定场所、事物的回避行为。建议逐步面对引起恐惧的情境，必要时寻求专业心理治疗。",
    paranoid_ideation: "偏执因子反映猜疑和关系妄想等偏执思维。建议与信任的人交流，尝试从不同角度看待问题。",
    psychoticism: "精神病性因子反映各式各样的急性症状和行为。如果此项得分较高，建议尽早寻求专业心理或精神科医生的帮助。",
  };

  const tips: string[] = [];
  const abnormal = results.filter((r) => r.meanScore >= 2.5);

  if (abnormal.length === 0) {
    tips.push("您的各项因子均分均在正常范围内，请继续保持良好的心理状态。以下是一些通用的心理健康建议：保持规律作息、适当运动、维持良好的社交关系。");
  } else {
    for (const r of abnormal) {
      tips.push(interpretations[r.factor]);
    }
  }

  const severeCount = results.filter((r) => r.meanScore >= 3).length;
  if (severeCount >= 2) {
    tips.push("⚠️ 您有多项因子均分达到或超过 3 分，建议您尽快寻求专业心理咨询师或精神科医生的帮助，进行进一步的评估和干预。");
  }

  return tips;
}
