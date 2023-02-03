//Initial Version of this will be pretty well copied word for word from
//the following Medium article, but integrated into the already
//existing file structure of my "MTG App"
//Which by this point is begining to evolve past the original
//constraints of the project, so will likely evolve into another
//app alltogether soon

const { Configuration, OpenAIApi } = require("openai");
const {chat_token} = require('../config.json')
const inquirer = require("inquirer");
const configuration = new Configuration({
  apiKey: chat_token,
});
const openai = new OpenAIApi(configuration);

class ChatPrompt {
    constructor(idk, cprompt, prob_something_else) {
        this.idk =idk;
        this.cprompt = cprompt;
        this.prob_something_else = prob_something_else
    }
}
    
const GPTquestion = [

    {
        type: "input",
        name: "card_name",
        message: "What is your question for GPT",
    }
]

const questionFunc = () => {
    return inquirer.prompt(GPTquestion);
}


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
}



function question() {
    console.log("Try this");
    questionFunc()
    .then(answers => response(answers.card_name))
    .catch((err) => console.error(err))
}

question()



