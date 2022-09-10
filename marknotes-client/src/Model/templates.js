import react from "react";

export default async function RequestTemplate(templateName){
    const url_str = "http://"+window.location.hostname + ":30110" +"/t/"+templateName;
    var url = new URL(url_str);

    const response = await fetch(url, {
        method: "GET"
    })

    if (response.status === 200) {
        return response.text()
    } else {
        return "# Template Not Found";
    }
}