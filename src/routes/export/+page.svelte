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

<div class="content pb-20">
  <FormData disabled={true} />
  <ActivityRow item={firstSubmission} disabled={true} sodItemsDisabled={true} />
  <AssessmentAndAction item={firstSubmission} disabled={true} />
  {#each restOfSubmissions as $item}
    <SodScores item={$item} disabled={true} />
    <AssessmentAndAction item={$item} disabled={true} />
  {/each}
</div>

<div class="flex flex-col items-center w-full space-y-2 pb-60">
  <ExportBtn />
</div>

