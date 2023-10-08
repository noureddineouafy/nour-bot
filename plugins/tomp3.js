import { toAudio } from '../lib/converter.js' 
let handler = async (m, { conn, usedPrefix, command }) => {
let q = m.quoted ? m.quoted : m
let mime = (m.quoted ? m.quoted : m.msg).mimetype || ''
if (!/video|audio/.test(mime)) throw `قم بالرد على الفيديو الذي تريد ان تحوله لـــ  𝑴𝑷3`
let media = await q.download?.()
if (!media && !/video/.test(mime)) throw `لم أتمكن من تنزيل الفيديو حاول مرة أخرى`
if (!media && !/audio/.test(mime)) throw `لم أتمكن من تنزيل الاوديو حاول مرة أخرى`
let audio = await toAudio(media, 'mp4')
if (!audio.data && !/audio/.test(mime)) throw `لا يمكن تحويل هذا الملف الى mp3 .`
if (!audio.data && !/video/.test(mime)) throw `لا يمكن تحويل هذا الفيديو ل mp3 وقع خذأ راسل صاحب البوت \ninstagram.com/noureddine_ouafy`
conn.sendFile(m.chat, audio.data, 'error.mp3', '', m, null, { mimetype: 'audio/mp4' })
}
handler.help = ['tomp3 (reply)']
handler.tags = ['audio']
handler.command = ['tomp3', 'toaudio', 'mp3']
export default handler
