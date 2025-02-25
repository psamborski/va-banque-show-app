import React, { useState } from 'react'

import { usePlayers } from '../../context/PlayersContext'

import './ScoreboardMini.css'

const ScoreboardMini = () => {
  const [moneyChange, setMoneyChange] = useState('')
  const [selectedPlayerId, setSelectedPlayerId] = useState('')

  const { players, updateBalance } = usePlayers()

  const handleBalanceChange = (type = 'add') => {
    const parsedBalance = parseInt(moneyChange, 10)
    if (!isNaN(parsedBalance)) {
      if (type === 'subtract') {
        updateBalance(selectedPlayerId, players.find((p) => p.id === selectedPlayerId).balance - parsedBalance)
      } else {
        updateBalance(selectedPlayerId, players.find((p) => p.id === selectedPlayerId).balance + parsedBalance)
      }
    }

    setMoneyChange('')
  }

  return (
    <div className="scoreboard-mini">
      {
        players.map((player) => (
          <div
            className="scoreboard-mini__player"
            key={`scb-mini-${player.id}`}
          >
            <span className="scoreboard-mini__name">{player.name}</span>

            <div className="scoreboard-mini__balance">
              <input
                className="scoreboard-mini__input"
                type="number"
                step={100}
                value={selectedPlayerId === player.id ? moneyChange : ''}
                onFocus={() => setSelectedPlayerId(player.id)}
                onChange={(e) => setMoneyChange(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleBalanceChange()}
                autoFocus
              />
              <button
                className="button scoreboard-mini__button scoreboard-mini__button--add-money"
                onClick={() => handleBalanceChange()}
              >
                +
              </button>
              <button
                className="button scoreboard-mini__button scoreboard-mini__button--subtract-money"
                onClick={() => handleBalanceChange('subtract')}
              >
                -
              </button>
            </div>
            <span />
          </div>
        ),
        )
      }
    </div>
  )
}

export default ScoreboardMini
