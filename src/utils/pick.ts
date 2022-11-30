export const pick = <T extends Record<string, any>>(object: T, keys: (keyof T)[]) => {
  return keys.reduce((obj, key) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      obj[key] = object[key];
    }
    return obj;
  }, {} as T);
};
