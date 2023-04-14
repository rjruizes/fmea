<script lang="ts">
  export let label: string;
  export let color: string;
  export let description: string;
</script>
<div class="relative flex border p-4">
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
</div>