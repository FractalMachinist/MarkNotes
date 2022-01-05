import "./SingleR.css"
import styles from "./SingleR.module.css"
import HeaderStack from "./HeaderStack"
import Editor from "../Editor"
import ReactMarkdown from "react-markdown"


export default function SingleR({headers, date, MDText, snipHeaderDepth=0}){
    return <div className={styles.SingleRRoot}>
            <HeaderStack headers={headers.slice(snipHeaderDepth, headers.length - 1)}/>
            <i>{date}</i>
            {/* <ReactMarkdown children={MDText}/> */}
            {/* <Editor value={MDText} setValue={()=>{}} readOnly={"nocursor"}/> */}
            <p style={{"whiteSpace": "pre-wrap"}}>{MDText}</p>
        </div>
}