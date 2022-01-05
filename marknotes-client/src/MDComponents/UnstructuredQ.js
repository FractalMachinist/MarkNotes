import {useMemo} from "react"
import { useEffect, useState} from "react/cjs/react.development";
import { ParseMDBody } from "../Model/parser";
import QRow from "./QRow"

import styles from "./UnQ.module.css"

export default function UnstructuredQ({body}){
    console.log("UQ Body:", body)
    const [Qs, setQs] = useState([]);

    useEffect(() => {
        async function grabNewNQs(){

            if(body.length) {
                const NQs = ParseMDBody(body).filter(b => b.Body.length).map(b => b.HeaderStack)
                console.log({"NQ":NQs})
                setQs(NQs)
            }
        }
        grabNewNQs()


        
    }, [body])
    return <div className={styles.MultiR}>
        {Qs.map(Q => <QRow key={Q.join('#')} headers={Q}/>)}
    </div>
}