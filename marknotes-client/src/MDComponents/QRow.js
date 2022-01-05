import { useEffect, useMemo, useState } from "react/cjs/react.development";
import RequestAggregate from "../Model/aggregate.js"
import SingleR from "./SingleR.js"
import HeaderStack from "./HeaderStack.js";

import styles from "./QRow.module.css"

export default function QRow({headers}){
    const [Rs, setRs] = useState([]);

    useEffect(() => {
        console.log("Rebuilt QRow:", {"headers":headers})
        async function GrabNewRs(){
            setRs(await RequestAggregate(headers))
        }
        GrabNewRs()
    }, [headers.join("#")])


    console.log("Rs:", Rs)

    return <div className={styles.QRow}>
        <HeaderStack headers={headers} className={styles.RowHeader}/>
        <div className={styles.QScroll}>
            {Rs.map(R => <SingleR key={R._id} snipHeaderDepth={headers.length} {...R}/>)}
        </div>
        
    </div>
}