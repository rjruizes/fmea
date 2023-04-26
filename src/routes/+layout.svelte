<script>
	import Header from './Header.svelte';
	import './styles.css';
  import "../app.css";
</script>

<div class="app flex h-full flex-col bg-zinc-200">
	<!-- <Header /> -->

	<main class="flex justify-center">
		<slot />
	</main>

	<!-- <footer></footer> -->
</div>
