import { isNumber } from './utils';

export const widerThan = (width) => isNumber(width) && window.innerWidth > width;
export const narrowerThan = (width) => isNumber(width) && window.innerWidth < width;
export const tallerThan = (height) => isNumber(height) && window.innerHeight > height;
export const shorterThan = (height) => isNumber(height) && window.innerHeight < height;
