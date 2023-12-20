<script lang="ts">
  import FaPlus from 'svelte-icons/fa/FaPlus.svelte'
  import FaMinus from 'svelte-icons/fa/FaMinus.svelte'
  import RiskAssessmentBlurb from "./RiskAssessmentBlurb.svelte";
  import { submissions, submissionCount, type Submission } from "$lib/store";
	import s from "./strings";
	import { calculateRiskAssessment } from "$lib/calculateRiskAssessment";
	import Button from './Button.svelte';
	import Textarea from './Textarea.svelte';
	import InfoLink from './InfoLink.svelte';
	import Modal from './Modal.svelte';
	import XCloseButton from './XCloseButton.svelte';
	import { DialogTitle } from '@rgossiaux/svelte-headlessui';
	import RpnTable from './RpnTable.svelte';

  export let isFirst: boolean = false;
  export let item: Submission|null = null;
  export let disabled: boolean = false;
	let formulaModalIsOpen = false;
  let selectedCase: { label: string; color: string };

  let previousScore = $submissions[$submissionCount - 2]?.rpn
  let currentScore = $submissions[$submissionCount - 1]?.rpn
  // Format as percentage
  let reduction = (previousScore && currentScore) ? Math.round((previousScore - currentScore) / previousScore * 100) : 0

  $: submission = item || $submissions[$submissionCount - 1]
  $: if (submission) {
    selectedCase = calculateRiskAssessment(submission.rpn, submission.severity)
  }
</script>

<h2 class="mt-0">{s["risk.assessment"]}</h2>
<!-- RPN Score -->
<span>{s["rpn.score"]}</span>
<h3 class="my-2 leading-5">{submission.rpn}</h3>
{#if $submissionCount > 1 && !isFirst}
  <span class="text-sm text-gray-500">{Math.abs(reduction)}% RPN {reduction < 0 ? "Increase" : "Reduction"} (Previous score: {$submissions[$submissionCount - 2].rpn})</span>
{/if}

<!-- Risk Assessment -->
<RiskAssessmentBlurb selectedCase={selectedCase} />
{#if !item}
  <InfoLink class='inline-block mb-8' click={() => formulaModalIsOpen = true} >Calculation Formula</InfoLink>
{/if}

<!-- Calculation Formula Modal -->
<Modal isOpen={formulaModalIsOpen}>
  <div>
    <XCloseButton onclick={() => { formulaModalIsOpen = false}} />
    <div class="mt-3 sm:mt-5">
      <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900">Calculation Formula</DialogTitle>
      <div class="-space-y-px rounded-md bg-white col-span-2 mt-2">
        <p class="text-base pb-2">RPN Score = S x (O+D)</p>
        <p class="text-base">Where:</p>
        <p class="text-base">S = Severity (1-5)</p>
        <p class="text-base">O = Occurence (1-5)</p>
        <p class="text-base">D = Detection (1-5)</p>
        
        <p class="text-base pt-6 pb-5">The table below shows all possible RPN values that can be calculated from severity, occurence, and detection inputs. The color of the cell indicates the RPN level (Catastrophic, Critical, Moderate, Minor, or Negligible).</p>
        <RpnTable />
      </div>
    </div>
  </div>
  <div class="mt-5 sm:mt-6">
    <Button on:click={() => { formulaModalIsOpen = false}}>Close</Button>
  </div>
</Modal>

<!-- Corrective Actions - Hidden if RPN Score is green  -->
{#if submission.rpn > 9}
  <h3 class="mt-0">{s["corrective.actions"]}</h3>
  {#if item}
    {#each item.actionsTaken as actionTaken, i}
      <Textarea id="actionTaken-{i}" placeholder="Enter action taken here" disabled={disabled} bind:value={actionTaken} />
    {/each}
  {:else}
  <!-- To enable reactivity in results/+page.svelte, this variable must be used, not an intermediary -->
    {#each $submissions[$submissionCount - 1].actionsTaken as actionTaken, i}
      <Textarea id="actionTaken-{i}" placeholder="Enter action taken here" disabled={disabled} bind:value={actionTaken} />
    {/each}
  {/if}

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

  <!-- CAR/PAR -->
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

<!-- Additional Comments -->
<h3>{s["addl.comments"]}</h3>
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