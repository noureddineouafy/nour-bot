import fetch from "node-fetch"
import cheerio from "cheerio"
import {
    generateWAMessageFromContent
} from "@adiwajshing/baileys"

let handler = async (m, {
    command,
    usedPrefix,
    conn,
    text,
    args
}) => {
    await m.reply(wait)

    try {
        const result = await getArticleContent()
        let faq = formatQA(result.detail.featureName)
        let reac = formatRE(result.detail.reactions)
        const output = `*${result.articles.title || 'Tidak diketahui'}*

*Update:*\n${result.articles.date || 'Tidak diketahui'}

*Desc:*\n${result.articles.content || 'Tidak diketahui'}

*Faq:*\n${faq || 'Tidak diketahui'}

*Link:*\n${result.articles.link || 'Tidak diketahui'}

*Content:*\n${result.detail.content || 'Tidak diketahui'}

*Image:*\n${result.detail.roundedAlertsImage || 'Tidak diketahui'}

*Sharing:*\n${result.detail.socialSharing || 'Tidak diketahui'}

*Reactions:*\n${reac || 'Tidak diketahui'}\n`


        let caption = output
        let icon = await (await conn.getFile(result.detail.ogImage)).data
        let msg = await generateWAMessageFromContent(m.chat, {
            extendedTextMessage: {
                text: caption,
                jpegThumbnail: icon,
                contextInfo: {
                    mentionedJid: [m.sender],
                    externalAdReply: {
                        body: result.detail.author,
                        containsAutoReply: true,
                        mediaType: 1,
                        mediaUrl: result.articles.link,
                        renderLargerThumbnail: true,
                        showAdAttribution: false,
                        sourceId: null,
                        sourceType: null,
                        previewType: null,
                        sourceUrl: result.articles.link,
                        thumbnail: icon,
                        thumbnailUrl: icon,
                        title: result.detail.title
                    }
                }
            }
        }, {
            quoted: m
        })
        await conn.relayMessage(m.chat, msg.message, {})

    } catch (e) {
        await m.reply(eror)
    }
}
handler.help = ["wbi"]
handler.tags = ["info"]
handler.command = /^(whabetainfo)$/i
export default handler

function formatQA(data) {
    return data.map((item, index) => `${index + 1}. ${item.name}\n${item.value}\n\n`).join('');
}

function formatRE(data) {
    return data.map((item, index) => `${item.name}: ${item.value}\n`).join('');
}

function capitalizeFirstLetter(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

async function getArticleContent() {
    const url = 'https://wabetainfo.com';

    try {
        const response = await fetch(url);
        const html = await response.text();
        const $ = cheerio.load(html);

        const articles = $('#primary #main article').map((index, element) => {
            const $article = $(element);
            return {
                date: $article.find('time.entry-date.published').text(),
                link: $article.find('h3.entry-title a').attr('href'),
                title: $article.find('h3.entry-title a').text(),
                content: $article.find('div.entry-content').text().trim(),
                moreLink: $article.find('div.entry-content a.more-link').attr('href')
            };
        }).get();

        const moreLink = articles[1].moreLink;
        const detail = await getArticleDetail(moreLink.split('#')[0]);

        return {
            articles: articles[1],
            detail: detail
        };
    } catch (error) {
        console.log(error);
    }
}

async function getArticleDetail(url) {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);

    const reactionKeys = ['like', 'love', 'senang', 'kaget', 'sedih', 'bingung'];
const formattedReactions = reactionKeys.map((key, index) => ({
  name: capitalizeFirstLetter(key),
  value: $('div.wpra-reaction').eq(index).find('.count-num').text().trim()
}));
    const featureName = [];
    $('table.styled-table tr:not(:first-child)').each((index, element) => {
        const name = $(element).find('td:nth-child(1)').text();
        const value = $(element).find('td:nth-child(2)').text();
        if (name && value) {
            featureName.push({
                name: name,
                value: value
            });
        }
    });

    const ogImageUrl = $('meta[property="og:image"]').attr('content');

    return {
        date: $('time.entry-date.published').text(),
        author: $('a.url.fn.n').text(),
        title: $('h1.entry-title').text(),
        content: $('div.entry-content > p').text(),
        socialSharing: $('a.share-icon > span').toArray().map(element => $(element).text()),
        featureName: featureName,
        roundedAlertsImage: $('p > img[alt=""]').attr('src'),
        reactions: formattedReactions,
        ogImage: ogImageUrl
    };
}
