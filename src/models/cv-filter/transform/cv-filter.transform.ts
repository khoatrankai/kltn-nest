export function filter(result: any) {
  const uniqueArray = [];
  const seenIds = new Set();
  for (const item of result) {
    if (!seenIds.has(item.id)) {
      seenIds.add(item.id);
      uniqueArray.push(item);
    }
  }

  return uniqueArray;
}
