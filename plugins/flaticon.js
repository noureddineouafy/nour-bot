import axios from "axios"
import fetch from "node-fetch"
import cheerio from "cheerio"
import {
    JSDOM
} from "jsdom"

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    text,
    command
}) => {
    if (!text) throw "هذا الامر يمكن من خلاله الحصول على ايقونات وملصقات مجانية للتصميم نكتب هكذا \n*.flaticon whatsapp*"
    try {
            await m.reply(wait)
            let res = await FlatIcon(text)
            let rdm = res[Math.floor(Math.random() * res.length)];
            await conn.sendMessage(m.chat, {
                image: {
                    url: rdm
                }
            }, {
                quoted: m
            })

    } catch (e) {
        throw eror
    }
}
handler.help = ["flaticon"]
handler.tags = ["internet"]
handler.command = /^flaticon$/i

export default handler

/* New Line */
async function FlatIcon(query) {
let res = await fetch('https://www.flaticon.com/free-icons/' + query)
    let html = await res.text()
    let dom = new JSDOM(html)
    var collection = dom.window.document.querySelectorAll('.icon--item');
    let img = []
for (var i = 0; i < collection.length; i++) {
	img.push(collection[i].getAttribute('data-png'))
}
let newArr = img.filter(el => el != null);
return newArr
}
