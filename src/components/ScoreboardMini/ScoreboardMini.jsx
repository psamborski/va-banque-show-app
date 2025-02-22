import React, {useState} from "react"

import {usePlayers} from "../../context/PlayersContext"

import "./ScoreboardMini.css"

const ScoreboardMini = () => {
    const [moneyChange, setMoneyChange] = useState('')
    const [selectedPlayerId, setSelectedPlayerId] = useState('')

    const {players, updateBalance} = usePlayers()

    const handleBalanceChange = (type = 'add') => {
        const parsedBalance = parseInt(moneyChange, 10)
        if (!isNaN(parsedBalance)) {
            if (type === 'subtract') {
                updateBalance(selectedPlayerId, players.find(p => p.id === selectedPlayerId).balance - parsedBalance)
            } else {
                updateBalance(selectedPlayerId, players.find(p => p.id === selectedPlayerId).balance + parsedBalance)
            }
        }

        setMoneyChange('')
    }

    return <div className="scoreboard-mini-container">
        {
            players.map((player) => (
                    <div
                        className="scoreboard-mini-player"
                        key={`scb-mini-${player.id}`}
                    >
                        <span className={'scoreboard-mini-name'}>{player.name}</span>

                        <div className="scoreboard-mini-balance-container">
                            <input
                                type="number"
                                step={100}
                                value={selectedPlayerId === player.id ? moneyChange : ''}
                                onFocus={() => setSelectedPlayerId(player.id)}
                                onChange={(e) => setMoneyChange(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleBalanceChange()}
                                autoFocus
                            />
                            <button
                                className={'scoreboard-mini-btn add-money-btn'}
                                onClick={() => handleBalanceChange()}
                            >
                                +
                            </button>
                            <button
                                className={'scoreboard-mini-btn subtract-money-btn'}
                                onClick={() => handleBalanceChange('subtract')}
                            >
                                -
                            </button>
                        </div>
                    </div>
                )
            )
        }
    </div>
}

export default ScoreboardMini
