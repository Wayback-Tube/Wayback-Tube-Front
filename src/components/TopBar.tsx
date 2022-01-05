import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

export default function MainPanel(): JSX.Element {
  const { data: session } = useSession();
  return (
    <div className="bg-dark grid grid-flow-col h-20 place-content-center p-4">
      <img className="h-full" src="/img/logo.png" />
      <div className="grid grid-flow-col place-items-center gap-4">
        {session && session.user ? (
          <>
            Signed in as {session.user.email} <br />
            <button onClick={() => signOut()}>Sign out</button>
          </>
        ) : (
          <>
            Not signed in <br />
            <button onClick={() => signIn()}>Sign in</button>
          </>
        )}
      </div>
    </div>
  );
}
