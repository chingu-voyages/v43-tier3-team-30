import { NextApiRequest, NextApiResponse } from 'next'

import db from '@/lib/prismadb'
import serverAuth from '@/lib/serverAuth'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST' && req.method !== 'DELETE') {
    return res.status(405).end()
  }

  try {
    const { eventId } = req.body

    const { currentUser } = await serverAuth(req, res)

    if (!eventId || typeof eventId !== 'string') {
      throw new Error('Invalid ID')
    }

    const event = await db.event.findUnique({
      where: {
        id: eventId,
      },
    })

    if (!event) {
      throw new Error('Invalid ID')
    }

    let updatedLikedIds = [...(event.likedUserIds || [])]

    if (req.method === 'POST') {
      updatedLikedIds.push(currentUser.id)
    }

    if (req.method === 'DELETE') {
      updatedLikedIds = updatedLikedIds.filter(
        (likedId) => likedId !== currentUser?.id,
      )
    }

    const updatedEvent = await db.event.update({
      where: {
        id: eventId,
      },
      data: {
        likedUserIds: updatedLikedIds,
      },
    })

    return res.status(200).json(updatedEvent)
  } catch (error) {
    console.log(error)
    return res.status(400).end()
  }
}
