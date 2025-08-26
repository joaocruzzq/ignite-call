import { prisma } from "../prisma"

import { Adapter } from "next-auth/adapters"

export function PrimaAdapter(): Adapter {
  return {
    async createUser(user) {},

    async getUser(id) {
      const user = await prisma.user.findUniqueOrThrow({
         where: {
            id
         }
      })

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
      const user = await prisma.user.findUniqueOrThrow({
         where: {
            email
         }
      })

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
      const { user } = await prisma.account.findUniqueOrThrow({
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
      const { user, ...session } = await prisma.session.findUniqueOrThrow({
        where: {
          session_token: sessionToken
        },

        include: {
          user: true
        }
      })

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
  }
}