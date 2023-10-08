import axios from 'axios';

const API_TOKEN = "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";

export async function getStatusModels(query) {
  const full_url = 'https://huggingface.co/api/models?search=' + query;
  try {
    const response = await axios.get(full_url);
    return response.data;
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

export async function HuggingFace(MODEL, INPUT) {
    const API_URL = `https://api-inference.huggingface.co/models/${MODEL}`;
    try {
        const response = await axios.post(
            API_URL,
            { inputs: INPUT, options: { wait_for_model: true }},
            { headers: { Authorization: `Bearer ${API_TOKEN}` } },
        );

        const data = response.data;
        return data;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }

    return false;
}

export async function HuggingFaceBuffer(MODEL, INPUT) {
    const API_URL = `https://api-inference.huggingface.co/models/${MODEL}`;

    try {
        const response = await axios.post(API_URL, {
            inputs: INPUT,
            options: {
                wait_for_model: true
            }
        }, {
            headers: {
                'Authorization': `Bearer ${API_TOKEN}`,
                'Content-Type': 'application/json',
            },
            responseType: 'arraybuffer'
        });

        const buffer = Buffer.from(response.data, 'binary');
        return buffer;
    } catch (error) {
        console.error(error);
        return null;
    }
}
