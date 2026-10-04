// Quote a CSV cell and neutralize spreadsheet formula injection: a leading =, +, -, @,
// tab or CR makes Excel/Sheets evaluate the cell, so prefix those with a single quote.
export function csvCell(value: unknown): string {
  const raw =
    value === null || value === undefined
      ? ''
      : typeof value === 'object'
        ? JSON.stringify(value)
        : String(value);
  const guarded = /^[=+\-@\t\r]/.test(raw) ? `'${raw}` : raw;
  return `"${guarded.replace(/"/g, '""')}"`;
}

export function csvRow(values: unknown[]): string {
  return values.map(csvCell).join(',');
}
