const { Client, MessageEmbed } = require("discord.js");
const firebase = require("firebase");
const db = firebase.database();
const ms = require("parse-ms");

module.exports = {
    name: "mine",
    description: "Explora uma mina",
    aliases: ["minerar"],

run: async(client, message, args) => {

    let user = message.author;

    let very = await db.ref(`Banco/User/Very/${user.id}`).once("value")
    very = very.val()

    var banco = await db.ref(`Banco/Economia/Yangs/${user.id}`).once("value")

    var inv = await db.ref(`Banco/User/Inventario/${user.id}`).once("value")
    if(inv === null) {
        await db.ref(`Banco/User/Tempo/${user.id}`).update({pedras: 0, bronze: 0, ferro: 0, ouro: 0, diamante: 0,})
    };

    if(very === null) {
        return message.reply(`> Eu não tenho esse usuário no meu **Banco de Dados**, por favor use \`start\``)
       };

    if(very !== null || very > 0) {

        var temp = await db.ref(`Banco/User/Tempo/${user.id}`).once("value")

        let tem = inv.val().picareta
    if(tem === 0 || tem === null ) {

        return message.reply(`> <:err:891444577767149609> **|** *Você não possui uma Picareta para minerar! Compre na Loja*`)
    };

let mine_tempo = temp.val().mine

let cooldown = 3600000;

    if (mine_tempo !== null && cooldown - (Date.now() - mine_tempo) > 0) {
        let timeobj = ms(cooldown - (Date.now() - mine_tempo));
    
    //============// EMBED COOLDOWN //==============//
    
    return message.channel.send(`> **__| Você está cansado para minerar!__**
    > <a:mih_seta_esquerda:903320549864923146> *por favor espere ${timeobj.hours} horas, ${timeobj.minutes} minutos e ${timeobj.seconds} segundos!*`);
    
    };

    if(tem > 0) {
        let pe = inv.val().pedras
        let pedras = Math.floor(Math.random() * 30 + 1);

        let msg = await message.channel.send({content: '> <:185582_wooden_pickaxe_icon:892172383329325056> **| Minerando...**'})
        let time = 3*500
        setTimeout(function(){
          msg.edit(`> <a:4743_pink_flame:903324014758469693> **| Mineração concluida**
          > <:picareta_madeira:903322946762854411> **|** *Você minerou em uma caverna em uma caverna e coletou **${pedras}** pedras durante a mineração!*`)
        }, time)

        await db.ref(`Banco/User/Inventario/${user.id}`).update({pedras: Number(pe) + Number(pedras),})
        await db.ref(`Banco/User/Tempo/${user.id}`).update({mine: Date.now(),})
    };

    };

}
}
