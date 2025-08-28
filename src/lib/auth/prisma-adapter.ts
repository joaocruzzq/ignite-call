import { prisma } from "../prisma"

import { parseCookies, destroyCookie } from "nookies"

import { NextApiRequest, NextApiResponse } from "next"

import { Adapter, AdapterUser } from "next-auth/adapters"

export function PrismaAdapter(
  req: NextApiRequest,
  res: NextApiResponse
): Adapter {
  return {
    async createUser(user: AdapterUser) {
      const { '@ignite-call:userId': userIdOnCookies } = parseCookies({ req })

      if(!userIdOnCookies) {
        throw new Error("User ID not found on cookies.")
      }

      const prismaUser = await prisma.user.update({
        where: {
          id: userIdOnCookies
        },

        data: {
          name: user.name,
          email: user.email,
          avatar_url: user.avatar_url
        }
      })

      destroyCookie({ res }, "ignite-call:userId", {
        path: "/"
      })

      return {
        id: prismaUser.id,
        emailVerified: null,
        name: prismaUser.name,
        email: prismaUser.email!,
        username: prismaUser.username,
        avatar_url: prismaUser.avatar_url!,
      }
    },

    async getUser(id) {
      const user = await prisma.user.findUnique({
         where: {
            id
         }
      })

      if(!user) {
        return null
      }

      return {
         id: user.id,
         name: user.name,
         email: user.email!,
         emailVerified: null,
         username: user.username,
         avatar_url: user.avatar_url!,
      }
    },

    async getUserByEmail(email) {
      const user = await prisma.user.findUnique({
         where: {
            email
         }
      })

      if(!user) {
        return null
      }

      return {
         id: user.id,
         name: user.name,
         email: user.email!,
         emailVerified: null,
         username: user.username,
         avatar_url: user.avatar_url!,
      }
    },

    async getUserByAccount({ providerAccountId, provider }) {
      const account = await prisma.account.findUnique({
        where: {
          provider_provider_account_id: {
            provider,
            provider_account_id: providerAccountId
          }
        },

        include: {
          user: true
        }
      })

      if(!account) {
        return null
      }

      const { user } = account

      return {
         id: user.id,
         name: user.name,
         email: user.email!,
         emailVerified: null,
         username: user.username,
         avatar_url: user.avatar_url!,
      }
    },

    async updateUser(user) {
      const prismaUser = await prisma.user.update({
        where: {
          id: user.id!
        },

        data: {
          name: user.name,
          email: user.email,
          avatar_url: user.avatar_url
        }
      })

      return {
        id: prismaUser.id,
        emailVerified: null,
        name: prismaUser.name,
        email: prismaUser.email!,
        username: prismaUser.username,
        avatar_url: prismaUser.avatar_url!,
      }
    },

    async linkAccount(account: any) {
      await prisma.account.create({
        data: {
          type: account.type,
          scope: account.scope,
          user_id: account.userId,
          id_token: account.id_token,
          provider: account.provider,
          token_type: account.token_type,
          expires_at: account.expires_at,
          refresh_token: account.refresh_token,
          session_state: account.session_state,
          provider_account_id: account.providerAccountId,
        }
      })
    },

    async createSession({ sessionToken, userId, expires }) {
      await prisma.session.create({
        data: {
          expires,
          user_id: userId,
          session_token: sessionToken
        }
      })

      return {
        userId,
        expires,
        sessionToken
      }
    },

    async getSessionAndUser(sessionToken) {
      const prismaSession = await prisma.session.findUnique({
        where: {
          session_token: sessionToken
        },

        include: {
          user: true
        }
      })

      if(!prismaSession) {
        return null
      }

      const { user, ...session } = prismaSession

      return {
        session: {
          userId: session.user_id,
          expires: session.expires,
          sessionToken: session.session_token
        },

        user: {
          id: user.id,
          name: user.name,
          email: user.email!,
          emailVerified: null,
          username: user.username,
          avatar_url: user.avatar_url!
        }
      }
    },

    async updateSession({ sessionToken, userId, expires }) {
      const prismaSession = await prisma.session.update({
        where: {
          session_token: sessionToken
        },

        data: {
          expires,
          user_id: userId
        }
      })

      return {
        userId: prismaSession.user_id,
        expires: prismaSession.expires,
        sessionToken: prismaSession.session_token
      }
    },

    async deleteSession(sessionToken) {
      await prisma.session.delete({
        where: {
          session_token: sessionToken
        }
      })
    }
  }
}