import type { NextPage } from "next";
import Image from "next/image";
import styles from "styles/Login.module.css";

const Login: NextPage = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
      </main>
    </div>
  );
};

export default Login;
