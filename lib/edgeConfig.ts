import { get } from '@vercel/edge-config';

export async function getEdgeConfig<T = unknown>(key: string): Promise<T | null> {
  try {
    const value = await get<T>(key);
    return (value as T) ?? null;
  } catch {
    return null;
  }
}


