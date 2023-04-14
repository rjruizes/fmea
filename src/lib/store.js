import { writable } from 'svelte/store';

export const formData = writable({
  riskType: "nonConformance",
  qaManager: "John Doe",
  teamMembers: "John Doe, Sarah Johnson",
  preparer: "John Doe",
  carNum: "1234567890",
  fmeaNum: "0987654321",
  date: "03/14/2023",
})

export const rows = writable([{
  process: "Spelunking",
  failure: "Falling",
  effect: "Injury",
  severity: 4,
  cause: "Slipping",
  occurrence: 2,
  controls: "Harnesses",
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

