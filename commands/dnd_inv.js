const { SlashCommandBuilder} = require('discord.js');
//Google Sheet Integrations
const fs = require('fs').promises;
const path = require('path');
const {authenticate} = require('@google-cloud/local-auth');
const {google} = require('googleapis');

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), '../credentials.json');


async function loadSavedCredentialsIfExist() {
    try {
        const content = await fs.readFile(TOKEN_PATH);
        const credentials = JSON.parse(content);
        return google.auth.fromJSON(credentials);
    } catch (err) {
        return null;
    }
}

/*   Serializes credentials to a file comptible with GoogleAUth.fromJSON.
 
  @param {OAuth2Client} client
  @return {Promise<void>}
 */ 

async function saveCredentials(client) {
    const content = await fs.readFile(CREDENTIALS_PATH);
    const keys = JSON.parse(content);
    const key = keys.installed || keys.web;
    const payload = JSON.stringify({
      type: 'authorized_user',
      client_id: key.client_id,
      client_secret: key.client_secret,
      refresh_token: client.credentials.refresh_token,
    });
    await fs.writeFile(TOKEN_PATH, payload);
  }
  
  /**
   * Load or request or authorization to call APIs.
   *
   */
  async function authorize() {
    let client = await loadSavedCredentialsIfExist();
    if (client) {
      return client;
    }
    client = await authenticate({
      scopes: SCOPES,
      keyfilePath: CREDENTIALS_PATH,
    });
    if (client.credentials) {
      await saveCredentials(client);
    }
    return client;
  }
  

async function listInv(auth) {
    const sheets = google.sheets({version: 'v4', auth});
    const res = await sheets.spreadsheets.values.get({
        spreadsheetId: '1ZtIVDBi09fBSGVyeni3uBiiVzXZTQdvaxOeX1h7H3ic',
        range: '2ndEdInv!A2:D',
    });
    const rows = res.data.values;
    if (!rows || rows.length === 0) {
        console.log('No data found');
        return;
    }

    console.log('Qty, Item:');
    rows.forEach((row) => {
        // Print columns A and D, which correspond to indices 0 and 3.
        console.log(`${row[0]} | ${row[1]}`);
      });
    
}

authorize().then(listInv).catch(console.error);







/* module.exports = {
    data: new SlashCommandBuilder()
        .setName('group_inventory')
        .setDescription('Displays Groups Inventory for 2nd Ed Game'),
        //.addStringOption(option => option.setName('cardname').setDescription('Search By Item name')),


    async execute(interaction) {
        //const value = interaction.options.getString('cardname');
        const mtg_scry = await mtg.card.where({name: value});

         if (!mtg_scry.length) {
            return interaction.reply(`No Results found for ${value}`);
        };
        

        var description_splice1 = mtg_scry[0].text.slice(0,42)
        var description_splice2 = mtg_scry[0].text.slice(42,84)
        var description_splice3 = mtg_scry[0].text.slice(84,126)
        var description_splice4 = mtg_scry[0].text.slice(126,167)

        return interaction.reply(
            `Card Info:

            | Card: ${mtg_scry[0].name}
            | Colors: ${color_emoji}
            | Total Mana Cost: ${mtg_scry[0].cmc}
            | Type: ${mtg_scry[0].types}
            | Text: 
            | ${description_splice1}
            | ${description_splice2}
            | ${description_splice3}
            | ${description_splice4}
            `)

    }

    
} */