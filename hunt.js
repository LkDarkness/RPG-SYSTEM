const { Client, MessageEmbed } = require("discord.js");
const firebase = require("firebase");
const db = firebase.database();
const ms = require("parse-ms");

module.exports = {
    name: "hunt",
    description: "Comece uma caçada",
    aliases: ["caçar", "cacar"],

run: async(client, message, args) => {

    let user = message.author;

    let very = await db.ref(`Banco/User/Very/${user.id}`).once("value")
    very = very.val()

    var banco = await db.ref(`Banco/Economia/Yangs/${user.id}`).once("value")
    let stats = await db.ref(`Banco/User/Status/${user.id}`).once("value")

    var inv = await db.ref(`Banco/User/Inventario/${user.id}`).once("value")
    if(inv === null) {
        await db.ref(`Banco/User/Tempo/${user.id}`).update({pedras: 0, bronze: 0, ferro: 0, ouro: 0, diamante: 0,})
    };

    if(very === null) {
        return message.reply(`> Eu não tenho esse usuário no meu **Banco de Dados**, por favor use \`start\``)
       };

    if(very !== null || very > 0) {

        var temp = await db.ref(`Banco/User/Tempo/${user.id}`).once("value")

        let tem = inv.val().espada
    if(tem === 0 || tem === null ) {

        return message.reply(`> <:err:903751317577691176> **|** *Você não possui uma **Espada** para caçar! Compre na Loja*`)
    };

    let vi = stats.val().vida

    if(vi < 10) {
        return message.reply(`> <:err:903751317577691176> **|** *Você está com pouca **vida** para poder sair para caçar!*`)
    };

let mine_tempo = temp.val().hunt

let cooldown = 3600000;

    if (mine_tempo !== null && cooldown - (Date.now() - mine_tempo) > 0) {
        let timeobj = ms(cooldown - (Date.now() - mine_tempo));
    
    //============// EMBED COOLDOWN //==============//
    
    return message.channel.send(`> **__| Você está cansado para Caçar!__**
    > <a:mih_seta_esquerda:903320549864923146> *por favor espere ${timeobj.hours} horas, ${timeobj.minutes} minutos e ${timeobj.seconds} segundos!*`);
    
    };

    if(tem > 0) {
        let pe = inv.val().couro
        let pedras = Math.floor(Math.random() * 10 + 1);
        let es = inv.val().escamas
        let oi = Math.floor(Math.random() * 10 + 1);

        let vida = Math.floor(Math.random() * 30 + 1);

        let msg = await message.channel.send({content: '> <:espada_madeira:903322837987762259> **| Caçando...**'})
        let time = 3*500
        setTimeout(function(){
          msg.edit(`> <a:4743_pink_flame:903324014758469693> **| Caça concluida**
          > <:espada_madeira:903322837987762259> **|** *Você caçou, coletou **${pedras}** couro de vaca & **${oi}** escamas de lagartos*
          > <a:mih_seta_esquerda:903320549864923146> *Com isso você ficou com **${Number(vi) - Number(vida)}** pontos de Vida*`)
        }, time)

        await db.ref(`Banco/User/Inventario/${user.id}`).update({couro: Number(pe) + Number(pedras), escamas: Number(es) + Number(oi)})
        await db.ref(`Banco/User/Tempo/${user.id}`).update({hunt: Date.now(),})
     await db.ref(`Banco/User/Status/${user.id}`).update({vida: Number(vi) - Number(vida)})
    };

    };

}
}
