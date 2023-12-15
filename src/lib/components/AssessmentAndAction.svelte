<script lang="ts">
  import FaPlus from 'svelte-icons/fa/FaPlus.svelte'
  import FaMinus from 'svelte-icons/fa/FaMinus.svelte'
  import RiskAssessmentBlurb from "./RiskAssessmentBlurb.svelte";
  import { submissions, submissionCount, type Submission } from "$lib/store";
	import s from "./strings";
	import { calculateRiskAssessment } from "$lib/calculateRiskAssessment";
	import Button from './Button.svelte';
	import Textarea from './Textarea.svelte';

  export let item: Submission|null = null;
  export let disabled: boolean = false;
  let selectedCase: { label: string; color: string };
  $: submission = item || $submissions[$submissionCount - 1]
  $: if (submission) {
    selectedCase = calculateRiskAssessment(submission.rpn, submission.severity)
  }
</script>

<h2 class="mt-0">{s["risk.assessment"]}</h2>
<span class="label col-span-2">{s["rpn.score"]}</span>
<h3 class="label my-0 leading-5">{submission.rpn}</h3>
<RiskAssessmentBlurb selectedCase={selectedCase}
/>

<!-- Hide Corrective Actions section for if RPN Score is green  -->
{#if submission.rpn > 9}
  <h3 class="mt-0">{s["corrective.actions"]}</h3>
  {#each submission.actionsTaken as actionTaken}
    <Textarea disabled={disabled} bind:actionTaken={actionTaken} />
  {/each}

  <!-- Add/Remove Buttons -->
  {#if !item}
    <div class="flex w-full justify-between">
      <!-- Add action button -->
      <Button
        on:click={() => {
          $submissions[$submissionCount - 1].actionsTaken = [...submission.actionsTaken, ""]
        }}
        width="w-auto"
        textColor="text-blue-700/90"
        hoverBgColor="hover:bg-blue-100/50"
        class="justify-center items-center bg-white border border-gray-400">
        <div class="w-3 mr-1">
          <FaPlus class="inline-block" />
        </div>
        Add action
      </Button>

      <!-- Remove action button -->
      {#if submission.actionsTaken.length > 1}
        <Button
          on:click={() => {
            $submissions[$submissionCount - 1].actionsTaken = submission.actionsTaken.slice(0, -1)
          }}
          width="w-auto"
          textColor="text-red-700/90"
          hoverBgColor="hover:bg-red-100/50"
          class="justify-center items-center bg-white border border-gray-400">
          <div class="w-3 mr-1">
            <FaMinus class="inline-block transform rotate-45" />
          </div>
          Remove action
        </Button>
      {/if}
    </div>
  {/if}

  <h3 class="w-full clear-both">{s["carpar"]}</h3>
  {#if item}
    <select name="carpar" id="carpar" bind:value={item.carpar} class="w-full select select-bordered select-sm" disabled={disabled}>
      <option value="Yes">Yes</option>
      <option value="No">No</option>
    </select>
  {:else}
    <select name="carpar" id="carpar" bind:value={$submissions[$submissionCount - 1].carpar} class="w-full select select-bordered select-sm" disabled={disabled}>
      <option value="Yes">Yes</option>
      <option value="No">No</option>
    </select>
  {/if}
{/if}

<h3>{s["addl.comments"]}</h3>
<!-- <label class="label col-span-2" for="addlComments"></label> -->
{#if item}
  <textarea id="addlComments"
    bind:value={item.addlComments}
    class="w-full textarea textarea-bordered textarea-sm leading-5"
    rows="3"
    disabled={disabled}
    autocomplete="off"
  />
{:else}
  <textarea id="addlComments"
    bind:value={$submissions[$submissionCount - 1].addlComments}
    class="w-full textarea textarea-bordered textarea-sm leading-5"
    rows="3"
    disabled={disabled}
    autocomplete="off"
  />
{/if}