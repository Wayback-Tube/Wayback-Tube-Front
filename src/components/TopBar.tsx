import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import Script from 'next/script'

export default function TopBar(): JSX.Element {
  const { data: session } = useSession();
  return (
    <div className="bg-light-02dp dark:bg-dark-02dp grid place-items-center grid-flow-col gap-2 p-4 shadow-lg fixed left-0 right-0 top-0 z-50">
      <div className="relative h-10 aspect-[1863/510] cursor-pointer place-self-start">
        <Link href={"/"} passHref>
          <img id="waytubeIcon" src="/img/logo-black.png" alt="Wayback Tube's logo" />
        </Link>
      </div>

      <div className="grid grid-cols-[1fr_auto]">
        <input
          className="rounded-l-full bg-light-00dp dark:bg-dark-00dp px-6 h-10"
          placeholder="Search"
          type="text"
        />
        <span className="material-icons bg-light-06dp dark:bg-dark-06dp rounded-r-full !grid place-items-center px-8">
          search
        </span>
      </div>

      <div className="grid grid-flow-col place-items-center gap-4 place-self-end pr-2">
        {session && session.user ? (
          <>
            Signed in as{" "}
            <span className="text-text-emphasis">{session.user.email}</span>{" "}
            <br />
            <button onClick={() => signOut()}>Sign out</button>
          </>
        ) : (
          <>
            Not signed in <br />
            <button onClick={() => signIn()}>Sign in</button>
          </>
        )}
        <button
          id="themeButton"
          className="text-light-00dp dark:text-dark-emphasis dark:hover:text-dark-00dp"
        >
          <span id="themeButtonIcon" className="material-icons text-inherit">dark_mode</span>
        </button>
        <Script src="/js/toggleTheme.js" />
      </div>
    </div>
  );
}

