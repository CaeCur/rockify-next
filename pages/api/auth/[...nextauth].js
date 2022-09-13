import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import spotifyApi, { LOGIN_URL } from "../../../lib/spotify";

async function refreshAccessToken(token) {
  try {
    spotifyApi.setAccessToken(token.accessToken);
    spotifyApi.setRefreshToken(token.refreshToken);

    const { body: refreshedToken } = await spotifyApi.refreshAccessToken();

    console.log("refreshed token is: ", refreshedToken);

    return {
      ...token,
      accessToken: refreshedToken,
      accessTokenExpires: Date.now + refreshedToken.expires_in * 1000, //this will rep 1 hour since 3600 returns from spotify api
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken, //replace if new one is offered, else fall back on old
    };
  } catch (err) {
    console.log(err);
    return { ...token, error: "RefreshAccessTokenError" };
  }
}

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      authorization: LOGIN_URL,
    }),
    // ...add more providers here
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    // this info can be found https://next-auth.js.org/tutorials/refresh-token-rotation
    async jwt({ token, account, user }) {
      //intitila sign in
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires: account.expires_at * 1000, //handle expiry time in ms
        };
      }

      // return prev token if access token not expired
      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      //access token expired, needs refresh
      return await refreshAccessToken(token);
    },
    async session({ session, token }) {
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.username = token.username;

      return session;
    },
  },
};
export default NextAuth(authOptions);
