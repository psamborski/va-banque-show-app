import React, { useState } from 'react'
import { usePlayers } from '../../context/PlayersContext'
import './PlayersView.css'

const PlayersView = () => {
  const [editingPlayer, setEditingPlayer] = useState(null)
  const [newName, setNewName] = useState('')
  const [editingBalance, setEditingBalance] = useState(null)
  const [newBalance, setNewBalance] = useState('')

  const { players, updateBalance, updateName, addPlayer, removePlayer } = usePlayers()

  const startEditingName = (player) => {
    setEditingPlayer(player.id)
    setNewName(player.name)
  }

  const saveName = (id) => {
    updateName(id, newName)
    setEditingPlayer(null)
  }

  const startEditingBalance = (player) => {
    setEditingBalance(player.id)
    setNewBalance(player.balance)
  }

  const saveBalance = (id) => {
    const parsedBalance = parseInt(newBalance, 10)
    if (!isNaN(parsedBalance)) {
      updateBalance(id, parsedBalance)
    }
    setEditingBalance(null)
  }

  return (
    <div className="players-view">
      <h1 className="players-view__title">Gracze</h1>
      <div className="players-view__players-container">
        {players.map((player) => (
          <div key={`player-view-${player.id}`} className="players-view__player-box">
            {/* player's name edit */}
            <div className="players-view__name-container">
              {editingPlayer === player.id ? (
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  onBlur={() => saveName(player.id)}
                  onKeyDown={(e) => e.key === 'Enter' && saveName(player.id)}
                  autoFocus
                  className="players-view__name-input"
                />
              ) : (
                <span
                  onClick={() => startEditingName(player)}
                  className="players-view__name-display"
                >
                  {player.name} ✎
                </span>
              )}
            </div>

            {/* balance edit */}
            {editingBalance === player.id ? (
              <input
                type="number"
                step={100}
                value={newBalance}
                onChange={(e) => setNewBalance(e.target.value)}
                onBlur={() => saveBalance(player.id)}
                onKeyDown={(e) => e.key === 'Enter' && saveBalance(player.id)}
                autoFocus
                className="players-view__balance-input"
              />
            ) : (
              <div
                onClick={() => startEditingBalance(player)}
                className="players-view__balance-display"
              >
                {player.balance} zł ✎
              </div>
            )}

            {/* delete button */}
            {players.length > 1 && (
              <button
                className="players-view__button players-view__button--remove"
                onClick={() => removePlayer(player.id)}
              >
                usuń
              </button>
            )}
          </div>
        ))}
      </div>

      {/* add button */}
      <div className="players-view__add-section">
        <button
          className="players-view__button players-view__button--add"
          onClick={() => addPlayer()}
          disabled={players.length >= 4}
        >
          Dodaj gracza ({players.length}/4)
        </button>
      </div>
    </div>
  )
}

export default PlayersView