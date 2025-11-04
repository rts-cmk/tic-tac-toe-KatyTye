import TicTacToe from "./components/TicTacToe"
import "./styles/main.sass"

function App() {

	return (
		<>
			<TicTacToe />
			<TicTacToe type="infinite" />
		</>
	)
}

export default App
