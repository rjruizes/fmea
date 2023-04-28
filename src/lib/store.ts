import { writable, derived, type Writable } from 'svelte/store';

export const formData = writable({
  riskType: "",
  qaManager: "",
  teamMembers: "",
  preparer: "",
  carNum: "",
  fmeaNum: "",
  date: new Date(),
})
export type ActivityRowObj = {
  process: string;
  failure: string;
  effect: string;
  severity: number | null;
  cause: string;
  occurrence: number | null;
  controls: string;
  detection: number | null;
  rpn: number | null;
  carpar: string;
  actionTaken: string
}

// Define type for rows
type Rows = Writable<ActivityRowObj[]>


export const rows:Rows = writable([{
  process: "",
  failure: "",
  effect: "",
  severity: null,
  cause: "",
  occurrence: null,
  controls: "",
  detection: null,
  rpn: null,
  carpar: "",
  actionTaken: ""
}])

// Define type for results
export type Submission = {
  process: string;
  failure: string;
  effect: string;
  severity: number;
  cause: string;
  occurrence: number;
  controls: string;
  detection: number;
  rpn: number;
  carpar: string;
  actionTaken: string
}
type SubmissionDict = Writable<{
  [key: number]: Submission
}>
export const submissionCount = writable(0)
export const submissions: SubmissionDict = writable({})
export const currentSubmission = derived([submissions, submissionCount], ([$submissions, $submissionCount]) => {
  return $submissions[$submissionCount - 1]
})
