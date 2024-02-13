

import { Configuration, OpenAIApi } from "openai";



const configuration = new Configuration({
  
  apiKey: "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",
});

const openai = new OpenAIApi(configuration);

export default async function sendMsgtoOpenAI(message) {
openai
  .createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: message }],
  })
  .then((res) => {
    console.log(res.data.choices[0].message.content);
    console.log(typeof res.data.choices[0].message.content);
    return res.data.choices[0].message.content
  })
  .catch((e) => {
    console.log(e);
  });
}
