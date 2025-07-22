const daysInMonths: [string, number][] = [
    ["January", 31],
    ["February", 28],
    ["March", 31],
    ["April", 30],
    ["May", 31],
    ["June", 30],
    ["July", 31],
    ["August", 31],
    ["September", 30],
    ["October", 31],
    ["November", 30],
    ["December", 31],
  ];

export const getMonthName = (monthNum: number):string => {
  if (monthNum < 0 || monthNum > 11) throw new Error("Invalid month number");
  return daysInMonths[monthNum][0]
}


export const getMonthDays = (monthNum: number):number => {
  if (monthNum < 0 || monthNum > 11) throw new Error("Invalid month number");
  return daysInMonths[monthNum][1]
}

export function getOrdinal(n: number): string {
  const suffixes = ["th", "st", "nd", "rd"];
  const v = n % 100;
  const suffix = (v >= 11 && v <= 13) ? "th" :
                 suffixes[(v % 10)] || "th";
  return `${n}${suffix}`;
}