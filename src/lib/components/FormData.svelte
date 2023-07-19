<script lang="ts">
	import { DateInput } from 'date-picker-svelte'
  import { formData } from "$lib/store";
  import s from './strings'
  export let disabled: boolean
</script>

<label class="label" for="riskType">{s['risk.to.be.evaluated']}</label>
<select name="riskType" id="riskType" class="select select-bordered select-sm" bind:value={$formData.riskType} disabled={disabled} >
  <option value="nonConformance" selected>{s["non.conformance"]}</option>
  <option value="areaOfConcern">{s["area.of.concern"]}</option>
</select>
<label class="label" for="qaManager">{s['qa.manager']}</label>
<input id="qaManager" type="text" class="input input-bordered input-sm" bind:value={$formData.qaManager} disabled={disabled} />
<label class="label" for="teamMembers">{s['team.members']}</label>
<input id="teamMembers" type="text" class="input input-bordered input-sm" bind:value={$formData.teamMembers} disabled={disabled} />

<label class="label" for="preparer">{s['prepared.by']}</label>
<input id="preparer" type="text" class="input input-bordered input-sm" bind:value={$formData.preparer} disabled={disabled} />
<label class="label" for="carNum">{s['car.num']}</label>
<input id="carNum" type="text" class="input input-bordered input-sm" bind:value={$formData.carNum} disabled={disabled} />
<label class="label" for="fmeaNum">{s['fmea.num']}</label>
<input id="fmeaNum" type="text" class="input input-bordered input-sm" bind:value={$formData.fmeaNum} disabled={disabled} />
<label class="label" for="date">{s['date']}</label>
<DateInput format="MM/dd/yyyy" closeOnSelection={true} bind:value={$formData.date} disabled={disabled} />