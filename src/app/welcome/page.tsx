"use client"

import { useEffect, useState } from 'react';

const WelcomePage = () => {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
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
          setUsername(data.login);
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