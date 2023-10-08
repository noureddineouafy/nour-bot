import cheerio from 'cheerio';
import fetch from 'node-fetch';

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    text,
    command
}) => {

    let lister = [
        "s",
        "eps",
        "dl"
    ]

    let [feature, inputs, inputs_, inputs__, inputs___] = text.split("+")
    if (!lister.includes(feature)) return m.reply("تحميل حلقات الأنمي من موقع\nhttps://e.gateanime.com \nشاهد هذا الفيديو لتعرف كيف يمكنك تحميل الانمي على شكل فيديو ♥ \n\n" + lister.map((v, index) => " ○ " + v).join("\n"))

    if (lister.includes(feature)) {

        if (feature == "s") {
            if (!inputs) return m.reply("\nExemple: .gateanime search+ناروتو")
            await m.reply(wait)
            try {
                let res = await scrapeWebsite(inputs)
                let teks = res.map((item, index) => {
                    return `🔍 *[ RESULT ${index + 1} ]*

📢 *title:* ${item.title}
🌐 *link:* ${item.link}
📋 *description:* ${item.description}
`

                }).filter(v => v).join("\n\n________________________\n\n")
                await m.reply(teks)
            } catch (e) {
                await m.reply(eror)
            }
        }
        
        if (feature == "dl") {
            if (!inputs) return m.reply("*.dl+(lien de telecharegement)")
            await m.reply(wait)
            try {
                let res = await scrapeDataDl(inputs)
                let teks = res.map((item, index) => {
                    return `🔍 *[ RESULT ${index + 1} ]*

📢 *title:* ${item.title}
🌐 *link:* ${item.link}
`

                }).filter(v => v).join("\n\n________________________\n\n")
                await m.reply(teks)
            } catch (e) {
                await m.reply(eror)
            }
        }

        if (feature == "eps") {
            if (!inputs) return m.reply("exemple : *.eps+(lien de serie)")
            await m.reply(wait)
            try {
                let res = await scrapeDataEpisode(inputs)
                let teks = res.map((item, index) => {
                    return `🔍 *[ RESULT ${index + 1} ]*

📢 *title:* ${item.title}
🌐 *link:* ${item.link}
📋 *episodeNumber:* ${item.episodeNumber}
`
                }).filter(v => v).join("\n\n________________________\n\n")
                await m.reply(teks)
            } catch (e) {
                await m.reply(eror)
            }
        }
    }
}
handler.help = ["spf"]
handler.tags = ["internet"]
handler.command = /^(gateanime)$/i
handler.owner = true
export default handler

/* New Line */
async function scrapeWebsite(s) {
  try {
    const url = 'https://e.gateanime.com/?s=' + s; // Gantilah dengan URL yang sesuai
    const response = await fetch(url);
    const $ = cheerio.load(await response.text());

    const scrapedData = [];

    $('.TPostMv article').each((index, element) => {
      const title = $(element).find('h3.Title').text().trim();
      const link = $(element).find('a').attr('href');
      const description = $(element).find('.Description p').text().trim();

      scrapedData.push({ title, link: decodeURIComponent(link), description });
    });

    return scrapedData;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}

async function scrapeDataEpisode(url) {
  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);

const episodes = [];

$('.MvTbTtl').each((index, element) => {
  const titleElement = $(element).find('a');
  const title = titleElement.text().trim();
  const link = titleElement.attr('href');
  const year = $(element).find('span').text().trim();
  const playLink = $(element).closest('tr').find('.AAIco-play_circle_outline').attr('href');
  const episodeNumber = $(element).closest('tr').find('.Num').text().trim();
  episodes.push({ title, link: decodeURIComponent(link), year, playLink: decodeURIComponent(playLink), episodeNumber });
});
    return episodes;
  } catch (error) {
    throw error;
  }
}

async function scrapeDataDl(url) {
  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);

    const titlesAndLinks = await Promise.all(
      $('.TPTblCn tbody tr').map(async (index, element) => {
        const title = $(element).find('td:eq(1) span').text(); // Ambil teks dari elemen span
        const link = $(element).find('td:eq(1) a').attr('href');
        const redirectUrl = await fetchRedirectUrl(link);
        return { title, link: redirectUrl };
      }).get()
    );

    return titlesAndLinks;
  } catch (error) {
    console.error('Terjadi kesalahan saat scraping data:', error);
    return []; // Mengembalikan array kosong jika terjadi kesalahan
  }
}

async function fetchRedirectUrl(url) {
  try {
    const response = await fetch(url, { method: 'GET', redirect: 'manual' });
    if (response.status === 302) {
      const redirectUrl = response.headers.get('Location');
      return redirectUrl; // Mengembalikan URL redirect
    }
    return url; // Jika tidak ada redirect, kembalikan URL asli
  } catch (error) {
    console.error('Terjadi kesalahan saat mengambil redirect URL:', error);
    throw error;
  }
}
