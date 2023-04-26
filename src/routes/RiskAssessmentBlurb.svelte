<script lang="ts">
	import { calculateRPN } from "./util";
  export let severity: number|null
  export let occurrence: number|null
  export let detection: number|null

  const cases = [
    { color: "bg-green-500", label: "Negligible risk of failure negatively impacting lab operations. No action necessary. For non-conforming work document action taken in template." },
    { color: "bg-yellow-500", label: "Minor to moderate risk of failure negatively impacting lab operations. Correction required. Document action in template. Consider opening CAR/PAR, if none exist." },
    { color: "bg-red-500", label: "High risk of failure negatively impacting operations. Action required to reduce RPN <14. CAR or PAR needed if none exists. Complete template and attach to CAR/PAR" },
    { color: "bg-purple-500", label: "Critical risk of failure negatively impacting operations. Immediate action required. Discontinue operation or process until mitigated to RPN <14. Complete template and attach to CAR/PAR." },
    { color: "bg-transparent", label: "" }
  ]

  function calculateRiskAssessment(severity:number|null, occurrence:number|null, detection:number|null) {
    if (!severity) return
    const rpn = calculateRPN(severity, occurrence, detection)
    const sev = severity
    if (rpn !== "") {
      if (rpn < 10 && sev < 5) {
        return cases[0]
      }
      if (rpn <= 14 && rpn >= 10 && sev <= 4) {
        return cases[1]
      }
      if (rpn <= 29 && rpn > 14) {
        return cases[2]
      }
      if (rpn > 30 || sev === 5) {
        return cases[3]
      }
      else {
        return cases[4]
      }
    }
  }
  $: selectedCase = calculateRiskAssessment(severity, occurrence, detection)
</script>
<div class="col-span-2">
  <p class="text-base pb-36">
    <span
      class={`inline-block h-3 w-3 flex-shrink-0 ${selectedCase?.color}`}
      aria-hidden="true"
    />
    {selectedCase?.label || ""}
  </p>
</div>