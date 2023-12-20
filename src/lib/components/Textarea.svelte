<script lang="ts">

export let id: string = "";
export let disabled: boolean = false;
export let value: string = "";
export let placeholder: string = "";
</script>

<textarea id={id}
  placeholder={placeholder}
  bind:value={value}
  rows="3"
  class="w-full my-1 textarea textarea-bordered textarea-sm text-black leading-5"
  disabled={disabled}
  autocomplete="off"
/>