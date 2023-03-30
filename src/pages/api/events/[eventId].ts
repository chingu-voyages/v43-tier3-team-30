import { NextApiRequest, NextApiResponse } from 'next'

import db from '@/lib/prismadb'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  try {
    const { eventId } = req.query

    if (!eventId || typeof eventId !== 'string') {
      throw new Error('Invalid ID')
    }

    const event = await db.event.findUnique({
      where: {
        id: eventId,
      },
      include: {
        user: true,
      },
    })

    return res.status(200).json(event)
  } catch (error) {
    console.log(error)
    return res.status(400).end()
  }
}
