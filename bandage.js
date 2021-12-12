const { Client, MessageEmbed } = require("discord.js");
const firebase = require("firebase");
const db = firebase.database();

module.exports = {
    name: "bandage",
    description: "cura 50 pontos de vida",
    aliases: ["bandagem"],

run: async(client, message, args) => {

    let user = message.author;

    let very = await db.ref(`Banco/User/Very/${user.id}`).once("value")
    very = very.val()

if(very === null) {
    return message.reply(`> Eu não tenho esse usuário no meu **Banco de Dados**, por favor use \`start\``)
   };

if(very > 0 || very !== null) {

    let banco = await db.ref(`Banco/User/Status/${user.id}`).once("value")
    banco = banco.val().vida
    let inv = await db.ref(`Banco/User/Inventario/${user.id}`).once("value")
    inv = inv.val().bandagem

    if(inv === 0){
        return message.reply(`> <:err:903751317577691176> **|** Você não tem bandagens para se curar!`)
    };

    if(banco === 100) {
        return message.reply(`> <:err:903751317577691176> **|** Você ja está com o maximo de vida!`)
    };

    let vida = banco + 50;
    if(vida > 100) {
         db.ref(`Banco/User/Status/${user.id}`).update({vida: 100})
         db.ref(`Banco/User/Inventario/${user.id}`).update({bandagem: Number(inv) - Number(1)})
         return   message.reply(`> <:4951171_aid_bandage_carehealth:903324869729587282> **|** Você recuperou **50** pontos de vida! Porém sua vida maxima é **100**`)

    } else if(vida < 100){

         db.ref(`Banco/User/Status/${user.id}`).update({vida: Number(banco) + Number(50)})
         db.ref(`Banco/User/Inventario/${user.id}`).update({bandagem: Number(inv) - Number(1)})
        return    message.reply(`> <:4951171_aid_bandage_carehealth:903324869729587282> **|** Você recuperou 50 pontos de vida! Porém sua vida maxima é **100**`)
        };

};
}
}
