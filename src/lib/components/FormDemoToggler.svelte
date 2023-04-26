<script lang="ts">
  import FaPencilAlt from 'svelte-icons/fa/FaPencilAlt.svelte'
  import FaTrash from 'svelte-icons/fa/FaTrash.svelte'
  import { formData, rows } from "$lib/store";

	const prefilledFormData = {
		riskType: "areaOfConcern",
		qaManager: "John Doe",
		teamMembers: "John Doe, Sarah Johnson",
		preparer: "John Doe",
		carNum: "1234567890",
		fmeaNum: "0987654321",
		date: new Date(),
	}
  const prefilledRows = [{
    process: "Adhere label to evidence",
    failure: "Label on wrong evidence",
    effect: "Results do not correspond to evidence",
    severity: 4,
    cause: "Multiple tasks completed at once",
    occurrence: 2,
    controls: "Examiner reviews evidence at receipt",
    detection: 1,
    rpn: "",
    carpar: ""
  }]
  let nextAction = "fill"

	function toggleStore() {
    if (nextAction === "fill") {
      // Fill
      formData.set({
        ...prefilledFormData,
      })
      rows.set([
        ...prefilledRows
      ])
      nextAction = "clear"
    } else {
      // Clear
      formData.set({
        ...prefilledFormData,
        riskType: "",
        qaManager: "",
        teamMembers: "",
        preparer: "",
        carNum: "",
        fmeaNum: "",
        date: new Date(),
      })
      rows.set([{
        process: "",
        failure: "",
        effect: "",
        severity: null,
        cause: "",
        occurrence: null,
        controls: "",
        detection: null,
        rpn: "",
        carpar: ""
      }])
      nextAction = "fill"
    }
	}
</script>

<div class="absolute right-0 top-0 cursor-pointer">
  {#if nextAction === "fill"}
    <button on:click={toggleStore} class="text-zinc-500/30 hover:text-zinc-500/60 w-11 p-3">
      <FaPencilAlt class="inline-block flex-shrink-0" />
    </button>
  {:else}
    <button on:click={toggleStore} class="text-zinc-500/30 hover:text-zinc-500/60 w-11 p-3">
      <FaTrash class="inline-block flex-shrink-0" />
    </button>
  {/if}
</div>