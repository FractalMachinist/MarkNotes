import "./SingleR.css"
import styles from "./SingleR.module.css"
import HeaderStack from "./HeaderStack"

export default function SingleR({headers, date, MDText, children, snipHeaderDepth=0}){
    return <div className={styles.SingleRRoot}>
            <HeaderStack headers={headers.slice(snipHeaderDepth, headers.length - 1)}/>
            <i>{date}</i>
            <p style={{"whiteSpace": "pre-wrap"}}>{MDText}</p>
        </div>
}