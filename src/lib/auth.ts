import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { magicLink } from "better-auth/plugins";

import { prisma } from "@/lib/prisma";
import { sendMagicLinkEmail } from "@/lib/mail";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,

  plugins: [
    magicLink({
      async sendMagicLink({ email, url }) {
        await sendMagicLinkEmail({
          email,
          url,
        });
      },
    }),
  ],
});