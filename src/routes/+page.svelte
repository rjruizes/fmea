<script lang="ts">
	import { goto } from '$app/navigation';
	import { rows, submissions, submissionCount } from "$lib/store";
	import Button from "$lib/components/Button.svelte";
	import FormData from '$lib/components/FormData.svelte';
	import ActivityRow from '$lib/components/ActivityRow.svelte';
	import { calculateRPN } from './util';

	function submit() {
		submissions.update(results_ => {
			const rpn = calculateRPN($rows[0].severity!, $rows[0].occurrence!, $rows[0].detection!)
			results_[$submissionCount] = {
				// Index by zero because we only have one row in this demo
				process: $rows[0].process,
				failure: $rows[0].failure,
				effect: $rows[0].effect,
				severity: $rows[0].severity!,
				cause: $rows[0].cause,
				occurrence: $rows[0].occurrence!,
				controls: $rows[0].controls,
				detection: $rows[0].detection!,
				rpn,
				carpar: $rows[0].carpar,
				actionsTaken: [""],
				addlComments: '',
			}
			return results_
		})
		submissionCount.update(n => n + 1)
		goto(`/results#sc=${$submissionCount}`, { replaceState: false })
	}

	$: nonSodItemsDisabled = $submissionCount > 0 ? true : false
	$: submitBtnDisabled = typeof $rows[0].severity === 'number' && typeof $rows[0].occurrence === 'number' && typeof $rows[0].detection === 'number' ? false : true
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>


<p class="wrapper px-3 sm:px-0 -mt-3 mb-10">
	Failure Mode and Effects Analysis (FMEA) is a risk management tool that identifies and quantifies the
	influence of failures or potential failures in processes. This application automates FMEA by evaluating the level of risk associated with an area of concern or non-conformance in forensic laboratory processes.
	The application calculates a Risk Priority Number (RPN) that shows the level of risk associated with a
	failure and the action required to mitigate that risk. The RPN is derived from a severity, occurrence, and
	detection (SOD) matrix, which has been customized for forensic science service providers. The
	application allows users to export a PDF report and save the data as an excel file for further data processing. Instructions on how use the application can be found here [LINK]	
</p>

<form class="content">
	<FormData disabled={nonSodItemsDisabled} />

	{#each $rows as $item}
		<ActivityRow bind:item={$item} disabled={nonSodItemsDisabled} />
	{/each}

	<div class="col-span-2 flex justify-center mt-6">
		<Button class="max-w-xs" on:click={submit} disabled={submitBtnDisabled} >Submit</Button>
	</div>

</form>
