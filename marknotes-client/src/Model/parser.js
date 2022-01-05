const RegexAnyHeadings = /^#/m
const RegexFlushHeadings = /^# /m
const RegexRootOfHeaders = /^#/gm

function RaiseBuriedHeaders(Body){
    while(RegexAnyHeadings.test(Body) && !RegexFlushHeadings.test(Body)){ // Until one heading is at level 1 (one #)
        Body = Body.replaceAll(RegexRootOfHeaders, "") // Promote lower-level headings to a higher leve,
    }
    return Body
}

function ParseMDSection(MDSection, HeaderStack = []){
    // MDSection is a multiline string starting with a header line with it's header stripped,
    // potentially followed by some body.

    // Find the end of the header
    const EndOfHeader = MDSection.indexOf("\n")

    if(EndOfHeader === -1){return [{"HeaderStack":[...HeaderStack, MDSection], "Body":""}]}

    const Header = MDSection.slice(0, EndOfHeader).trim();
    const Body = RaiseBuriedHeaders(MDSection.slice(EndOfHeader)).trim() 
    
    if(Body.length === 0){return [{"HeaderStack":[...HeaderStack, Header], "Body":""}]}

    const NewHeaderStack = [...HeaderStack, Header]
    return ParseMDBody(Body, NewHeaderStack)


}

export function ParseMDBody(MDBody, HeaderStack = []){
    // MDBody is expected to have 0 or more root headers
    // Split them up and handle each one individually with ParseMDHeader

    const [TerminalBody, ...Subsections] = MDBody.split(/(?:^|\n+)# /)

    return [{"HeaderStack":HeaderStack, "Body":TerminalBody}, ...Subsections.flatMap(Section => ParseMDSection(Section, HeaderStack))]
}

