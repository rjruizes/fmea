<script lang="ts">
	import SelectBox from "./SelectBox.svelte";
	import type { ActivityRowObj } from "$lib/store";
	import { severityItems, occurenceItems, detectionItems } from "$lib/sodData";
  import s from "./strings";

  export let item: ActivityRowObj
  export let disabled: boolean = false
</script>

<hr class="col-span-2">
<h2 class="col-span-2 mt-0">{s["rescore"]}</h2>
<div class="row">
  <label class="label" for="severity">
    <div class="flex flex-col">
      <div>
        Severity
      </div>
    </div>
  </label>

  <SelectBox bind:selectedId={item.severity} items={severityItems} disabled={disabled} />

  <label class="label" for="occurrence">
    <div class="flex flex-col">
      <div>
        Occurrence
      </div>
    </div>
  </label>
  <SelectBox bind:selectedId={item.occurrence} items={occurenceItems} disabled={disabled} />

  <label class="label" for="detection">
    <div class="flex flex-col">
      <div>
        Detection
      </div>
    </div>

  </label>
  <SelectBox bind:selectedId={item.detection} items={detectionItems} disabled={disabled} />

  <hr class="col-span-2">

</div>