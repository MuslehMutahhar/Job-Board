import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

// Demo user for testing
const demoUser = {
  id: "1",
  name: "Demo User",
  email: "demo@example.com",
  // Password: "demo1234"
  password: "$2a$10$8VKjUhKUCRw5XJUzqvxM.eYD13r7W0GTDA1L.rdHiu4BB6ZdQAgvO",
  role: "USER",
};

// Demo company user for testing
const demoCompany = {
  id: "2",
  name: "Demo Company",
  email: "company@example.com",
  // Password: "company1234"
  password: "$2a$10$8VKjUhKUCRw5XJUzqvxM.eYD13r7W0GTDA1L.rdHiu4BB6ZdQAgvO",
  role: "COMPANY",
};

// Demo admin user for testing
const demoAdmin = {
  id: "3",
  name: "Admin User",
  email: "admin@example.com",
  // Password: "admin1234"
  password: "$2a$10$8VKjUhKUCRw5XJUzqvxM.eYD13r7W0GTDA1L.rdHiu4BB6ZdQAgvO",
  role: "ADMIN",
};

const users = [demoUser, demoCompany, demoAdmin];

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        const user = users.find(u => u.email === credentials.email);

        if (!user || !user.password) {
          throw new Error("Invalid credentials");
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          throw new Error("Invalid credentials");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id as string,
          email: token.email as string,
          name: token.name as string,
          role: token.role as string,
        };
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/logout",
    error: "/auth/error",
  },
  secret: process.env.NEXTAUTH_SECRET || "demo-secret-do-not-use-in-production",
  debug: true, // Enable debug mode to see more detailed errors
}; 