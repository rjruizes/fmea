<script lang="ts">
	import { DialogTitle } from "@rgossiaux/svelte-headlessui";
	import Modal from "./Modal.svelte";
	import SodItem from "./SodItem.svelte";
	import SelectBox from "./SelectBox.svelte";
	import Button from "./Button.svelte";
	import type { ActivityRowObj } from "$lib/store";
	import { severityItems, occurenceItems, detectionItems } from "$lib/sodData";
	import XCloseButton from "./XCloseButton.svelte";


  export let item: ActivityRowObj
  export let disabled: boolean // non SOD items
  export let sodItemsDisabled: boolean = false
  let severityModalIsOpen = false;
	let occurrenceModalIsOpen = false;
	let detectionModalIsOpen = false;
</script>


<div class="divider col-span-2"></div>
<div class="row">
  <label class="label" for="process">Process or Activity</label>
  <input id="process" type="text" class="input input-bordered input-sm" bind:value={item.process} disabled={disabled} />
  <label class="label" for="failure">Failure or Potential Failure</label>
  <input id="failure" type="text" class="input input-bordered input-sm" bind:value={item.failure} disabled={disabled} />
  <label class="label" for="effect">Potential Effect of Failure</label>
  <input id="effect" type="text" class="input input-bordered input-sm" bind:value={item.effect} disabled={disabled} />
  <label class="label" for="severity">
    <div class="flex flex-col">
      <div>
        Severity
      </div>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div on:click={() => severityModalIsOpen = true} class="text-blue-600 opacity-95 uppercase text-xs hover:underline cursor-pointer">
        More Info
      </div>
    </div>
    
    <Modal isOpen={severityModalIsOpen}>
      <div>
        <XCloseButton onclick={() => { severityModalIsOpen = false}} />
        <div class="mt-3 sm:mt-5">
          <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900">Severity of Condition</DialogTitle>
          <div class="-space-y-px rounded-md bg-white col-span-2 mt-2">
            {#each severityItems as sevItem (sevItem.id)}
              <SodItem
                onclick={() => {
                  item.severity = sevItem.id;
                  severityModalIsOpen = false;
                }}
                disabled={sodItemsDisabled}
                label={sevItem.label}
                color={sevItem.color}
                isSelected={sevItem.id === item.severity}
                description={sevItem.description}
              />
            {/each}
          </div>
        </div>
      </div>
      <div class="mt-5 sm:mt-6">
        <Button on:click={() => { severityModalIsOpen = false}}>Close</Button>
      </div>
    </Modal>
  </label>

  <SelectBox bind:selectedId={item.severity} items={severityItems} disabled={sodItemsDisabled} />

  <!-- <select name="severity" id="severity" class="select select-bordered select-sm" bind:value={item.severity}>
    <option value=5>5</option>
    <option value=4>4. Critical</option>
    <option value=3>3</option>
    <option value=2>2</option>
    <option value=1>1</option>
  </select> -->
  <label class="label" for="cause">Likely cause of Failure</label>
  <input id="cause" type="text" class="input input-bordered input-sm" bind:value={item.cause} disabled={disabled} />
  <label class="label" for="occurrence">
    <div class="flex flex-col">
      <div>
        Occurrence of Failure
      </div>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div on:click={() => occurrenceModalIsOpen = true} class="text-blue-600 opacity-95 uppercase text-xs hover:underline cursor-pointer">
        More Info
      </div>
    </div>

    <Modal isOpen={occurrenceModalIsOpen}>
      <div>
        <XCloseButton onclick={() => { occurrenceModalIsOpen = false}} />
        <div class="mt-3 sm:mt-5">
          <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900">Occurrence of Failure</DialogTitle>
          <div class="-space-y-px rounded-md bg-white col-span-2 mt-2">				
            {#each occurenceItems as occItem (occItem.id)}
              <SodItem
                onclick={() => {
                  item.occurrence = occItem.id;
                  occurrenceModalIsOpen = false;
                }}
                disabled={sodItemsDisabled}
                label={occItem.label}
                color={occItem.color}
                isSelected={occItem.id === item.occurrence}
                description={occItem.description}
              />
            {/each}
          </div>
        </div>
      </div>
      <div class="mt-5 sm:mt-6">
        <Button on:click={() => { occurrenceModalIsOpen = false}}>Close</Button>
      </div>
    </Modal>
  </label>
  <SelectBox bind:selectedId={item.occurrence} items={occurenceItems} disabled={sodItemsDisabled} />

  <label class="label" for="controls">Current Controls</label>
  <input id="controls" type="text" class="input input-bordered input-sm" bind:value={item.controls} disabled={disabled} />
  <label class="label" for="detection">
    <div class="flex flex-col">
      <div>
        Detection
      </div>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div on:click={() => detectionModalIsOpen = true} class="text-blue-600 opacity-95 uppercase text-xs hover:underline cursor-pointer">
        More Info
      </div>

      <Modal isOpen={detectionModalIsOpen}>
        <div>
          <XCloseButton onclick={() => { detectionModalIsOpen = false}} />
          <div class="mt-3 sm:mt-5">
            <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900">Probability of Detection</DialogTitle>
            <div class="-space-y-px rounded-md bg-white col-span-2 mt-2">				
              {#each detectionItems as detItem (detItem.id)}
                <SodItem
                  onclick={() => {
                    item.detection = detItem.id;
                    detectionModalIsOpen = false;
                  }}
                  disabled={sodItemsDisabled}
                  label={detItem.label}
                  color={detItem.color}
                  isSelected={detItem.id === item.detection}
                  description={detItem.description}
                />
              {/each}
            </div>
          </div>
        </div>
        <div class="mt-5 sm:mt-6">
          <Button on:click={() => { detectionModalIsOpen = false}}>Close</Button>
        </div>
      </Modal>
    </div>

  </label>
  <SelectBox bind:selectedId={item.detection} items={detectionItems} disabled={sodItemsDisabled} />

  <hr class="col-span-2">

</div>