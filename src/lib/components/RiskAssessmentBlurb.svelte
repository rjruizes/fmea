<script lang="ts">
  export let selectedCase: { label: string; color: string };
</script>
<div>
  <p class="text-base">
    <span
      class={`inline-block h-3 w-3 flex-shrink-0 ${selectedCase?.color}`}
      aria-hidden="true"
    />
    {selectedCase?.label || ""}
  </p>
</div>