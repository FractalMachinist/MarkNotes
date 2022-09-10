import {useMemo} from "react"
import { useEffect, useState} from "react/cjs/react.development";
import RequestAllHeaders from "./Model/all";
import QRow from "./MDComponents/QRow"

import styles from "./MDComponents/UnQ.module.css"

export default function AllHeadings(){
    const [allHeaders, setAllHeaders] = useState([]);

    useEffect(() => {
        async function grabAllHeadings(){
            var allH = await RequestAllHeaders()
            var allHA = allH
            console.log(allHA)
            setAllHeaders(allHA)
        }
        grabAllHeadings()
    }, [])
    return <div className={styles.MultiR}>
        {allHeaders.map(Q => <QRow key={Q.join('#')} headers={Q}/>)}
    </div>
}