import { NextApiRequest, NextApiResponse } from 'next'

import db from '@/lib/prismadb'
import serverAuth from '@/lib/serverAuth'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req
  const { eventId } = req.query
  const { currentUser } = await serverAuth(req, res)

  if (!eventId || typeof eventId !== 'string') {
    throw new Error('Invalid ID')
  }

  switch (method) {
    case 'GET':
      const like = await db.like.findUnique({
        where: {
          userId_eventId: {
            userId: currentUser.id,
            eventId: eventId,
          },
        },
      })

      res.status(200).json(like)
      break

    case 'POST':
      const createdLike = await db.like.create({
        data: {
          userId: currentUser.id,
          eventId: eventId,
        },
      })

      res.status(200).json(createdLike)
      break
    case 'DELETE':
      const deletedLike = await db.like.delete({
        where: {
          userId_eventId: {
            userId: currentUser.id,
            eventId: eventId,
          },
        },
      })

      res.status(200).json(deletedLike)
      break

    default:
      res.setHeader('Allow', ['DELETE', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed.`)
  }
  // const event = await db.event.findUnique({
  //   where: {
  //     id: eventId,
  //   },
  // })

  // if (!event) {
  //   throw new Error('Invalid ID')
  // }

  // let updatedLikedIds = [...(event.likedUserIds || [])]

  // if (req.method === 'POST') {
  //   updatedLikedIds.push(currentUser.id)
  // }

  // if (req.method === 'DELETE') {
  //   updatedLikedIds = updatedLikedIds.filter(
  //     (likedId) => likedId !== currentUser?.id,
  //   )
  // }

  // const updatedEvent = await db.event.update({
  //   where: {
  //     id: eventId,
  //   },
  //   data: {
  //     likedUserIds: updatedLikedIds,
  //   },
  // })

  // return res.status(200).json(updatedEvent)
}
