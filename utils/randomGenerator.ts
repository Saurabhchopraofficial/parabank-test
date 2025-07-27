export function generateRandomUsername(prefix = 'user') {
  return `${prefix}_${Math.floor(Math.random() * 100000)}`;
}