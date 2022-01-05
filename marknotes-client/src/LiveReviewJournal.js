import UnstructuredQ from "./MDComponents/UnstructuredQ.js"
import styles from "./App.module.css"
import Editor from './Editor.js';

export default function LiveReviewJournal({text, setText, Submit}){
    return <div className={styles.EV}>
        <div className={styles.Editor}>
            <Editor value={text} setValue={setText}/>
            <button onClick={(e)=>{
                if(window.confirm("SUBMIT!?")){
                    Submit(text).then(console.log).then(()=>{setText("")});
                }
            }} style={{width:"min-content"}}>Submit</button>
        </div>
        
        <UnstructuredQ body={text}/> 
    </div>
}
