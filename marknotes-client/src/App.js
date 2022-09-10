import {useEffect, useState} from "react"
import {Route, Routes} from "react-router-dom"
import LiveReviewJournal from "./LiveReviewJournal";
import Submit from "./Model/submit.js"

import styles from "./App.module.css"
import EditingWrapper from "./EditingWrapper";
import AllHeadings from "./AllHeadings";

function App() {

	return (
		<Routes>
			<Route path="/" element={<EditingWrapper />}/>
			<Route path="/all" element={<AllHeadings />} />
			<Route path="/:template" element={<EditingWrapper />} />
		</Routes>
	);
}

export default App;
