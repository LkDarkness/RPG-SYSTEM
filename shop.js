const { Client, MessageEmbed } = require("discord.js");
const { MessageSelectMenu, MessageActionRow } = require("discord.js");
const firebase = require("firebase");
const db = firebase.database();

module.exports = {
    name: "shop",
    description: "Veja os Items da loja!",
    aliases: ["loja", "store"],

run: async(client, message, args) => {

    let embed_1 = new MessageEmbed()
        .setColor("#DDA0DD")
        .setDescription(`> <:emoji_1:903256094149865532> **| Ohayo ${message.author}, Bem vindo a loja!**
        >  <a:mih_seta_esquerda:903320549864923146> Clique na barra abaixo para ver minhas categorias de Produtos da Loja!\n> <a:mih_seta_esquerda:903320549864923146> Meu prefixo é **ky.** ou use **/**\n> <a:mih_seta_esquerda:903320549864923146> Para comprar algo utilize **ky.buy** ou **/buy**`);

        let painel = new MessageActionRow().addComponents( new MessageSelectMenu()
        .setCustomId('menu')
        .setPlaceholder(`✨ | Produtos`) // Mensagem estampada
        .addOptions([
               {
                    label: 'Painel inicial',
                    description: 'Volte para a página inicial.',
                    emoji: '<:x_page_back:903321445571125258>',
                    value: 'painel_inicial',
               },
                {
                    label: 'Equipamentos',
                    description: 'Clique aqui para ver os Equipamentos disponiveis',
                    emoji: '<:pa:903321765919477791>',
                    value: 'utilidade',
                },
                {
                    label: 'Medicina',
                    description: 'Clique aqui para ver os Items Medicinais disponiveis',
                    emoji: '<:6673749_emergency_health_healthc:892171116129427456>',
                    value: 'moderacao',
                },
                {
                    label: 'Uteis',
                    description: 'Clique aqui para ver os Items Uteis disponiveis',
                    emoji: '<:2003315_apple_educationfitness:891834761398603776>',
                    value: 'diversao',
                },
                {
                    label: 'Dungeons',
                    description: 'Clique aqui para ver os Items das Dungeons disponiveis',
                    emoji: '<:7344stardewtreasure:905246728528224276>',
                    value: 'dungeon',
                },
            ])

        );


        message.reply({ content: `${message.author}`, embeds: [embed_1], components: [painel] }).then(msg => {

            const filtro = (interaction) => 
              interaction.isSelectMenu()
        
            const coletor = msg.createMessageComponentCollector({
              filtro
            });
        
            coletor.on('collect', async (collected) => {

              let valor = collected.values[0]
              collected.deferUpdate()

        if (valor === 'painel_inicial') {

             msg.edit({ content: `${message.author}`, embeds: [embed_1], components: [painel] });
    
        };
        
        if (valor === 'utilidade') {

            let embed_2 = new MessageEmbed()
            .setColor("#DDA0DD")
            .setTitle(`> <a:4743_pink_flame:903324014758469693> **|** Equipamentos disponiveis`)
            .addFields(
                {
                name: `> Equipamentos`,
                value: `> <:espada_madeira:903322837987762259> **| Espada:** __300__\n> <a:mih_seta_esquerda:903320549864923146> \`Use ky.buy espada\`\n> <:picareta_madeira:903322946762854411> **| Picareta:** __500__\n> <a:mih_seta_esquerda:903320549864923146> \`Use ky.buy picareta\`\n> <:machado_madeira:903322985195262012> **| Machado:** __500__\n> <a:mih_seta_esquerda:903320549864923146> \`Use ky.buy machado\``,
                inline: true,
                })

            msg.edit({ content: `${message.author}`, embeds: [embed_2], components: [painel] });

        };

        if (valor === 'moderacao') {

            let embed_3 = new MessageEmbed()
            .setColor("#DDA0DD")
            .setTitle(`> <a:4743_pink_flame:903324014758469693> **|** Itens de Medicina disponiveis`)
            .addFields(
                {
                name: `> Itens Medicinais`,
                value: `> <:4951171_aid_bandage_carehealth:903324869729587282> **| Bandagem:** __500__\n> <a:mih_seta_esquerda:903320549864923146> \`Use ky.buy bandagem\`\n> <:2730331_bottle_colour_harry_magi:903324900146679808> **| Poção de HP:** __1000__\n> <a:mih_seta_esquerda:903320549864923146> \`Use ky.buy poção_hp\``,
                inline: true,
                }
            )

            msg.edit({ content: `${message.author}`, embeds: [embed_3], components: [painel] });

        };

        if (valor === 'diversao') {

            let embed_4 = new MessageEmbed()
            .setColor("#DDA0DD")
            .setTitle(`> <:black_pasta:903347259037581383> **|** Itens Úteis disponiveis`)
            .addFields(
                {
                name: `> Itens Úteis`,
                value: `> <:7344stardewtreasure:905246728528224276> **| Banco Oriental:** __1000__\n> <a:mih_seta_esquerda:903320549864923146>\`Use ky.buy banco\``
                }
            )

            msg.edit({ content: `${message.author}`, embeds: [embed_4], components: [painel] });

        };
        
        if (valor === 'dungeon') {

            let embed_4 = new MessageEmbed()
            .setColor("#DDA0DD")
            .setTitle(`> <:7344stardewtreasure:905246728528224276> **|** Items de Dungeons`)
            .addFields(
                {
                name: `> Items disponiveis`,
                value: `> <:pngfind:905983450304098384> **| Key Dungeon Simples:** __2000__\n> <a:mih_seta_esquerda:903320549864923146>\`Use ky.buy key_1\``
                }
            )

            msg.edit({ content: `${message.author}`, embeds: [embed_4], components: [painel] });
        };
        
        })

    })

}
}
