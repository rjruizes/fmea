import { writable, type Writable } from 'svelte/store';

export const formData = writable({
  riskType: "",
  qaManager: "",
  teamMembers: "",
  preparer: "",
  carNum: "",
  fmeaNum: "",
  date: new Date(),
})

// Define type for rows
type Rows = Writable<{
    process: string;
    failure: string;
    effect: string;
    severity: number | null;
    cause: string;
    occurrence: number | null;
    controls: string;
    detection: number | null;
    rpn: string;
    carpar: string;
}[]>


export const rows:Rows = writable([{
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

