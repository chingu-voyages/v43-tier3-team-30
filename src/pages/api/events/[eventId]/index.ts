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
    res.status(400).json('Missing Event ID.')
    return
  }

  switch (method) {
    case 'GET':
      const event = await db.event.findUnique({
        where: {
          id: eventId,
        },
      })

      res.status(200).json(event)
      break

    case 'PATCH':
      const { title, brochure_img, favorite, tag } = req.body
      const { currentUser } = await serverAuth(req, res)

      if (!currentUser) {
        res.status(401).json('Sign In Required.')
        break
      }

      const updatedEvent = await db.event.update({
        where: {
          id: eventId,
        },
        data: {
          title: title,
          brochure_img: brochure_img,
          favorite: favorite,
          tag: tag,
          userId: currentUser.id,
        },
      })

      res.status(200).json(updatedEvent)
      break

    case 'DELETE':
      const deletedEvent = await db.event.delete({
        where: {
          id: eventId,
        },
      })

      res.status(200).json(deletedEvent)
      break

    default:
      res.setHeader('Allow', ['GET', 'PATCH', 'DELETE'])
      res.status(405).end(`Method ${method} Not Allowed.`)
  }
}
