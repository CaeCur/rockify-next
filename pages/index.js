import { getSession } from "next-auth/react";
import { Details } from "../components/Details";
import { Player } from "../components/Player";
import Sidebar from "../components/Sidebar";

export default function Home() {
  // console.log(sessionData);
  return (
    <div className="bg-black h-screen overflow-hidden">
      <main className="flex">
        {/* sidebar */}
        <Sidebar />
        {/* details */}
        <Details />
      </main>

      <div className="sticky bottom-0">
        {/* player */}
        <Player />
      </div>
    </div>
  );
}

//pre-render user on server to get access token before hitting client
export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
