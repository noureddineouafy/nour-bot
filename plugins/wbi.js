import fetch from "node-fetch"
import cheerio from "cheerio"
import { Translate } from "@google-cloud/translate"; // Import the Google Translate library

// Initialize the Google Translate client
const translate = new Translate();

let handler = async (m, {
    command,
    usedPrefix,
    conn,
    text,
    args
}) => {
  await m.reply(wait);
  try {
    const result = await WaBetaInfo();
    const currentDate = result.updated;
    const output = [
      `*[ NEW UPDAtED ]*\n\n`,
      `*Update:*\n${result.updated}\n`,
      `*Desc:*\n${result.content}\n`,
      `*Link:*\n${result.postedOnLink}\n\n`
    ];

    for (let index = 0; index < result.faq.length; index++) {
      // Translate the question and answer to Arabic
      const translatedItem = await translateFAQItem(result.faq[index], "ar");
      output.push(`${index + 1}. ${translatedItem.question}\n${translatedItem.answer}\n`);
    }

    let captions = output.join('\n');
    let images = result.ogImage;
    await conn.sendFile(m.chat, images, '', captions, m);
  } catch (e) {
    console.log(e);
  }
}

handler.help = ["wbi"]
handler.tags = ["info"]
handler.command = /^(wbi)$/i
export default handler

// Function to translate FAQ item using Google Translate
async function translateFAQItem(item, targetLanguage) {
  try {
    const translatedQuestion = await translateText(item.question, targetLanguage);
    const translatedAnswer = await translateText(item.answer, targetLanguage);
    return { question: translatedQuestion, answer: translatedAnswer };
  } catch (error) {
    console.error('Translation Error:', error);
    return item; // Return the original item if translation fails
  }
}

// Function to translate text using Google Translate
async function translateText(text, targetLanguage) {
  try {
    const [translation] = await translate.translate(text, targetLanguage);
    return translation;
  } catch (error) {
    console.error('Translation Error:', error);
    return text; // Return the original text if translation fails
  }
}

async function WaBetaInfo() {
  // ... (rest of your code remains the same)
}
