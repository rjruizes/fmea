
export function calculateRPN(severity:number, occurrence:number, detection:number) {
  if(severity && occurrence && detection) {
    return severity * (occurrence + detection)
  } else {
    return ""
  }
}