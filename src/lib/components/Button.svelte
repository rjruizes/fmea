<script lang="ts">
  let addlClasses: string = "";
  export { addlClasses as class };
  export let disabled: boolean = false;
</script>
<button
  on:click
  disabled={disabled}
  type="button"
  class={`inline-flex w-full justify-center rounded-md bg-blue-600 disabled:bg-blue-600/50 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${addlClasses}`}
  >
  <slot />
</button>
