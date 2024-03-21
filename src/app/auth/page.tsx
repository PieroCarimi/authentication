"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthPage = () => {
  const router = useRouter();
  const clientId = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRET;
  const redirectUri = process.env.REDIRECT_URI;
  const {query}:any = router;

  useEffect(() => {
    const handleLogin = async () => {
      try {
        if(!query){
          console.error("L'oggetto query non è definito");
        return;
        }
        const code = query.code as string;
        if (code) {
          const response = await fetch("https://github.com/login/oauth/access_token", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              client_id: clientId,
              client_secret: clientSecret,
              code: code,
              redirect_uri: redirectUri,
            }),
          });

          if (response.ok) {
            const data = await response.text();
            const accessToken = new URLSearchParams(data).get("access_token");
            console.log(accessToken);
            if (accessToken) {
              localStorage.setItem('accessToken', accessToken);
              router.push('/welcome');
            } else {
              console.error("Access token non trovato nella risposta");
            }
          } else {
            console.error('Errore durante la richiesta di access token');
          }
        } else {
          console.error("Parametro 'code' mancante nella query string");
        }
      } catch (error) {
        console.error('Errore durante la richiesta di autorizzazione GitHub:', error);
      }
    };

    handleLogin();
  }, [query]);

  return null;
};

export default AuthPage;

