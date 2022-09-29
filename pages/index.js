import { getSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { Details } from "../components/Details";
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

      <div>{/* player */}</div>
    </div>
  );
}

//pre-render user on server to get access token before hitting client
export async function getServerSideProps(context) {
  const sessionData = await getSession(context);

  return { props: { sessionData } };
}
