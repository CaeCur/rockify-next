import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { shuffle } from "lodash";

//import icons
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const colors = [
  "indigo-500",
  "blue-500",
  "green-500",
  "red-500",
  "yellow-500",
  "pink-500",
  "purple-500",
];

export const Details = () => {
  const [color, setColor] = useState(null);

  const { data: session } = useSession();

  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, []);

  return (
    <div className="flex-grow">
      <header className="absolute top-5 right-8">
        <div className="flex items-center bg-red-300 space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2">
          <div className="relative w-10 h-10">
            <Image
              src={session?.user.image}
              alt="user image"
              layout="fill"
              objectFit="cover"
              className="rounded-full"
            />
          </div>

          <h2>{session?.user.name}</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>

      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black from-${color} h-80 text-white padding-8`}
      >
        hello
      </section>
    </div>
  );
};
