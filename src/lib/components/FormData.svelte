<script lang="ts">
	import { DateInput } from 'date-picker-svelte'
  import { formData } from "$lib/store";
  export let disabled: boolean
</script>

<label class="label" for="riskType">Risk to be evaluated</label>
<select name="riskType" id="riskType" class="select select-bordered select-sm" bind:value={$formData.riskType} disabled={disabled} >
  <option value="nonConformance" selected>Non-Conformance</option>
  <option value="areaOfConcern">Area of Concern</option>
</select>
<label class="label" for="qaManager">QA Manager</label>
<input id="qaManager" type="text" class="input input-bordered input-sm" bind:value={$formData.qaManager} disabled={disabled} />
<label class="label" for="teamMembers">Team Members</label>
<input id="teamMembers" type="text" class="input input-bordered input-sm" bind:value={$formData.teamMembers} disabled={disabled} />

<label class="label" for="preparer">Prepared by</label>
<input id="preparer" type="text" class="input input-bordered input-sm" bind:value={$formData.preparer} disabled={disabled} />
<label class="label" for="carNum">CAR No.</label>
<input id="carNum" type="text" class="input input-bordered input-sm" bind:value={$formData.carNum} disabled={disabled} />
<label class="label" for="fmeaNum">FMEA No.</label>
<input id="fmeaNum" type="text" class="input input-bordered input-sm" bind:value={$formData.fmeaNum} disabled={disabled} />
<label class="label" for="date">Date</label>
<DateInput format="MM/dd/yyyy" closeOnSelection={true} bind:value={$formData.date} disabled={disabled} />