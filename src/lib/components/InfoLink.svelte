<script lang="ts">
  let addlClasses: string = "";
  export { addlClasses as class };
  export let click: () => void;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div on:click={click} class="text-blue-600 opacity-95 uppercase text-xs hover:underline cursor-pointer {addlClasses}">
  <slot></slot>
</div>