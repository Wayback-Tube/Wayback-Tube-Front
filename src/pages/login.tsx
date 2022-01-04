import type { NextPage } from "next";
import Image from "next/image";
import styles from "styles/Login.module.css";
import { PrismaClient, User} from "@prisma/client";

const Login: NextPage = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <form className={styles.form} action="." method="POST">
          <Image
            src="/img/logo.png"
            alt="Wayback Logo"
            width="1863"
            height="510"
          />
          <input type="text" placeholder="Login..." name="login" />
          <input type="text" placeholder="Password..." name="password" />
          <input className={styles.button} type="submit" value="Connect" />
          <p>
            New to WayBack Tube?
            <br />
            <a href="#">Create an account</a>
          </p>
        </form>
      </main>
    </div>
  );
};

export async function getStaticProps() {
  const prisma = new PrismaClient();
  const users = await prisma.user.findMany();
  console.log(users);
  return {
    props: { users },
  };
}


export default Login;
