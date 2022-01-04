import Image from "next/image";
import styles from "styles/Login.module.css";
import { PrismaClient } from "@prisma/client";

export default function Register() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <form className={styles.form} action="/register" method="POST">
          <Image
            src="/img/logo.png"
            alt="Wayback Logo"
            width="1863"
            height="510"
          />
          <input type="text" placeholder="Login..." name="login" />
          <input type="text" placeholder="Password..." name="password" />
          <input className={styles.button} type="submit" value="Create account" />
          <p>
            Already have an account?
            <br />
            <a href="#">Login</a>
          </p>
        </form>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const prisma = new PrismaClient();
  const users = await prisma.user.findMany();
  console.log(users);
  return {
    props: { users },
  };
}

function Form() {
    const registerUser = async event => {
      event.preventDefault()
  
      const res = await fetch(
        'api/register',
        {
          body: JSON.stringify({
            name: event.target.name.value
          }),
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST'
        }
      )
  
      const result = await res.json()
      // result.user => 'Ada Lovelace'
    }
  
    return (
      <form onSubmit={registerUser}>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" type="text" autoComplete="name" required />
        <button type="submit">Register</button>
      </form>
    )
  }
  