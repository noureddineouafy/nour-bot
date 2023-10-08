// imageGenerator.js

import axios from 'axios';

export async function getStatusModels() {
  const full_url = 'https://stablehorde.net/api/v2/status/models';
  try {
    const response = await axios.get(full_url);
    return response.data;
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

export async function generateImage(model, prompt) {
  try {
    // Define HTTP headers
    const headers = {
      apikey: '0000000000',
      'Content-Type': 'application/json',
    };

    // Create POST data
    const postData = {
      prompt: prompt,
      params: {
        sampler_name: "k_lms",
        height: 512,
        width: 512,
        karras: true,
        tiling: false,
        hires_fix: false,
        clip_skip: 2,
        image_is_control: false,
        return_control_map: false,
        steps: 30,
        n: 1,
      },
      nsfw: true,
      trusted_workers: false,
      slow_workers: true,
      censor_nsfw: false,
      models: [model],
      r2: true,
      shared: true,
    };

    // Send a POST request to the first REST API endpoint
    const response = await axios.post('https://stablehorde.net/api/v2/generate/async', postData, { headers });
    const id = response.data.id;
    console.log(`Img job id: ${id}`);

    // Poll the second endpoint for "done=true" value
    let done = false;
    while (!done) {
      const pollResponse = await axios.get(`https://stablehorde.net/api/v2/generate/check/${id}`);
      done = pollResponse.data.done;
      console.log(`Polling img job: ${done}`);

      if (done) {
        // Get the base64-encoded image from the third endpoint
        const imageResponse = await axios.get(`https://stablehorde.net/api/v2/generate/status/${id}`);
        const imageUrl = imageResponse.data.generations[0].img;
        console.log(`Received img URL: ${imageUrl}`);
        return imageUrl;
      }

      // Wait 5 seconds before polling again
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}
