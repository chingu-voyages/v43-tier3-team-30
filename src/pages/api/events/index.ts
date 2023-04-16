import { NextApiRequest, NextApiResponse } from 'next'

import serverAuth from '@/lib/serverAuth'
import db from '@/lib/prismadb'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req

  switch (method) {
    case 'GET':
      const { userId } = req.query

      if (userId && typeof userId === 'string') {
        const ownedEvents = await db.event.findMany({
          where: {
            userId: userId,
          },
          include: {
            user: true,
            likes: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        })

        res.status(200).json(ownedEvents)
        break
      } else {
        const publicEvents = await db.event.findMany({
          where: {
            isPublic: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        })

        res.status(200).json(publicEvents)
        break
      }

    case 'POST':
      const { currentUser } = await serverAuth(req, res)
      const { title, brochure_img, favorite, tag } = req.body

      const event = await db.event.create({
        data: {
          title,
          brochure_img,
          favorite,
          tag,
          userId: currentUser.id,
        },
      })

      res.status(200).json(event)
      break

    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed.`)
  }
}
