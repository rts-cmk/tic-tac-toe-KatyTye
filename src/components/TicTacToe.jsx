import { use, useEffect, useState } from "react"
import GameOver from "./GameOver"
import GameState from "./GameState"
import Board from "./Board"
import Reset from "./Reset"
import clickSound from "../sounds/click.mp3"
import winSound from "../sounds/win.mp3"

const clickAudio = new Audio(clickSound)
clickAudio.volume = 0.5
const winAudio = new Audio(winSound)
winAudio.volume = 0.5

const PLAYER_X = "X"
const PLAYER_O = "O"

const winningCombinations = [
	{ combo: [0, 1, 2], strikeClass: "strike-row-1" },
	{ combo: [3, 4, 5], strikeClass: "strike-row-2" },
	{ combo: [6, 7, 8], strikeClass: "strike-row-3" },

	{ combo: [0, 3, 6], strikeClass: "strike-column-1" },
	{ combo: [1, 4, 7], strikeClass: "strike-column-2" },
	{ combo: [6, 7, 8], strikeClass: "strike-column-3" },

	{ combo: [0, 4, 8], strikeClass: "strike-diagonal-1" },
	{ combo: [2, 4, 6], strikeClass: "strike-diagonal-2" }
]

function checkWinner(tiles, setStrikeClass, setGameState, GameState) {
	for (const { combo, strikeClass } of winningCombinations) {
		const tileValue1 = tiles[combo[0]]
		const tileValue2 = tiles[combo[1]]
		const tileValue3 = tiles[combo[2]]

		if (tileValue1 !== null && tileValue1 == tileValue2 && tileValue1 == tileValue3) {
			setStrikeClass(strikeClass)
			if (tileValue1 === PLAYER_X || tileValue1 === PLAYER_O) {
				setGameState(GameState[`player${tileValue1}Wins`])
				winAudio.play()
				return
			}
		}
	}

	const areAllTilesFilledIn = tiles.every((tile) => tile !== null)
	if (areAllTilesFilledIn) {
		setGameState(GameState.draw)
		winAudio.play()
	}
}

function TicTacToe() {
	const [gameState, setGameState] = useState(GameState.inProgress)
	const [playerTurn, setPlayerTurn] = useState(PLAYER_X)
	const [tiles, setTiles] = useState(Array(9).fill(null))
	const [strikeClass, setStrikeClass] = useState()

	useEffect(() => {
		if (tiles.some((tile) => tile !== null)) {
			clickAudio.play()
		}

		checkWinner(tiles, setStrikeClass, setGameState, GameState)
	}, [tiles])

	function handleTileClick(index) {
		if (tiles[index] !== null || gameState !== GameState.inProgress) {
			return
		}

		const newTiles = [...tiles]
		newTiles[index] = playerTurn
		setTiles(newTiles)

		if (playerTurn === PLAYER_X) {
			setPlayerTurn(PLAYER_O)
		} else {
			setPlayerTurn(PLAYER_X)
		}
	}

	function handleReset() {
		clickAudio.play()
		setGameState(GameState.inProgress)
		setTiles(Array(9).fill(null))
		setPlayerTurn(PLAYER_X)
		setStrikeClass(null)
	}

	return (
		<div>
			<h1>TicTacToe</h1>
			<Board
				playerTurn={playerTurn}
				tiles={tiles}
				onTileClick={handleTileClick}
				strikeClass={strikeClass}
			/>
			<GameOver gameState={gameState} />
			<Reset gameState={gameState} onReset={handleReset} />
		</div>
	)
}

export default TicTacToe