import Link from "next/link";

export default function Home() {
  const clientId = process.env.CLIENT_ID;
  const redirectUri = process.env.REDIRECT_URI;

  return (
    <>
      <Link href={`https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}`}>Accedi</Link>
    </>
  );
}
