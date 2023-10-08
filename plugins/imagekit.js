import fetch from 'node-fetch'

let handler = async(m, { conn, usedPrefix, text, args, command }) => {
let urut = text.split`|`
  let thm = urut[0]
  let text1 = urut[1]
  let text2 = urut[2]
if (!text) throw `هذا الامر خاص بعمل طرولات للضحك فقط يجب ان تختار كلمة من اللائحة الموجودة اسفله ثم تكتب على سبيل التجربة\n\n*.imagekit kucing|malk katchof*\n\n

*اختر احد هذه الكلمات ثم اكتبها بعد الامر الخاص بالطرولات:*
• kucing
• senyum
• monyet
• runtime
• run 1-5
• bor 1-5
`
let res = `https://ik.imagekit.io/aygemuy/tr:ot-${text1},ots-400,otc-ffff00,or-50/${thm}.jpg`
await conn.sendFile(m.chat, res, '', `instagram.com/noureddine_ouafy\n *${command}*`, m)

}
handler.command = /^(imagekit)$/i

export default handler
