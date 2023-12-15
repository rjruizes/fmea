// RPN Calculation

const cases = [
  { color: "bg-green-500", label: "Negligible risk of failure negatively impacting lab operations. No action necessary." },
  { color: "bg-yellow-500", label: "Minor to moderate risk of failure negatively impacting lab operations and work product. Document any action taken in template." },
  { color: "bg-red-500", label: "High risk of failure negatively impacting operations and work product. Action required to reduce RPN ≤14. CAR or PAR needed if none exists. Complete template and attach to CAR/PAR" },
  { color: "bg-purple-500", label: "Critical risk of failure negatively impacting operations and work product. Immediate action required. Discontinue operation or process until mitigated to RPN ≤14. Complete template and attach to CAR/PAR." },
  { color: "bg-transparent", label: "" }
]

export function calculateRiskAssessment(rpn:number, severity:number) {
  const sev = severity
  if (rpn < 10 && sev <5) {
    return cases[0]
  }
  if (rpn <= 14 && rpn >= 9 && sev <= 5) {
    return cases[1]
  }
  if (rpn <= 28 && rpn > 14 && sev <= 5) {
    return cases[2]
  }
  if (rpn > 30 || sev <= 5) {
    return cases[3]
  }
  else {
    return cases[4]
  }
}
