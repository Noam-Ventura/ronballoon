import type { NextApiRequest, NextApiResponse } from 'next';
import { getEdgeConfig } from '@/lib/edgeConfig';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const key = String(req.query.key || 'greeting');
  const value = await getEdgeConfig(key);
  return res.status(200).json({ key, value });
}


