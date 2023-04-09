import { NextApiRequest, NextApiResponse } from 'next'

import serverAuth from '@/lib/serverAuth'
import db from '@/lib/prismadb'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'PATCH') {
    return res.status(405).end()
  }

  try {
    const { currentUser } = await serverAuth(req, res)

    console.log(currentUser)

    const { name, image } = req.body

    if (!name) {
      throw new Error('Missing fields')
    }

    const updatedUser = await db.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        name,
        image,
      },
    })

    return res.status(200).json(updatedUser)
  } catch (error) {
    console.log(error)
    return res.status(400).end()
  }
}
