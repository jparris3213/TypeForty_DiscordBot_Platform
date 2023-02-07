const { Configuration, OpenAIApi } = require("openai");
const wait = require(`node:timers/promises`)
const {chat_token} = require('../config.json');
const configuration = new Configuration({
    apiKey: chat_token,
  });

const openai = new OpenAIApi(configuration);


//Discord.js imports
const { SlashCommandBuilder } = require('discord.js');
const { execute } = require("./scrycard");


//GPT_Prompt Function (basically from chatgpt.js in old commands folder)
async function response(prompt_data) {
    const prompt = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt_data,
        temperature: 0.9,
        max_tokens: 150,
        top_p: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.6,
        stop: [" Human:", " AI:"],
      }).catch(err => console.error(err));
      if(!prompt.data) {
        return console.log("Nope Didn't Work", data, prompt_data);
      }
      console.log(prompt.data.choices[0].text);
      return interaction.editReply(prompt.data.choices[0].text);//
}


//discord.js + chatgpt integration
module.exports = {
    data: new SlashCommandBuilder()
        .setName('gpt_prompt')
        .setDescription('Interacts with OpenAPIs ChatGPT Davinci Model to respond to queries')
        .addStringOption(option => option.setName('promptresponse').setDescription('Ask ChatGPT')),

    async execute(interaction) {
        interaction.deferReply("Placeholder...");

        const gpt_input = interaction.options.getString('promptresponse');  

        const gpt_interact = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: gpt_input,
                temperature: 0.9,
                max_tokens: 150,
                top_p: 1,
                frequency_penalty: 0.0,
                presence_penalty: 0.6,
                stop: [" Human:", " AI:"],
              }).catch(err => console.error(err));
              
                return interaction.followUp(`The User asked the following question:${gpt_input} and recieved the following response from ChatGPT AI: ${gpt_interact.data.choices[0].text}`)
                
              }
            }

        

