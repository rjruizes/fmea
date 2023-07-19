<script lang="ts">
  export let selectedCase: { label: string; color: string };
</script>
<div class="col-span-2">
  <p class="text-base pb-8">
    <span
      class={`inline-block h-3 w-3 flex-shrink-0 ${selectedCase?.color}`}
      aria-hidden="true"
    />
    {selectedCase?.label || ""}
  </p>
</div>