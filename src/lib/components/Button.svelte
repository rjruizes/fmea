<script lang="ts">
	import { text } from "svelte/internal";

  let addlClasses: string = "";
  export { addlClasses as class };
  export let width = "w-full";
  export let textColor: string = "text-white";
  export let hoverBgColor: string = "hover:bg-blue-500";
  export let disabled: boolean = false;
</script>
<button
  on:click
  disabled={disabled}
  type="button"
  class="inline-flex {width} justify-center rounded-md bg-blue-600 disabled:bg-blue-600/50 px-3 py-2 text-sm font-semibold {textColor} shadow-sm {hoverBgColor} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 {addlClasses}"
  >
  <slot />
</button>
