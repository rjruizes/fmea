<script lang="ts">
	import ActivityRow from "$lib/components/ActivityRow.svelte";
	import AssessmentAndAction from "$lib/components/AssessmentAndAction.svelte";
  import FormData from "$lib/components/FormData.svelte";
	import SodScores from "$lib/components/SodScores.svelte";
  import { submissions as submissionsDict, submissionCount } from "$lib/store";

  // submissionsList is a derived store that is an array of submissionsDict, ordered by key (a number)
  $: submissionsList = $submissionsDict ? Object.entries($submissionsDict).sort((a, b) => parseInt(a[0]) - parseInt(b[0])).map(([key, value]) => value) : [];

  // firstSubmission is a derived store that is the first submission in the submissionsList
  $: firstSubmission = submissionsList[0];

  // restOfSubmissions is a derived store that is the rest of the submissions in the submissionsList
  $: restOfSubmissions = submissionsList.slice(1);
</script>

<div class="content pb-60">
  <FormData disabled={true} />
  <ActivityRow item={firstSubmission} disabled={true} sodItemsDisabled={true} />
  <AssessmentAndAction item={firstSubmission} disabled={true} />
  {#each restOfSubmissions as $item}
    <SodScores item={$item} disabled={true} />
    <AssessmentAndAction item={$item} disabled={true} />
  {/each}
</div>

