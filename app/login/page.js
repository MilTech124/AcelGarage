'use client'
import React from 'react';

function login() {
    fetch('https://backend.acelgarage.pl/backend/wp-login.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        log: 'JaroAdmin',
        pwd: 'zaq1@WSX',
        wp_submit: 'Log In',
        redirect_to: 'https://backend.acelgarage.pl/backend/wp-admin/',
        testcookie: 1,
      }),
      credentials: 'include', // Include cookies
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then(data => {
      console.log(data);
      // Redirect the user
      window.location.href = 'https://backend.acelgarage.pl/backend/wp-admin/';
    })
    .catch((error) => console.error('Error:', error));
  }

function LoginPage() {
  return (
    <button onClick={login}>Login to WordPress</button>
  );
}

export default LoginPage;