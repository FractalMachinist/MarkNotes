import express from 'express'
var router = express.Router();

import * as fs from 'fs';

import { MDBlob } from "./MDBlob.js"


export async function UploadMDSection(TerminalBody, date, HeaderStack = [], ChildIDs = []){
    // Upload a header and it's body
    // Return the ID assigned to it

    // console.log("---------- Uploading:", HeaderStack, TerminalBody)

    const NewBlob = new MDBlob({
        headers: HeaderStack.slice().reverse(),
        date: date,
        MDText: TerminalBody,
        children:ChildIDs
    })

    NewBlob.save()
    return NewBlob.id
}




// It's possible that there are sub-headers, but they're more than one layer below. See this example MDSection:
/*
# Hello
### This is a sub-header
### This needs to be promoted to a 2-depth header
*/
const RegexAnyHeadings = /^#/m
const RegexFlushHeadings = /^# /m
const RegexRootOfHeaders = /^#/gm

function RaiseBuriedHeaders(Body){
    while(RegexAnyHeadings.test(Body) && !RegexFlushHeadings.test(Body)){ // Until one heading is at level 1 (one #)
        Body = Body.replaceAll(RegexRootOfHeaders, "") // Promote lower-level headings to a higher leve,
    }
    return Body
}

async function ParseMDSectionAndUpload(MDSection, date, HeaderStack = []){
    // MDSection is a multiline string starting with a header line with it's header stripped,
    // potentially followed by some body.

    // Find the end of the header
    const EndOfHeader = MDSection.indexOf("\n")

    // If the header doesn't end, there must be no Body, so it's a dud
    if(EndOfHeader === -1){return null}

    const Header = MDSection.slice(0, EndOfHeader).trim();
    const Body = RaiseBuriedHeaders(MDSection.slice(EndOfHeader)).trim() // If after trimming, the body has no length, I don't care about it

    if(Body.length === 0){return null}

    const NewHeaderStack = [...HeaderStack, Header]
    return ParseMDBodyAndUpload(Body, date, NewHeaderStack)


}

async function ParseMDBodyAndUpload(MDBody, date, HeaderStack = []){
    // MDBody is expected to have 0 or more root headers
    // Split them up and handle each one individually with ParseMDHeaderAndUpload

    const [TerminalBody, ...Subsections] = MDBody.split(/(?:^|\n+)# /)

    return Promise.all(
            Subsections.map(Section => ParseMDSectionAndUpload(Section, date, HeaderStack))
        ).then(ChildIDs => ((ChildIDs.some(id => id !== null) || ChildIDs.length === 0) && HeaderStack.length !== 0) ? UploadMDSection(TerminalBody, date, HeaderStack, ChildIDs.filter(id => id !== null)) : null)
}

const InsecureStrHash = (str) => {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
        var char = str.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}

router.post("/", async (req, res) => {
    console.log("Record Post Body:", req.body)
    var date = new Date(Date.parse(req.body.date))

    if(isNaN(date)){
        date = new Date()
    }

    const text = req.body.MDText


    console.log(process.cwd());
    
    fs.writeFile(`/app/tmp_Entries/${date.toISOString()}%${InsecureStrHash(text)}.md`, text, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    }); 
    // console.log("Parsing", text)
    ParseMDBodyAndUpload(text, date)
    res.end();
})

router.get("/", async (req, res) => {
    console.log("Find by ID:", req.query.id)
    MDBlob.findById(req.query.id).then(res.json.bind(res))
})


export default router