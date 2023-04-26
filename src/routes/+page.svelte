<script>
  import {
    DialogTitle,
  } from "@rgossiaux/svelte-headlessui";
	import Modal from './Modal.svelte'
	import { formData, rows } from "$lib/store.js";
	import SodItem from "$lib/components/SodItem.svelte";
	import SelectBox from "./SelectBox.svelte";
	import { calculateRPN } from "./util";
	import RiskAssessmentBlurb from "./RiskAssessmentBlurb.svelte";

	const severityItems = [
		{
			"id": 5,
			"label": "5 — Catastrophic",
			"color": "bg-purple-400",
			"description": "Failure results in unacceptable work product. Work product likely to cause significant negative impacts to lab's stakeholders and damage lab's reputation. Lab production, quality, staff safety or customer satisfaction may be severely compromised."
		},
		{
			"id": 4,
			"label": "4 — Critical",
			"color": "bg-red-400",
			"description": "Failure has significant effect on work product. Work product likely to negativley impact lab's stakeholders and damage lab's reputation. Lab production, quality, staff safety or customer satisfaction may be considerably compromised."
		},
		{
			"id": 3,
			"label": "3 — Moderate",
			"color": "bg-yellow-400",
			"description": "Failure may have noticeable effect on work product. Work product may cause negative impacts to stakeholders and damage labs' reputation. Lab production, quality, staff safety or customer satisfaction may be compromised."
		},
		{
			"id": 2,
			"label": "2 — Minor",
			"color": "bg-yellow-400",
			"description": "Failure may have a slight effect on work product. Work product not likely to impact stakeholders or lab's reputation. Lab operations and customer satisfaction not likely to be compromised."
		},
		{
			"id": 1,
			"label": "1 — Negligible",
			"color": "bg-green-400",
			"description": "Unreasonable to expect the failure to have any noticeable effect on lab work product, lab operations or customer satisfaction."
		}
	]

	const occurenceItems = [
		{
			"id": 5,
			"label": "5 — Very High",
			"color": "bg-red-400",
			"description": "Failure is frequent, very likely or recurring"
		},
		{
			"id": 4,
			"label": "4 — High",
			"color": "bg-red-400",
			"description": "Failure is repeated, probable or likely"
		},
		{
			"id": 3,
			"label": "3 — Moderate",
			"color": "bg-yellow-400",
			"description": "Failure is occasional or possible"
		},
		{
			"id": 2,
			"label": "2 — Low",
			"color": "bg-yellow-400",
			"description": "Failure is seldom, rare or remote"
		},
		{
			"id": 1,
			"label": "1 — Remote",
			"color": "bg-green-400",
			"description": "Failure is not likely or probable"
		}
	]

	const detectionItems = [
		{
			"id": 5,
			"label": "5 — Remote",
			"color": "bg-red-400",
			"description": "Controls will not or can not detect the existence of a failure. No known controls available to detect failure mode."
		},
		{
			"id": 4,
			"label": "4 — Low",
			"color": "bg-red-400",
			"description": "Controls have a poor chance of detecting the existence of failure mode"
		},
		{
			"id": 3,
			"label": "3 — Moderate",
			"color": "bg-yellow-400",
			"description": "Controls may detect the existence of a failure"
		},
		{
			"id": 2,
			"label": "2 — High",
			"color": "bg-yellow-400",
			"description": "Controls have a good chance of detecting failure"
		},
		{
			"id": 1,
			"label": "1 — Very High",
			"color": "bg-green-400",
			"description": "Current controls almost certain to detect the failure"
		}
	]

  let severityModalIsOpen = false;
	let occurenceModalIsOpen = false;
	let detectionModalIsOpen = false;
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="w-full max-w-5xl flex">
	<div class="bg-white w-full flex flex-col items-center">
		<section class="prose text-sm grow">
			<h2 class=" pt-24 mb-8">Forensic Science FMEA</h2>

			<form class="content">
				<label class="label" for="riskType">Risk to be evaluated</label>
				<select name="riskType" id="riskType" class="select select-bordered select-sm" bind:value={$formData.riskType} >
					<option value="nonConformance" selected>Non-Conformance</option>
					<option value="areaOfConcern">Area of Concern</option>
				</select>
				<label class="label" for="qaManager">QA Manager</label>
				<input id="qaManager" type="text" class="input input-bordered input-sm" bind:value={$formData.qaManager} />
				<label class="label" for="teamMembers">Team Members</label>
				<input id="teamMembers" type="text" class="input input-bordered input-sm" bind:value={$formData.teamMembers} />

				<label class="label" for="preparer">Prepared by</label>
				<input id="preparer" type="text" class="input input-bordered input-sm" bind:value={$formData.preparer} />
				<label class="label" for="carNum">CAR No.</label>
				<input id="carNum" type="text" class="input input-bordered input-sm" bind:value={$formData.carNum} />
				<label class="label" for="fmeaNum">FMEA No.</label>
				<input id="fmeaNum" type="text" class="input input-bordered input-sm" bind:value={$formData.fmeaNum} />
				<label class="label" for="date">Date</label>
				<input id="date" type="text" class="input input-bordered input-sm" bind:value={$formData.date} />

				{#each $rows as $item}
				<div class="divider col-span-2"></div>
				<div class="row">
					<label class="label" for="process">Process or Activity</label>
					<input id="process" type="text" class="input input-bordered input-sm" bind:value={$item.process} />
					<label class="label" for="failure">Failure or Potential Failure</label>
					<input id="failure" type="text" class="input input-bordered input-sm" bind:value={$item.failure} />
					<label class="label" for="effect">Potential Effect of Failure</label>
					<input id="effect" type="text" class="input input-bordered input-sm" bind:value={$item.effect} />
					<label class="label" for="severity">
						<div class="flex flex-col">
							<div>
								Severity
							</div>
							<!-- svelte-ignore a11y-click-events-have-key-events -->
							<div on:click={() => severityModalIsOpen = true} class="text-blue-600 opacity-95 uppercase text-xs hover:underline cursor-pointer">
								More Info
							</div>
						</div>
						
						<Modal isOpen={severityModalIsOpen}>
							<div>
								<div class="mt-3 sm:mt-5">
									<DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900">Severity of Condition</DialogTitle>
									<div class="-space-y-px rounded-md bg-white col-span-2 mt-2">
										{#each severityItems as item (item.id)}
											<SodItem label={item.label} color={item.color} description={item.description} />
										{/each}
									</div>
								</div>
							</div>
							<div class="mt-5 sm:mt-6">
								<button type="button" class="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" on:click={() => { severityModalIsOpen = false}}>Close</button>
							</div>
						</Modal>
					</label>

					<SelectBox bind:selectedId={$item.severity} items={severityItems} />

					<!-- <select name="severity" id="severity" class="select select-bordered select-sm" bind:value={$item.severity}>
						<option value=5>5</option>
						<option value=4>4. Critical</option>
						<option value=3>3</option>
						<option value=2>2</option>
						<option value=1>1</option>
					</select> -->
					<label class="label" for="cause">Likely cause of Failure</label>
					<input id="cause" type="text" class="input input-bordered input-sm" bind:value={$item.cause} />
					<label class="label" for="occurrence">
						<div class="flex flex-col">
							<div>
								Occurrence
							</div>
							<!-- svelte-ignore a11y-click-events-have-key-events -->
							<div on:click={() => occurenceModalIsOpen = true} class="text-blue-600 opacity-95 uppercase text-xs hover:underline cursor-pointer">
								More Info
							</div>
						</div>

						<Modal isOpen={occurenceModalIsOpen}>
							<div>
								<div class="mt-3 sm:mt-5">
									<DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900">Occurrence of Failure</DialogTitle>
									<div class="-space-y-px rounded-md bg-white col-span-2 mt-2">				
										{#each occurenceItems as item (item.id)}
											<SodItem label={item.label} color={item.color} description={item.description} />
										{/each}
									</div>
								</div>
							</div>
							<div class="mt-5 sm:mt-6">
								<button type="button" class="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" on:click={() => { occurenceModalIsOpen = false}}>Close</button>
							</div>
						</Modal>
					</label>
					<SelectBox bind:selectedId={$item.occurrence} items={occurenceItems} />

					<label class="label" for="controls">Current Controls</label>
					<input id="controls" type="text" class="input input-bordered input-sm" bind:value={$item.controls} />
					<label class="label" for="detection">
						<div class="flex flex-col">
							<div>
								Detection
							</div>
							<!-- svelte-ignore a11y-click-events-have-key-events -->
							<div on:click={() => detectionModalIsOpen = true} class="text-blue-600 opacity-95 uppercase text-xs hover:underline cursor-pointer">
								More Info
							</div>

							<Modal isOpen={detectionModalIsOpen}>
								<div>
									<div class="mt-3 sm:mt-5">
										<DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900">Probability of Detection</DialogTitle>
										<div class="-space-y-px rounded-md bg-white col-span-2 mt-2">				
											{#each detectionItems as item (item.id)}
												<SodItem label={item.label} color={item.color} description={item.description} />
											{/each}
										</div>
									</div>
								</div>
								<div class="mt-5 sm:mt-6">
									<button type="button" class="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" on:click={() => { detectionModalIsOpen = false}}>Close</button>
								</div>
							</Modal>
						</div>

					</label>
					<SelectBox bind:selectedId={$item.detection} items={detectionItems} />

					<div class="divider col-span-2"></div>

					<h2 class="col-span-2 mt-10">Risk Assessment</h2>
					<p class="label">RPN Score</p>
					<p class="label">{calculateRPN($item.severity, $item.occurrence, $item.detection)}</p>
					<label class="label" for="carpar">CAR/PAR?</label>
					<select name="carpar" id="carpar" class="select select-bordered select-sm" bind:value={$item.carpar} >
						<option value="true">Yes</option>
						<option value="false">No</option>
					</select>
					<RiskAssessmentBlurb severity={$item.severity} occurrence={$item.occurrence} detection={$item.detection} />
				</div>
				{/each}

			</form>

			<!-- <Counter /> -->
		</section>
	</div>
</div>

<style>
  .content, .row {
    display: grid;
    grid-template-columns: 36% 64%;
    grid-column-gap: 5px;
		row-gap: 3px;
		width: 600px;
		align-items: center;
	}
	/* Media breakpoint for small screens */
	@media (max-width: 600px) {
		.content, .row {
			width: 350px;
		}
	}

	.prose {
		max-width: fit-content;
	}
/*
	.row {
		padding-top: 15px;
		padding-left: 5px;
		padding-right: 15px;
		padding-bottom: 5px;
		margin-left: -5px;
	}
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}
*/

	h1 {
		width: 100%;
	}
	h3 {
		margin-bottom: 0;
	}
	p {
		margin: 5px 0;
	}
</style>
