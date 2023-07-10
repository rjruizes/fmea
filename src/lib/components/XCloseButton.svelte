<script lang="ts">
  import FaTimes from 'svelte-icons/fa/FaTimes.svelte'
  export let onclick: () => void;
</script>
<button on:click={onclick} class="block float-right text-zinc-500 hover:text-zinc-500/80 w-9 px-2 py-1 focus:ring focus-visible:ring focus-visible:outline-none rounded-lg -mt-7 -mr-3 sm:-mt-10 sm:-mr-5">
  <FaTimes class="inline-block flex-shrink-0" />
</button>