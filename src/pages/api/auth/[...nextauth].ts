import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import CredentialsProvider from 'next-auth/providers/credentials'
import db from '../../../lib/prismadb'
import * as bcrypt from 'bcrypt'

function getGoogleCredentials(): { clientId: string; clientSecret: string } {
  const clientId = process.env.GOOGLE_CLIENT_ID
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET
  if (!clientId || clientId.length === 0) {
    throw new Error('No clientId for google provider.')
  }

  if (!clientSecret || clientSecret.length === 0) {
    throw new Error('No clientSecret for google provider.')
  }

  return { clientId, clientSecret }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: 'jwt',
  },
  providers: [
    GoogleProvider({
      clientId: getGoogleCredentials().clientId,
      clientSecret: getGoogleCredentials().clientSecret,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'Email Address' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const { email, password } = credentials as {
          email: string
          password: string
        }

        const dbUser = await db.user.findUnique({
          where: {
            email: email,
          },
        })
        console.log(dbUser)

        if (!dbUser) return null
        if (!dbUser.hashedPassword) return null

        const authentication = await bcrypt.compare(
          password,
          dbUser.hashedPassword,
        )

        if (!authentication) return null

        return dbUser
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
      }

      return session
    },
    async jwt({ token, user }) {
      const dbUser = await db.user.findUnique({
        where: {
          email: token.email!,
        },
      })

      if (!dbUser) {
        token.id = user!.id
        return token
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
      }
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
}

export default NextAuth(authOptions)
