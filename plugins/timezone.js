import moment from 'moment-timezone';

const handler = async (m, { conn }) => {
  const fechariy = moment().tz('Asia/Riyadh').format('DD/MM HH:mm');
  const fechacai = moment().tz('Africa/Cairo').format('DD/MM HH:mm');
  const fechabgd = moment().tz('Asia/Baghdad').format('DD/MM HH:mm');
  const fechabei = moment().tz('Asia/Beirut').format('DD/MM HH:mm');
  const fechakwt = moment().tz('Asia/Kuwait').format('DD/MM HH:mm');
  const fechasyr = moment().tz('Asia/Damascus').format('DD/MM HH:mm');
  const fechadoh = moment().tz('Asia/Doha').format('DD/MM HH:mm');
  const fechalby = moment().tz('Africa/Tripoli').format('DD/MM HH:mm');
  const fechayem = moment().tz('Asia/Dubai').format('DD/MM HH:mm');
  const fechamus = moment().tz('Asia/Muscat').format('DD/MM HH:mm');
  
  const fechalagos = moment().tz('Africa/Lagos').format('DD/MM HH:mm');
  const fecaccra = moment().tz('Africa/Accra').format('DD/MM HH:mm');
  const feccasablanca = moment().tz('Africa/Casablanca').format('DD/MM HH:mm');
  const fecalgiers = moment().tz('Africa/Algiers').format('DD/MM HH:mm');
  const fecakinshasa = moment().tz('Africa/Kinshasa').format('DD/MM HH:mm');
  const fecajohannesburg = moment().tz('Africa/Johannesburg').format('DD/MM HH:mm');
  const fecanairobi = moment().tz('Africa/Nairobi').format('DD/MM HH:mm');
  const fecakhartoum = moment().tz('Africa/Khartoum').format('DD/MM HH:mm');
  const fecalibreville = moment().tz('Africa/Libreville').format('DD/MM HH:mm');
  
  await conn.sendMessage(m.chat, {
    text: `\`\`\`
هذه الميزة من طرف احد المتابعين شكرا له ♥\n\n「*التوقيت حاليا في بعض البلدان العربية*⏰ 」\n

Arab Countries:

🕒 Riyadh       : ${fechariy}
🕒 Cairo        : ${fechacai}
🕒 Baghdad      : ${fechabgd}
🕒 Beirut       : ${fechabei}
🕒 Kuwait       : ${fechakwt}
🕒 Damascus     : ${fechasyr}
🕒 Doha         : ${fechadoh}
🕒 Tripoli      : ${fechalby}
🕒 Dubai        : ${fechayem}
🕒 Muscat       : ${fechamus}

African Countries:

🕒 Lagos        : ${fechalagos}
🕒 Accra        : ${fecaccra}
🕒 Casablanca   : ${feccasablanca}
🕒 Algiers      : ${fecalgiers}
🕒 Kinshasa     : ${fecakinshasa}
🕒 Johannesburg : ${fecajohannesburg}
🕒 Nairobi      : ${fecanairobi}
🕒 Khartoum     : ${fecakhartoum}
🕒 Libreville   : ${fecalibreville}
\`\`\`
${String.fromCharCode(8206).repeat(850)}
Current Server Time Zone:
[ ${Intl.DateTimeFormat().resolvedOptions().timeZone} ]
${moment().tz(Intl.DateTimeFormat().resolvedOptions().timeZone).format('DD/MM/YY HH:mm:ss')}`,
  }, { quoted: m });
};

handler.help = ['horario'];
handler.tags = ['info'];
handler.command = /^(timezone)$/i;

export default handler;
