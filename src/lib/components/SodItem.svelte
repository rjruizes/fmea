<script lang="ts">
  export let onclick: () => void;
  export let disabled: boolean;
  export let label: string;
  export let color: string;
  export let description: string;
  export let isSelected: boolean;
</script>
<button disabled={disabled} on:click={onclick} class={`w-full relative flex border p-4 text-left focus:ring focus-visible:ring focus-visible:outline-none hover:bg-blue-100/40 ${isSelected ? "bg-blue-100/40 border-blue-500 z-10" : ""}`}>
  <span class="ml-3 flex flex-col">
    <span class="block text-sm font-bold">
      <span
        class={`inline-block h-3 w-3 flex-shrink-0 ${color}`}
        aria-hidden="true"
      />
      {label}
    </span>
    <p class="text-sm">{description}</p>
  </span>
</button>