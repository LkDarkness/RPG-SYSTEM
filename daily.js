const { MessageEmbed } = require("discord.js");
const ms = require("parse-ms");
const firebase = require("firebase");
const db = firebase.database();

module.exports = {
name: "daily",
description: "Resgate seu prêmio diário!",
aliases: ["diario", "daily"],

run: async(client, message, args) => {

let user = message.author;

let very = await db.ref(`Banco/User/Very/${user.id}`).once("value")
very = very.val()

var banco = await db.ref(`Banco/Economia/Yangs/${user.id}`).once("value")

if(very === null) {
    return message.reply(`> Eu não tenho esse usuário no meu **Banco de Dados**, por favor use \`start\``)
   };

if(very > 0 || very !== null) {

var databas = await db.ref(`Banco/User/Tempo/${user.id}`).once("value")

let lastdaily = databas.val().daily

let atual = banco.val().yangs

let give = Math.floor(Math.random() * 300 + 100);

let cooldown = 8.64e7;

//============// COOLDOWN DAILY //===============//

if (lastdaily !== null && cooldown - (Date.now() - lastdaily) > 0) {
    let timeobj = ms(cooldown - (Date.now() - lastdaily));

//============// EMBED COOLDOWN //==============//

message.reply(`> **Você ja coletou seu prêmio diário!**\n
> *Por favor espere **${timeobj.hours}** horas, **${timeobj.minutes}** minutos e **${timeobj.seconds}** segundos!*`);

} else {
//===========// UPDATE NA DB //==============//

let money = parseInt(atual);
let pagamento = parseInt(give)

await db.ref(`Banco/Economia/Yangs/${user.id}`).update({yangs: Number(money) + Number(pagamento),})
await db.ref(`Banco/User/Tempo/${user.id}`).update({daily: Date.now()})

//===========// EMBED UPDATE //==============//

      message.reply(` Você resgatou seu prêmio diário, e ganhou **__${give}__** <a:yang:905144178336493608> Yangs! agora está com um total de **__${atual+give}__** <a:yang:905144178336493608> Yangs!`)
    }
  };

  }
}
