<script lang="ts">
  import RiskAssessmentBlurb from "./RiskAssessmentBlurb.svelte";
  import { submissions, submissionCount, type Submission } from "$lib/store";

  export let item: Submission
  export let disabled: boolean = false;
  $: submission = item || $submissions[$submissionCount - 1]
</script>

<h2 class="col-span-2 mt-0">Risk Assessment</h2>
<span class="label col-span-2">RPN Score</span>
<h3 class="label col-span-2 my-0 leading-5">{submission.rpn}</h3>
<RiskAssessmentBlurb
  rpn={submission.rpn}
  severity={submission.severity}
  occurrence={submission.occurrence}
  detection={submission.detection}
/>

<h2 class="col-span-2 mt-0">Corrective Actions</h2>
<label class="label" for="actionTaken">Action Taken</label>
{#if item}
  <input id="actionTaken" type="text" bind:value={item.actionTaken} class="input input-bordered input-sm" disabled={disabled} autocomplete="off" />
{:else}
  <input id="actionTaken" type="text" bind:value={$submissions[$submissionCount - 1].actionTaken} class="input input-bordered input-sm" disabled={disabled} autocomplete="off" />
{/if}

<label class="label" for="carpar">CAR/PAR?</label>
{#if item}
  <select name="carpar" id="carpar" bind:value={item.carpar} class="select select-bordered select-sm" disabled={disabled}>
    <option value="true">Yes</option>
    <option value="false">No</option>
  </select>
{:else}
  <select name="carpar" id="carpar" bind:value={$submissions[$submissionCount - 1].carpar} class="select select-bordered select-sm" disabled={disabled}>
    <option value="true">Yes</option>
    <option value="false">No</option>
  </select>
{/if}