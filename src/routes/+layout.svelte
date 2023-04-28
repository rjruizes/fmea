<script>
	import { onMount, onDestroy } from 'svelte';
	import Header from './Header.svelte';
	import FormDemoToggler from "$lib/components/FormDemoToggler.svelte";
	import './styles.css';
  import "../app.css";
	import { submissionCount } from '$lib/store';

  // onMount(() => {
  //   console.log('MOUNT', window);
	// 	window.addEventListener('hashchange', function () {
	// 		console.log('location changed!');
	// 	});
  // })
	const popstate = () => {
		const parts = location.hash.split('#');
		if (parts.length > 1) {
			const hash = parts[1];
			const scParts = hash.split('=');
			if (scParts.length > 1) {
				const sc = parseInt(scParts[1]);
				submissionCount.set(sc);
				console.log('sc', sc, $submissionCount);
			} else {
				submissionCount.set(0);
				console.log('sc', $submissionCount);
			}
		} else {
			submissionCount.set(0);
			console.log('sc', $submissionCount);
		}
	}
</script>

<svelte:window on:popstate={popstate}/>

<div class="app flex min-h-screen h-full flex-col bg-zinc-200">
	<!-- <Header /> -->

	<main class="flex justify-center">
		<div class="w-full max-w-5xl flex">
			<div class="bg-white min-h-screen h-full w-full flex flex-col items-center relative">
				<FormDemoToggler />
				<section class="prose text-sm grow">
					<h2 class="pt-12 mb-8">Forensic Science FMEA</h2>
					<slot />
				</section>
			</div>
		</div>
	</main>

	<!-- <footer></footer> -->
</div>
