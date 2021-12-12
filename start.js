const { async } = require("@firebase/util");
const { MessageEmbed } = require("discord.js");
const firebase = require("firebase");
const db = firebase.database();

module.exports = {
    name: "start",
    description: "Inicie sua aventura!",
    aliases: ["começar", "iniciar"],

run: async(client, message, args) => {

    let user = message.author;
    let banco = await db.ref(`Banco/Economia/Yangs/${user.id}`).once("value")
    let very = await db.ref(`Banco/User/Very/${user.id}`).once("value")
    very = very.val()

    if(very > 0 || very !== null) {
        return message.reply(`> Ops... Parece que você ja iniciou uma aventura!`)
    };
    
    if(very === null) {

        db.ref(`Banco/Economia/Yangs/${user.id}`).update({yangs: 0, bank: 0})
        db.ref(`Banco/User/Status/${user.id}`).update({vida: 100, dano: 10, defesa: 10, level: 1, xp: 0})
        db.ref(`Banco/User/Tempo/${user.id}`).update({daily: 0, mine: 0, hunt: 0})
        db.ref(`Banco/User/Very/${user.id}`).update({very: "verificado",})
        db.ref(`Banco/User/Inventario/${user.id}`).update({picareta: 0, machado: 0, espada: 0, pocao_hp: 0, bandagem: 0, pedras: 0, bronze: 0, ferro: 0, ouro: 0, diamante: 0, couro: 0, escamas: 0,})
        db.ref(`Banco/User/Zonas/${user.id}`).update({zona: 1,})

        let msg = await message.channel.send({content: '> **carregando...**'})
        let time = 3*500
 setTimeout(function(){
   msg.edit({content: `> **Seu Personagem foi criado!**`})
 }, time)

    };

}
}
