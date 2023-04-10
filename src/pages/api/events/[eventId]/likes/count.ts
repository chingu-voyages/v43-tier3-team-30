import { NextApiRequest, NextApiResponse } from 'next'

import db from '@/lib/prismadb'
import serverAuth from '@/lib/serverAuth'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req
  const { eventId } = req.query

  if (!eventId || typeof eventId !== 'string') {
    throw new Error('Invalid ID')
  }

  switch (method) {
    case 'GET':
      const count = await db.like.count({
        where: {
          eventId: eventId,
        },
      })

      res.status(200).json(count)
      break

    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed.`)
  }
}