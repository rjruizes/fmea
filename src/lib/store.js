import { writable } from 'svelte/store';

export const formData = writable({
  riskType: "areaOfConcern",
  qaManager: "John Doe",
  teamMembers: "John Doe, Sarah Johnson",
  preparer: "John Doe",
  carNum: "1234567890",
  fmeaNum: "0987654321",
  date: new Date(),
})

export const rows = writable([{
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
}])

// export const formData = writable({
//   riskType: "",
//   qaManager: "",
//   teamMembers: "",
//   preparer: "",
//   carNum: "",
//   fmeaNum: "",
//   date: "",
// })

// export const rows = writable([{
//   process: "",
//   failure: "",
//   effect: "",
//   severity: null,
//   cause: "",
//   occurrence: null,
//   controls: "",
//   detection: null,
//   rpn: "",
//   carpar: ""
// }])

