import React, { useState } from 'react'
import { ethers } from 'ethers'

export default function App() {
  const [status, setStatus] = useState('Ready')

  // Placeholder UI for interacting with BlockLucky contract
  return (
    <div className="container">
      <h1>BlockLucky - Loterie</h1>
      <p>Status: {status}</p>

      <section>
        <h2>Actions</h2>
        <button onClick={() => setStatus('Connect wallet (not implemented)')}>Connect Wallet</button>
        <button onClick={() => setStatus('Create lottery (owner only)')}>Create Lottery</button>
        <button onClick={() => setStatus('Buy ticket (not implemented)')}>Buy Ticket</button>
      </section>

      <section>
        <h2>Notes</h2>
        <ul>
          <li>Ce front est un scaffold minimal. Installez les dépendances avec <code>npm install</code> dans <code>frontend/</code>.</li>
          <li>Ensuite <code>npm run dev</code> pour démarrer l'app (Vite).</li>
          <li>Connecter la logique du contrat via <code>ethers</code> et l'adresse du contrat déployé.</li>
        </ul>
      </section>
    </div>
  )
}
