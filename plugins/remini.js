import fetch from "node-fetch"
import uploadImage from "../lib/uploadImage.js"
const {
    NeoxrApi
} = await (await import("../lib/neoxr.js"))
import fs from "fs"

let handler = async (m, {
    conn
}) => {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ""
    if (/image/g.test(mime) && !/webp/g.test(mime)) {
        await m.reply(wait)
        try {
            let img = await q.download?.()
            let out = await uploadImage(img)
            let neo = new NeoxrApi("kyaOnechan")
            let response = await neo.remini(out)
            if (response.status && response.data) {
                const imageBuffer = base64ToBuffer(response.data.image);

                if (response.data.url) {
                    await conn.sendFile(m.chat, response.data.url || imageBuffer, "", "*[ REMINI URL ]*\n" + (response.data.url ? response.data.url : "instagram.com/noureddine_ouafy"), m)
                }

                if (response.data.image) {
                    await conn.sendFile(m.chat, imageBuffer || imageBuffer, "", "*[ REMINI IMAGE]*\n" + (response.data.url ? response.data.url : "instagram.com/noureddine_ouafy"), m)
                }
            } else throw "استجابة الصورة غير صالحة"

        } catch (e) {
            await m.reply(eror)
        }
    } else throw "اذا كانت لديك صورة قديمة وتريد ان تحسن من جودتها وتجعلها وكأنها صورت في هذا العصر ولو قليلا ههه\nقم بالاشارة للصورة التي تريد ثم اكتب\n*.remini*"
}
handler.help = ["remini"]
handler.tags = ["tools"]
handler.command = ["remini"]
export default handler

function base64ToBuffer(base64Image) {
    const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");
    return Buffer.from(base64Data, "base64");
}
