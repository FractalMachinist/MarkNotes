import {useState} from "react"
import TextareaAutosize from 'react-textarea-autosize';
import UnstructuredQ from "./MDComponents/UnstructuredQ.js"
import Submit from "./Model/submit.js"

import styles from "./App.module.css"

function App() {
	const [text, setText] = useState("")


	return (
		<div className={styles.App}>

			<h1>Notes:</h1>
			<div className={styles.EV}>
				<div className={styles.Editor}>
					<TextareaAutosize value={text} onChange={(e)=>{setText(e.target.value)}}/>
					<button onClick={(e)=>{
						if(window.confirm("SUBMIT!?")){
							Submit(text).then(console.log).then(()=>{setText("")});
						}
					}} style={{width:"min-content"}}>Submit</button>
				</div>
				
				<UnstructuredQ body={text}/> 
			</div>
			
		</div>
	);
}

export default App;
