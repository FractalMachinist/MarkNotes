import styles from "./HeaderStack.module.css"

export default function HeaderStack({headers, className}){
    return <div className={className}>
        {headers.slice(0).map((h, index) => {
            const HTag = `h${headers.length - index}`
            return <HTag key={h}>{h}</HTag>
        })}
    </div>
}