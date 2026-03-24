export type Factor =
  | "somatization"
  | "obsessive_compulsive"
  | "interpersonal_sensitivity"
  | "depression"
  | "anxiety"
  | "hostility"
  | "phobic_anxiety"
  | "paranoid_ideation"
  | "psychoticism";

export const factorLabels: Record<Factor, string> = {
  somatization: "躯体化",
  obsessive_compulsive: "强迫症状",
  interpersonal_sensitivity: "人际关系敏感",
  depression: "抑郁",
  anxiety: "焦虑",
  hostility: "敌对",
  phobic_anxiety: "恐怖",
  paranoid_ideation: "偏执",
  psychoticism: "精神病性",
};

export interface Question {
  id: number;
  content: string;
  factor: Factor;
}

export const questions: Question[] = [
  { id: 1, content: "头痛", factor: "somatization" },
  { id: 2, content: "神经过敏，心中不踏实", factor: "anxiety" },
  { id: 3, content: "头脑中有不必要的想法或字句盘旋", factor: "obsessive_compulsive" },
  { id: 4, content: "头昏或昏倒", factor: "somatization" },
  { id: 5, content: "对异性的兴趣减退", factor: "depression" },
  { id: 6, content: "对旁人责备求全", factor: "interpersonal_sensitivity" },
  { id: 7, content: "感到别人能控制您的思想", factor: "psychoticism" },
  { id: 8, content: "责怪别人制造麻烦", factor: "paranoid_ideation" },
  { id: 9, content: "忘记性大", factor: "obsessive_compulsive" },
  { id: 10, content: "担心自己的衣饰整齐及仪态的端正", factor: "obsessive_compulsive" },
  { id: 11, content: "容易烦恼和激动", factor: "hostility" },
  { id: 12, content: "胸痛", factor: "somatization" },
  { id: 13, content: "害怕空旷的场所或街道", factor: "phobic_anxiety" },
  { id: 14, content: "感到自己的精力下降，活动减慢", factor: "depression" },
  { id: 15, content: "想结束自己的生命", factor: "depression" },
  { id: 16, content: "听到旁人听不到的声音", factor: "psychoticism" },
  { id: 17, content: "发抖", factor: "anxiety" },
  { id: 18, content: "感到大多数人都不可信任", factor: "paranoid_ideation" },
  { id: 19, content: "胃口不好", factor: "depression" },
  { id: 20, content: "容易哭泣", factor: "depression" },
  { id: 21, content: "同异性相处时感到害羞不自在", factor: "interpersonal_sensitivity" },
  { id: 22, content: "感到受骗，中了圈套或有人想抓住您", factor: "paranoid_ideation" },
  { id: 23, content: "无缘无故地突然感到害怕", factor: "anxiety" },
  { id: 24, content: "自己不能控制地大发脾气", factor: "hostility" },
  { id: 25, content: "怕单独出门", factor: "phobic_anxiety" },
  { id: 26, content: "经常责怪自己", factor: "depression" },
  { id: 27, content: "腰痛", factor: "somatization" },
  { id: 28, content: "感到难以完成任务", factor: "obsessive_compulsive" },
  { id: 29, content: "感到孤独", factor: "depression" },
  { id: 30, content: "感到苦闷", factor: "depression" },
  { id: 31, content: "过分担忧", factor: "obsessive_compulsive" },
  { id: 32, content: "对事物不感兴趣", factor: "depression" },
  { id: 33, content: "感到害怕", factor: "anxiety" },
  { id: 34, content: "您的感情容易受到伤害", factor: "interpersonal_sensitivity" },
  { id: 35, content: "旁人能知道您的私下想法", factor: "psychoticism" },
  { id: 36, content: "感到别人不理解您、不同情您", factor: "interpersonal_sensitivity" },
  { id: 37, content: "感到人们对您不友好，不喜欢您", factor: "interpersonal_sensitivity" },
  { id: 38, content: "做事必须做得很慢以保证做得正确", factor: "obsessive_compulsive" },
  { id: 39, content: "心跳得很厉害", factor: "anxiety" },
  { id: 40, content: "恶心或胃部不舒服", factor: "somatization" },
  { id: 41, content: "感到比不上他人", factor: "interpersonal_sensitivity" },
  { id: 42, content: "肌肉酸痛", factor: "somatization" },
  { id: 43, content: "感到有人在监视您、谈论您", factor: "paranoid_ideation" },
  { id: 44, content: "难以入睡", factor: "depression" },
  { id: 45, content: "做事必须反复检查", factor: "obsessive_compulsive" },
  { id: 46, content: "难以做出决定", factor: "obsessive_compulsive" },
  { id: 47, content: "怕乘电车、公共汽车、地铁或火车", factor: "phobic_anxiety" },
  { id: 48, content: "呼吸有困难", factor: "somatization" },
  { id: 49, content: "一阵阵发冷或发热", factor: "somatization" },
  { id: 50, content: "因为感到害怕而避开某些东西、场合或活动", factor: "phobic_anxiety" },
  { id: 51, content: "脑子变空了", factor: "obsessive_compulsive" },
  { id: 52, content: "身体发麻或刺痛", factor: "somatization" },
  { id: 53, content: "喉咙有梗塞感", factor: "somatization" },
  { id: 54, content: "感到前途没有希望", factor: "depression" },
  { id: 55, content: "不能集中注意力", factor: "obsessive_compulsive" },
  { id: 56, content: "感到身体的某一部分软弱无力", factor: "somatization" },
  { id: 57, content: "感到紧张或容易紧张", factor: "anxiety" },
  { id: 58, content: "感到手脚发重", factor: "somatization" },
  { id: 59, content: "想到死亡的事", factor: "depression" },
  { id: 60, content: "吃得太多", factor: "depression" },
  { id: 61, content: "当别人看着您或谈论您时感到不自在", factor: "interpersonal_sensitivity" },
  { id: 62, content: "有一些不属于您自己的想法", factor: "psychoticism" },
  { id: 63, content: "有想打人或伤害他人的冲动", factor: "hostility" },
  { id: 64, content: "醒得太早", factor: "depression" },
  { id: 65, content: "必须反复洗手、点数目或触摸某些东西", factor: "obsessive_compulsive" },
  { id: 66, content: "睡得不稳不深", factor: "anxiety" },
  { id: 67, content: "有想摔坏或破坏东西的冲动", factor: "hostility" },
  { id: 68, content: "有一些别人没有的想法或念头", factor: "paranoid_ideation" },
  { id: 69, content: "感到对别人神经过敏", factor: "interpersonal_sensitivity" },
  { id: 70, content: "在商店或电影院等人多的地方感到不自在", factor: "phobic_anxiety" },
  { id: 71, content: "感到任何事情都很困难", factor: "depression" },
  { id: 72, content: "一阵阵恐惧或惊恐", factor: "anxiety" },
  { id: 73, content: "感到在公共场合吃东西很不舒服", factor: "phobic_anxiety" },
  { id: 74, content: "经常与人争论", factor: "hostility" },
  { id: 75, content: "单独一人时神经很紧张", factor: "phobic_anxiety" },
  { id: 76, content: "别人对您的成绩没有做出恰当的评价", factor: "paranoid_ideation" },
  { id: 77, content: "即使和别人在一起也感到孤单", factor: "psychoticism" },
  { id: 78, content: "感到坐立不安心神不定", factor: "anxiety" },
  { id: 79, content: "感到自己没有什么价值", factor: "depression" },
  { id: 80, content: "感到熟悉的东西变得陌生或不像是真的", factor: "psychoticism" },
  { id: 81, content: "大叫或摔东西", factor: "hostility" },
  { id: 82, content: "害怕会在公共场合昏倒", factor: "anxiety" },
  { id: 83, content: "感到别人想占您的便宜", factor: "paranoid_ideation" },
  { id: 84, content: "为一些有关性的想法而很苦恼", factor: "psychoticism" },
  { id: 85, content: "您认为应该因为自己的过错而受到惩罚", factor: "psychoticism" },
  { id: 86, content: "感到要赶快把事情做完", factor: "psychoticism" },
  { id: 87, content: "感到自己的身体有严重问题", factor: "psychoticism" },
  { id: 88, content: "从未感到和其他人很亲近", factor: "psychoticism" },
  { id: 89, content: "感到自己有罪", factor: "depression" },
  { id: 90, content: "感到自己的脑子有毛病", factor: "psychoticism" },
];

export const likertOptions = [
  { value: 1, label: "无", description: "没有该症状" },
  { value: 2, label: "轻度", description: "感觉有，但不太明显" },
  { value: 3, label: "中度", description: "感觉有，且有些困扰" },
  { value: 4, label: "相当重", description: "感觉明显，较为困扰" },
  { value: 5, label: "严重", description: "感觉非常严重，极为困扰" },
];
