/* eslint-disable @next/next/no-img-element */
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import Script from "next/script";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export default function TopBar(): JSX.Element {
  const { data: session } = useSession();
  const router = useRouter();

  function sendSearch() {
    const elem = document.querySelector<HTMLInputElement>("#searchBarInput");
    if (elem && elem.value) {
      router.push("/watch/" + elem.value);
    }
  }

  return (
    <div className="bg-light-02dp dark:bg-dark-02dp grid place-items-center grid-flow-col gap-2 p-4 shadow-lg fixed left-0 right-0 top-0 z-50">
      <div className="h-10 cursor-pointer place-self-start">
        <Link href={"/"} passHref>
          <img
            className="h-full"
            id="waytubeIcon"
            src="/img/logo-black.png"
            alt="Wayback Tube's logo"
          />
        </Link>
      </div>

      <div className="grid grid-cols-[1fr_auto]">
        <input
          id="searchBarInput"
          className="rounded-l-full bg-light-00dp dark:bg-dark-00dp px-6 h-10"
          placeholder="Search"
          type="text"
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              sendSearch();
            }
          }}
        />
        <span
          onClick={sendSearch}
          className="material-icons bg-light-06dp dark:bg-dark-06dp rounded-r-full !grid place-items-center px-8 cursor-pointer"
        >
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
            <button onClick={() => signIn()}>Sign in</button>
          </>
        )}
        <button
          id="themeButton"
          className="text-light-00dp dark:text-dark-emphasis dark:hover:text-dark-00dp"
        >
          <span id="themeButtonIcon" className="material-icons text-inherit">
            dark_mode
          </span>
        </button>
        <Link href="https://github.com/Wayback-Tube/Wayback-Tube-Front" passHref>
          <button className="text-light-00dp dark:text-dark-emphasis dark:hover:text-dark-00dp">
            <FontAwesomeIcon className="text-2xl" icon={faGithub} />
          </button>
        </Link>

        <Script src="/js/toggleTheme.js" />
      </div>
    </div>
  );
}
