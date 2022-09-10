import {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import RequestTemplate from "./Model/templates";
import LiveReviewJournal from "./LiveReviewJournal";
import Submit from "./Model/submit.js"

function EditingWrapper() {
	const [text, setText] = useState(0);
	var params = useParams();
	var template = params.template;

	useEffect(() => {
		if (typeof(template) !== 'undefined')
			RequestTemplate(template).then(setText);
	}, [])

	return (
		<LiveReviewJournal text={text} setText={setText} Submit={Submit}/>
	);
}

export default EditingWrapper;
