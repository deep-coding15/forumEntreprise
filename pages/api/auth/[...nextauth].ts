import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Nom d'utilisateur", type: "text", placeholder: "admin" },
        password: { label: "Mot de passe", type: "password" }
      },
      async authorize(credentials) {
        // Remplacer par une vraie vérification en base de données !
        if (credentials?.username === "admin" && credentials?.password === "admin") {
          return { id: 1, name: "Admin" };
        }
        return null;
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/admin-login"
  }
}); 