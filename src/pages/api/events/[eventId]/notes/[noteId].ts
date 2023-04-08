import { NextApiRequest, NextApiResponse } from 'next'

import db from '@/lib/prismadb'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req
  const { noteId } = req.query

  if (!noteId || typeof noteId !== 'string') {
    res.status(400).json('Missing Note ID.')
    return
  }

  switch (method) {
    case 'GET':
      const note = await db.note.findUnique({
        where: {
          id: noteId,
        },
      })

      res.status(200).json(note)
      break

    case 'PATCH':
      const { content } = req.body

      const updatedNote = await db.note.update({
        where: {
          id: noteId,
        },
        data: {
          content: content,
        },
      })

      res.status(200).json(updatedNote)
      break

    case 'DELETE':
      const deletedNote = await db.note.delete({
        where: {
          id: noteId,
        },
      })

      res.status(200).json(deletedNote)
      break

    default:
      res.setHeader('Allow', ['GET', 'PATCH', 'DELETE'])
      res.status(405).end(`Method ${method} Not Allowed.`)
  }
}
