const SESSION_KEY = "scl90_session_id";
const ANSWERS_KEY = "scl90_answers";
const CURRENT_Q_KEY = "scl90_current_question";

export function getSessionId(): string {
  let id = localStorage.getItem(SESSION_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

export function getAnswers(): Record<number, number> {
  try {
    const raw = localStorage.getItem(ANSWERS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveAnswer(questionId: number, score: number) {
  const answers = getAnswers();
  answers[questionId] = score;
  localStorage.setItem(ANSWERS_KEY, JSON.stringify(answers));
}

export function getCurrentQuestion(): number {
  return parseInt(localStorage.getItem(CURRENT_Q_KEY) || "0", 10);
}

export function saveCurrentQuestion(index: number) {
  localStorage.setItem(CURRENT_Q_KEY, String(index));
}

export function clearSession() {
  localStorage.removeItem(ANSWERS_KEY);
  localStorage.removeItem(CURRENT_Q_KEY);
  localStorage.removeItem(SESSION_KEY);
}

export function hasIncompleteSession(): boolean {
  const answers = getAnswers();
  const count = Object.keys(answers).length;
  return count > 0 && count < 90;
}
