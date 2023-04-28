<script>
// @ts-nocheck

  import {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
  } from "@rgossiaux/svelte-headlessui";

  export let items;
  export let selectedId;
  export let disabled;
  $: selectedItem = items.find(p => p.id === selectedId);
</script>

<div class="relative not-prose">
  <Listbox value={selectedId} disabled={disabled} on:change={(e) => {
      selectedItem = items.find(p => p.id === e.detail)
      selectedId = selectedItem.id
    }}>
    <ListboxButton class="select select-bordered select-sm w-full">
      <div>
        <span
          class={`inline-block h-3 w-3 flex-shrink-0 ${selectedItem?.color}`}
          aria-hidden="true"
        />
        <span>{selectedItem?.label || ""}</span>
      </div>
    </ListboxButton>
    <ListboxOptions class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
      {#each items as item (item.id)}
        <ListboxOption value={item.id} class={({ active, selected }) => `pl-6 p-1 relative cursor-default select-none pr-9 ${selected ? ' bg-slate-200/60 font-bold' : ''} ${active ? ' bg-blue-100/80' : ''}`}>
          <span
            class={`inline-block h-3 w-3 flex-shrink-0 ${item.color}`}
            aria-hidden="true"
          />
          {item.label}
        </ListboxOption>
      {/each}
    </ListboxOptions>
  </Listbox>
</div>
