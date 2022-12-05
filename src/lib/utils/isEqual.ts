export default function isEqual(obj1: unknown, obj2: unknown): boolean {
  const props1 = Object.getOwnPropertyNames(obj1);
  const props2 = Object.getOwnPropertyNames(obj2);

  if (props1.length != props2.length) {
    return false;
  }
  for (let i = 0; i < props1.length; i++) {
    const prop = props1[i];
    const bothAreObjects =
      typeof obj1[prop] === 'object' && typeof obj2[prop] === 'object';
    if (
      (!bothAreObjects && obj1[prop] !== obj2[prop]) ||
      (bothAreObjects && !isEqual(obj1[prop], obj2[prop]))
    ) {
      return false;
    }
  }
  return true;
}
