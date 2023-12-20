<script lang="ts">
	import { goto } from '$app/navigation';
	import { currentSubmission as submission, submissionCount, type Submission } from "$lib/store";
	import Button from '$lib/components/Button.svelte';
	import AssessmentAndAction from '$lib/components/AssessmentAndAction.svelte';
	import ExportBtn from '$lib/components/ExportBtn.svelte';

	if($submissionCount === 0) {
		// goto("/", { replaceState: true })
		if(window) window.location.href = "/#"
	}

	function rescore() {
		goto(`/#sc=${$submissionCount}`, { replaceState: false })
	}
	function goToExport() {
		goto(`/export`, { replaceState: false })
	}
	let isRescoreDisabled = true
	$: {
		if($submission && $submission.actionsTaken && $submission.actionsTaken[0]?.length > 0) {
			isRescoreDisabled = false
		} else {
			isRescoreDisabled = true
		}
	}
</script>
<svelte:head>
	<title>Results</title>
	<meta name="description" content="FMEA Results" />
</svelte:head>

{#if $submission}
	<div class="wrapper">
		<hr class="col-span-2">
		<AssessmentAndAction />
		<hr class="col-span-2">

	</div>
	<div class="flex flex-col items-center w-full space-y-2">
		<!--  -->
		{#if $submission.rpn > 9}
			<Button class="max-w-xs" on:click={rescore} disabled={isRescoreDisabled} >Score Again</Button>
		{/if}
		<Button class="max-w-xs bg-gray-600 hover:bg-gray-500" on:click={goToExport} >Review</Button>
		<ExportBtn />
	</div>
{:else}
{$submission}
{/if}
