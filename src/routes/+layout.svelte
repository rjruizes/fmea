<script>
	import { onMount, onDestroy } from 'svelte';
	import FormDemoToggler from "$lib/components/FormDemoToggler.svelte";
	import './styles.css';
  import "../app.css";
	import { submissionCount } from '$lib/store';
	
	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';
	
	inject({ mode: dev ? 'development' : 'production' });

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

<div class="app flex min-h-screen h-full flex-col">
	<header>
		<div class="bg-[#333e47] h-14 hidden md:block"></div>
		<div class="w-full py-7 px-4 max-w-7xl mx-auto">
			<img class="h-24" src="/ftcoe_logo.png" alt="FTCOE Logo" />
		</div>
		<div class="bg-[#333e47] py-20 px-4 text-white font-bold uppercase text-4xl">
			<FormDemoToggler />
			<div class="max-w-6xl mx-auto">
				Forensic Science FMEA
			</div>
		</div>
	</header>
	<main class="flex justify-center pt-12">
		<div class="w-full max-w-5xl flex">
			<div class="min-h-screen h-full w-full relative">
				<div class="relative w-full flex flex-col items-center">
					<section class="prose text-sm grow">
						<slot />
					</section>
				</div>
			</div>
		</div>
	</main>

	<!-- <footer></footer> -->
</div>
