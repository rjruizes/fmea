<script lang="ts">
  import RiskAssessmentBlurb from "./RiskAssessmentBlurb.svelte";
  import { submissions, submissionCount, type Submission } from "$lib/store";
	import s from "./strings";
	import { calculateRiskAssessment } from "$lib/calculateRiskAssessment";

  export let item: Submission
  export let disabled: boolean = false;
  let selectedCase: { label: string; color: string };
  $: submission = item || $submissions[$submissionCount - 1]
  $: if (submission) {
    selectedCase = calculateRiskAssessment(submission.rpn, submission.severity)
  }
</script>

<h2 class="col-span-2 mt-0">{s["risk.assessment"]}</h2>
<span class="label col-span-2">{s["rpn.score"]}</span>
<h3 class="label col-span-2 my-0 leading-5">{submission.rpn}</h3>
<RiskAssessmentBlurb selectedCase={selectedCase}
/>

<h2 class="col-span-2 mt-0">{s["corrective.actions"]}</h2>
<label class="label" for="actionTaken">{s["action.taken"]}</label>
{#if item}
  <input id="actionTaken" type="text" bind:value={item.actionTaken} class="input input-bordered input-sm" disabled={disabled} autocomplete="off" />
{:else}
  <input id="actionTaken" type="text" bind:value={$submissions[$submissionCount - 1].actionTaken} class="input input-bordered input-sm" disabled={disabled} autocomplete="off" />
{/if}

<label class="label" for="carpar">{s["carpar"]}</label>
{#if item}
  <select name="carpar" id="carpar" bind:value={item.carpar} class="select select-bordered select-sm" disabled={disabled}>
    <option value="Yes">Yes</option>
    <option value="No">No</option>
  </select>
{:else}
  <select name="carpar" id="carpar" bind:value={$submissions[$submissionCount - 1].carpar} class="select select-bordered select-sm" disabled={disabled}>
    <option value="Yes">Yes</option>
    <option value="No">No</option>
  </select>
{/if}