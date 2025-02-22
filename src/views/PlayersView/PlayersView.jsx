import React, {useState} from "react"
import {usePlayers} from "../../context/PlayersContext"

import "./PlayersView.css"

const PlayersView = () => {
    const [editingPlayer, setEditingPlayer] = useState(null)
    const [newName, setNewName] = useState('')
    const [editingBalance, setEditingBalance] = useState(null)
    const [newBalance, setNewBalance] = useState('')

    const {players, updateBalance, updateName, addPlayer, removePlayer} = usePlayers()

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

    return (<div className="players-view">
        <h1>Gracze</h1>
        <div className="players-container">
            {players.map(player => (
                <div key={`player-view-${player.id}`} className="player-box">
                    {/* player name editing */}
                    <div className="player-name-container">
                        {editingPlayer === player.id
                            ? <input
                                type="text"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                onBlur={() => saveName(player.id)}
                                onKeyDown={(e) => e.key === "Enter" && saveName(player.id)}
                                autoFocus
                            />
                            : <span onClick={() => startEditingName(player)} className="player-name">
                            {player.name} ✎
                        </span>
                        }
                    </div>

                    {/* player's balance edit */}
                    {
                        editingBalance === player.id
                            ? <input
                                type="number"
                                step={100}
                                value={newBalance}
                                onChange={(e) => setNewBalance(e.target.value)}
                                onBlur={() => saveBalance(player.id)}
                                onKeyDown={(e) => e.key === "Enter" && saveBalance(player.id)}
                                autoFocus
                            />
                            : <div onClick={() => startEditingBalance(player)} className="player-balance">
                                {player.balance} zł ✎
                            </div>
                    }

                    {/* deleting player */}
                    {players.length > 1 &&
                        <button className="remove-button" onClick={() => removePlayer(player.id)}>usuń</button>}
                </div>
            ))}
        </div>
        {/* adding player */}
        <div className="add-player-btn-container"></div>
        <button className="add-player-btn" onClick={() => addPlayer()} disabled={players.length >= 4}>
            Dodaj gracza ({players.length}/4)
        </button>
    </div>)
}

export default PlayersView