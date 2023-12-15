<script lang="ts">

export let disabled: boolean = false;
export let actionTaken: string = "";
</script>

<textarea id="actionTaken"
  placeholder="Enter action taken"
  bind:value={actionTaken}
  rows="3"
  class="w-full textarea textarea-bordered textarea-sm leading-5"
  disabled={disabled}
  autocomplete="off"
/>