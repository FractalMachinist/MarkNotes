export default async function Submit(body){
    const url_str = "http://"+window.location.hostname + ":30110" +"/record"

    const response = await fetch(url_str, {
        method: "POST",
        "headers": {
            "Accept":"application/json",
            "Content-Type":"application/json"
        },
        "body":JSON.stringify({MDText:body, Date:new Date()})
    })
    return response
}
