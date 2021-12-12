const { Client, MessageEmbed } = require("discord.js");
const firebase = require("firebase");
const db = firebase.database();

module.exports = {
    name: "inventory",
    description: "Olhe seu Inventário",
    aliases: ["inventario", "inv"],

run: async(client, message, args) => {

    let user = message.author;

    let very = await db.ref(`Banco/User/Very/${user.id}`).once("value")
    very = very.val()

if(very === null) {
    return message.reply(`> Eu não tenho esse usuário no meu **Banco de Dados**, por favor use \`start\``)
   };

    let banco = await db.ref(`Banco/Economia/Yangs/${user.id}`).once("value")
    let inv = await db.ref(`Banco/User/Inventario/${user.id}`).once("value")
    let zone = await db.ref(`Banco/User/Zonas/${user.id}`).once("value")
    let stats = await db.ref(`Banco/User/Status/${user.id}`).once("value")

   let vida = stats.val().vida

if(very > 0 || very !== null) {

     function progressDef(current, total, barSize) {
        const progressDefesa = Math.round((barSize*current)/total)
      
        return '▮'.repeat(progressDefesa) + '▯'.repeat(barSize-progressDefesa)
      }
      let lifi = progressDef(vida, 100, 10)

    let espada = inv.val().espada || "Não possui";
    let picareta = inv.val().picareta || "Não possui";
    let machado = inv.val().machado || "Não possui";
    let bandagem = inv.val().bandagem || "0";
    let pocao = inv.val().pocao_hp || "0";
    let couro = inv.val().couro || "0";
    let escamas = inv.val().escamas || "0";
    let dano = stats.val().dano 
    let bancoo = banco.val().bank
    let key_1 = inv.val().key_1 || "0";

    let embed_inv = new MessageEmbed()
    .setTitle(`> <:2799197_backpack_bag_camping_tra:903765413119262742> **|** Seu Inventário`)
    .setDescription(`⠀⠀\n> <a:mih_seta_esquerda:903320549864923146> *Veja seus Items, Pontos de vida, Dano e defesa*`)
    .addFields(
        {
            name: `⠀⠀\n<:2913121_destruction_destructivem:903766189182951425> **|** Status`,
            value: `⠀⠀⠀⠀\n> <:4096575_heart_like_love_icon:903766425250963476> ${lifi} [ **${vida}** / **100** ]\n\n> ⚔️ **${dano}**\n\n> <:7344stardewtreasure:905246728528224276> **${bancoo}**
            ⠀⠀`,
            inline: false
        },
        {
            name: `<:pa:903321765919477791> **|** Equipamentos⠀⠀`,
            value: `⠀⠀\n> <:espada_madeira:903322837987762259> **${espada}**\n\n> <:picareta_madeira:903322946762854411> **${picareta}**\n\n> <:machado_madeira:903322985195262012> **${machado}**`,
            inline: true
        },
        {
            name: `<:6673749_emergency_health_healthc:903322072082710549> **|** Medicamentos⠀⠀`,
            value: `⠀⠀\n> <:4951171_aid_bandage_carehealth:903324869729587282> **${bandagem}**\n\n> <:2730331_bottle_colour_harry_magi:903324900146679808> **${pocao}**`,
            inline: true
        },
        {
            name: `<:Business:903325351386710017> **|** Recursos`,
            value: `⠀⠀\n> 🦎 **${escamas}**\n\n> 🧆 **${couro}**\n\n> <:pngfind:905983450304098384> **${key_1}**`,
            inline: true
        }
    )
    message.reply({embeds: [embed_inv]})

};
    }
}
