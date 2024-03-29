import { format } from 'date-fns';

export function generateUuid(): string {
  if ('crypto' in window) {
    // return crypto.randomUUID()
  } else {
    // Public Domain/MIT
    let d = new Date().getTime(); //Timestamp
    let d2 = (performance && performance.now && performance.now() * 1000) || 0; //Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        let r = Math.random() * 16; //random number between 0 and 16
        if (d > 0) {
          //Use timestamp until depleted
          r = (d + r) % 16 | 0;
          d = Math.floor(d / 16);
        } else {
          //Use microseconds since page-load if supported
          r = (d2 + r) % 16 | 0;
          d2 = Math.floor(d2 / 16);
        }
        return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
      }
    );
  }
}

export const isObject = (obj: object): boolean => {
  return Object.prototype.toString.call(obj) === '[object Object]';
};

export const getNestedProp = <T extends object, ReturnType>(
  obj: T,
  path: string
): ReturnType | null => {
  if (!isObject(obj)) return null;

  const arr: Array<string> = path.split('.');
  let result = Object.assign({}, obj);
  while (arr.length && result) {
    const shift = arr.shift();
    if (shift) result = result?.[shift];
  }

  return result as ReturnType;
};

export function formatPrice(inputString: string) {
  // Remove any non-digit characters
  const numericString = inputString.replace(/\D/g, '');

  const stringWithoutSpaces = numericString.replace(/\s/g, '');

  if (stringWithoutSpaces) return `$${stringWithoutSpaces.trim()}`;
  return '';
}

export function formatDate(date: Date): string {
  if (!date) return '';
  return format(date, 'E MMM dd yyyy');
}
