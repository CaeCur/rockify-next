import { getProviders, signIn } from "next-auth/react";

//icons import
import { MusicalNoteIcon } from "@heroicons/react/24/outline";

function login({ providers }) {
  return (
    <div className="flex flex-col items-center bg-black min-h-screen w-full justify-center">
      <MusicalNoteIcon className="w-52 text-[#18D860] mb-5" />

      <div className="flex items-center text-center text-white mb-5 w-[50%]">
        <p>
          Due to the nature of the Spotify API, this app currently only acts as a controller for
          your Spotify device. Therefore, you should have Spotify active on a device in order to use
          this app.
        </p>
      </div>

      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            className="bg-[#18D860] text-white p-5 rounded-full"
            onClick={() => signIn(provider.id, { callbackUrl: "/" })}
          >
            Login with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}

export default login;

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
