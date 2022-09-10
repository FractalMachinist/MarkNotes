// Tools to query the Aggregate route
import react from "react";
import {ParseMDBody} from "../Model/parser.js"

export default async function RequestAggregate(HeaderStack){
    console.log("RequestAggregate w/ HS", HeaderStack)
    const url_str = "http://"+window.location.hostname + ":30110" +"/aggregate"
    console.log(url_str)
    var url = new URL(url_str);
    var params = [...HeaderStack].reverse().map(h => ["headers", h])

    url.search = new URLSearchParams(params).toString()

    const response = await fetch(url, {
        method: "GET",
        "headers": {
            "Accept":"application/json"
        }
    }).then(r => r.json())
    console.log({response:response, URL:url})
    return response
}
