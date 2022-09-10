// Tools to query the All route
import react from "react";

export default async function RequestAllHeaders(){
    const url_str = "http://"+window.location.hostname + ":30110" +"/all/headers"
    var url = new URL(url_str);
    const response = await fetch(url, {
        method: "GET",
        "headers": {
            "Accept":"application/json"
        }
    }).then(r => r.json())
    console.log({response:response, URL:url})
    return response
}
