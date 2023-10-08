let handler = async (m, { conn, usedPrefix, command }) => {
		
			await conn.sendMessage(m.chat, { video: { url: dir[Math.floor(Math.random() * dir.length)] }, caption: `_تابع صاحب البوت في الانستغرام_\ninstagram.com/noureddine_ouafy` }, { quoted: m })
	}

handler.help = ['storyanime']
handler.tags = ['anime']
handler.command = /^(islamvideo)$/i
handler.limit = false

export default handler

const dir = [
'https://telegra.ph/file/224b864a473f41b0e4bb7.mp4',
'https://telegra.ph/file/8793cd04edbceb56cda62.mp4',
'https://telegra.ph/file/d1c5ac160a94f98b73e26.mp4',
'https://telegra.ph/file/78482f6a32fad9bf07f18.mp4',
'https://telegra.ph/file/899ff1f4a9b166d4a5edd.mp4',
'https://telegra.ph/file/e4b0a06103e45c3c22244.mp4',
'https://telegra.ph/file/ae7b9be1a0d2d60ef314a.mp4',
'https://telegra.ph/file/de97e7ef8298c80017d7d.mp4',
'https://telegra.ph/file/f03175dd92bded2397926.mp4',
'https://telegra.ph/file/5f9ecc0a1eab1c48f060a.mp4',
'https://telegra.ph/file/36d6a1d864ea636e0db00.mp4',
'https://telegra.ph/file/92073e267fa7902311267.mp4',
'https://telegra.ph/file/88d4a75286bf475a6d30f.mp4',
'https://telegra.ph/file/97fd432c912918cd5a97d.mp4',
'https://telegra.ph/file/2349ad563acd17adc01fd.mp4',

]
