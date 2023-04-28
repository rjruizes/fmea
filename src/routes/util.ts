
export function calculateRPN(severity: number, occurrence: number, detection: number) {
  const rpn = severity * (occurrence + detection)
  return rpn
}