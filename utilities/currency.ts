const ghsFormatter = new Intl.NumberFormat("en-GH", {
  style: "currency",
  currency: "GHS",
});

export function formatCurrency(value: number | null): string {
  if (value === null || isNaN(value)) return "GH₵0.00";
  return ghsFormatter.format(value);
}

export function parseCurrency(value: string): number {
  return parseFloat(value.replace(/[^0-9.-]+/g, ""));
}
