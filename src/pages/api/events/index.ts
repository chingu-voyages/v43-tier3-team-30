import { NextApiRequest, NextApiResponse } from 'next'

import serverAuth from '@/lib/serverAuth'
import db from '@/lib/prismadb'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST' && req.method !== 'GET') {
    return res.status(405).end()
  }

  try {
    if (req.method === 'POST') {
      const { currentUser } = await serverAuth(req)
      const { title, note, brochure_img, favorite, tag } = req.body

      const event = await db.event.create({
        data: {
          title,
          note,
          brochure_img,
          favorite,
          tag,
          userId: currentUser.id,
        },
      })
      return res.status(200).json(event)
    }

    if (req.method === 'GET') {
      const { userId } = req.query

      let events

      if (userId && typeof userId === 'string') {
        events = await db.event.findMany({
          where: {
            userId,
          },
          include: {
            user: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        })
      } else {
        events = await db.event.findMany({
          orderBy: {
            createdAt: 'desc',
          },
        })
      }

      return res.status(200).json(events)
    }
  } catch (error) {
    console.log(error)
    return res.status(400).end()
  }
}
