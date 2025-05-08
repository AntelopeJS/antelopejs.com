export async function executeWithConcurrency<T = unknown, R = unknown>(
  list: T[],
  fn: (item: T) => Promise<R>,
  concurrency = 500
): Promise<R[]> {
  const results = [];
  for (let i = 0; i < list.length; i += concurrency) {
    const chunk = list.slice(i, i + concurrency);
    const result = await Promise.all(chunk.map((item) => fn(item)));
    results.push(...result);
  }
  return results;
}
