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

    switch ( method ) {
        case 'GET':
            const notes = await db.note.findMany({
                where: {
                    eventId: eventId,
                },
            })

            res.status(200).json(notes)
            break

        case 'POST':
            const { content } = req.body
            const { currentUser } = await serverAuth(req)

            if (!currentUser) {
                res.status(401).json("Sign In Required.")
                break
            }

            const note = await db.note.create({
                data: {
                    content: content,
                    userId: currentUser.id,
                    eventId: eventId
                },
            })
        
            res.status(200).json(note)
            break
            
        default:
            res.setHeader('Allow', ['GET', 'POST'])
            res.status(405).end(`Method ${method} Not Allowed.`)
    }
}