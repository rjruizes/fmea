
export function calculateRPN(severity:number|null, occurrence:number|null, detection:number|null) {
  if(severity && occurrence && detection) {
    return severity * (occurrence + detection)
  } else {
    return ""
  }
}