import {useState} from "react"
import LiveReviewJournal from "./LiveReviewJournal";
import Submit from "./Model/submit.js"

import styles from "./App.module.css"

function App() {
	const [text, setText] = useState("")
	return (
		<div className={styles.App}>

			<h1>Notes:</h1>
			<LiveReviewJournal text={text} setText={setText} Submit={Submit}/>
			
		</div>
	);
}

export default App;
