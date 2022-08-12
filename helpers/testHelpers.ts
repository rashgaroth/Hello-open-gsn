export const sleep = (ms: number) => new Promise(r => setTimeout(r, parseInt(((ms % 60000) / 1000).toFixed(0))))
export const getAnyClass = (obj: object) => {
  if (typeof obj === "undefined") return "undefined";
  if (obj === null) return "null";
  return obj.constructor.name;
}
export const toSmallUnit = (price: number, decimal: number): number => {
  return price / Math.pow(10, decimal)
}
export const toNormalUnit = (price: number, decimal: number): number => price * Math.pow(10, decimal)