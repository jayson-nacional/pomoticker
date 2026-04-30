import Pomoticker from "./Pomoticker"

const TODOS = [
	{
		id: 1,
		name: "Sample task",
		duration: 25,
		breakDuration: 5
	}
];

function App() {
	return (
		<>
			<Pomoticker />
		</>
	)
}

export default App
