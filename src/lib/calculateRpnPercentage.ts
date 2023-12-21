
export const calculateRpnPercentage = (previousScore: number, currentScore: number) => {
  const percentage = (previousScore - currentScore) / previousScore * 100
  return Math.round(percentage)
}

export const formatRpnPercentageMessage = (reduction: number) => {
  return `RPN ${reduction < 0 ? "Increase" : "Reduction"}`
}
