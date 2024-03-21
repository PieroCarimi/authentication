"use client"
// pages/welcome.tsx
import { useEffect, useState } from 'react';

const WelcomePage = () => {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    // Recupera l'access token dal localStorage
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      // Se l'access token è presente, fai una richiesta per ottenere i dati dell'utente
      fetch("https://api.github.com/user", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Failed to fetch user data');
          }
        })
        .then(data => {
          setUsername(data.login); // Salva il nome dell'utente nello stato
        })
        .catch(error => {
          console.error('Errore durante il recupero dei dati utente:', error);
        });
    }
  }, []);

  return (
    <main>
      {username && (
        <h1>Benvenuto, {username}!</h1>
      )}
    </main>
  );
};

export default WelcomePage;