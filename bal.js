const firebase = require("firebase");
const db = firebase.database();

module.exports = {
    name: "bal",
    description: "Ver quantos Yangs você/usuário possui.",
    aliases: ["saldo", "money", "cash", "atm", "yangs"],

run: async(client, message, args) => {

    let user = message.mentions.users.first() || message.author;

    let banco = await db.ref(`Banco/Economia/Yangs/${user.id}`).once("value")
    banco = banco.val()

    if(banco === null) {
        return message.reply(`> Eu não tenho esse usuário no meu **Banco de Dados**, por favor use \`start\``)
    }

    if(banco > 0 || banco !== null) {

        let money = banco.yangs

        message.reply(`> ${user} possui **${money}** <a:yang:905144178336493608> Yangs!`)

    };


}
}
