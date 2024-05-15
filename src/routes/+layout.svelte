<script>
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

<div class="app flex min-h-screen h-full flex-col">
	<header>
		<FormDemoToggler />
		<div class="py-4 px-2 max-w-6xl mx-auto">
		</div>
	</header>
	<main class="flex justify-center pt-4">
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
