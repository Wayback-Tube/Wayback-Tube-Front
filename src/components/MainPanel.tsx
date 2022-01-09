export default function MainPanel(): JSX.Element {
  const { data: session } = useSession();
  return (
    <div className="bg-02dp grid grid-flow-col h-20 p-4 shadow-lg fixed left-0 right-0 top-0">
      <div className="relative h-12 aspect-[1863/510] cursor-pointer">
        <Link href={"/"} passHref>
          <Image src="/img/logo.png" layout="fill" alt="" />
        </Link>
      </div>

      <div className="grid grid-flow-col place-items-center gap-4 justify-end">
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
