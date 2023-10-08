import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  const name = conn.getName(m.sender);
  if (!text) {
    throw `مرحبا *${name}*, هل تريد التحذث مع البوت ? \n\n📌 اكتب هكذا: \n*${usedPrefix + command}* Hi bot`;
  }
  
  
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `text=${encodeURIComponent(text)}&lc=en&key=`
  };

  const res = await fetch('https://api.simsimi.vn/v1/simtalk', options);
  const json = await res.json();
  
  if (json.status === '200') {
    const reply = json.message;
    m.reply(reply);
  } else {
    throw json;
  }
};

handler.help = ['bot'];
handler.tags = ['fun'];
handler.command = ['bot','simsim'];

export default handler;
