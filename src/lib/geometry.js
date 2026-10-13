import { NUQTA } from '@/constants/nastaliq';

/** لوزیِ «نقطه» با مرکز (x, y) */
export const diamondPath = (x, y, u = NUQTA) =>
  `M${x} ${y - u / 2}L${x + u * 0.4} ${y}L${x} ${y + u / 2}L${x - u * 0.4} ${y}Z`;
