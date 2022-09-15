import Head from "next/head";
import Image from "next/image";
import { Details } from "../components/Details";
import Sidebar from "../components/Sidebar";

export default function Home() {
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
