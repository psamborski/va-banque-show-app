import React, { createContext, useContext, useState } from "react"
import PropTypes from 'prop-types'

const PlayersContext = createContext()

export const PlayersProvider = ({ children }) => {
    const [players, setPlayers] = useState([
        { id: 1, name: "Gracz 1", balance: 0 },
        { id: 2, name: "Gracz 2", balance: 0 },
    ])

    const updateBalance = (id, amount) => {
        setPlayers(prevPlayers =>
            prevPlayers.map(player =>
                player.id === id ? { ...player, balance: player.balance + amount } : player
            )
        )
    }

    const updateName = (id, newName) => {
        setPlayers(prevPlayers =>
            prevPlayers.map(player =>
                player.id === id ? { ...player, name: newName } : player
            )
        )
    }

    const addPlayer = () => {
        if (players.length < 4) {
            setPlayers([...players, { id: Date.now(), name: `Player ${players.length + 1}`, balance: 0 }])
        }
    }

    const removePlayer = (id) => {
        if (players.length > 1) {
            setPlayers(players.filter(player => player.id !== id))
        }
    }

    return (
        <PlayersContext.Provider value={{ players, updateBalance, updateName, addPlayer, removePlayer }}>
            {children}
        </PlayersContext.Provider>
    )
}

PlayersProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired
}

export const usePlayers = () => useContext(PlayersContext)