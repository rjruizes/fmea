<script lang="ts">
	import ActivityRow from "$lib/components/ActivityRow.svelte";
	import AssessmentAndAction from "$lib/components/AssessmentAndAction.svelte";
	import ExportBtn from "$lib/components/ExportBtn.svelte";
  import FormData from "$lib/components/FormData.svelte";
	import SodScores from "$lib/components/SodScores.svelte";
  import { submissionsList } from "$lib/store";

  $: firstSubmission = $submissionsList[0];
  $: restOfSubmissions = $submissionsList.slice(1);
</script>

<div class="wrapper pb-20">
  <div class="row">
    <FormData disabled={true} />
    <ActivityRow item={firstSubmission} disabled={true} sodItemsDisabled={true} />
  </div>
    <AssessmentAndAction item={firstSubmission} disabled={true} itemIndex={0} />
  {#each restOfSubmissions as $item, index}
    <SodScores item={$item} disabled={true} />
    <AssessmentAndAction item={$item} disabled={true} itemIndex={index+1} />
  {/each}
</div>

<div class="flex flex-col items-center w-full space-y-2 pb-60">
  <ExportBtn />
</div>

