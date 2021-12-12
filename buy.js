const { Client, MessageEmbed, Message } = require("discord.js");
const firebase = require("firebase");
const db = firebase.database();

module.exports = {
    name: "buy",
    description: "Comprar alguma coisa da loja",
    aliases: ["comprar"],

run: async(client, message, args) => {

    let user = message.author;

    let very = await db.ref(`Banco/User/Very/${user.id}`).once("value")
very = very.val()

if(very === null) {
    return message.reply(`> Eu não tenho esse usuário no meu **Banco de Dados**, por favor use \`start\``)
   };

   if(very !== null || very > 0) {

    let author = await db.ref(`Banco/Economia/Yangs/${user.id}`).once("value")
    let money = author.val().yangs

    if (args[0] == 'espada') {
      if (money < 300) return message.reply(`> :moneybag:  **| Yangs Insuficientes!**
      > <a:mih_seta_esquerda:903320549864923146> *Você precisa de **300** <a:yang:905144178336493608> Yangs para comprar a espada de madeira!*`)
      
      db.ref(`Banco/User/Inventario/${user.id}`).update({espada: 1,})

        db.ref(`Banco/Economia/Yangs/${user.id}`).update({yangs: Number(money) - Number(300),})
      message.reply(`> :moneybag:  **| Compra Efetuada com sucesso**
      > <a:mih_seta_esquerda:903320549864923146> *Você comprou uma **Espada de Madeira** por **300** <a:yang:905144178336493608> Yangs*`)

  } else if (args[0] == 'picareta') {
    if (money < 500) return message.reply(`> :moneybag:  **| Yangs Insuficientes!**
    > <a:mih_seta_esquerda:903320549864923146> *Você precisa de **500** <a:yang:905144178336493608> Yangs para comprar a picareta de madeira!*`)
    
    db.ref(`Banco/User/Inventario/${user.id}`).update({picareta: 1,})

      db.ref(`Banco/Economia/Yangs/${user.id}`).update({yangs: Number(money) - Number(500),})
    message.reply(`> :moneybag:  **| Compra Efetuada com sucesso**
    > <a:mih_seta_esquerda:903320549864923146> *Você comprou uma **Picareta de Madeira** por **500** <a:yang:905144178336493608> Yangs*`)
} else if (args[0] == 'machado') {
    if (money < 500) return message.reply(`> :moneybag:  **| Yangs Insuficientes!**
    > <a:mih_seta_esquerda:903320549864923146> *Você precisa de **500** <a:yang:905144178336493608> Yangs para comprar o machado de madeira!*`)
    
    db.ref(`Banco/User/Inventario/${user.id}`).update({machado: 1,})

      db.ref(`Banco/Economia/Yangs/${user.id}`).update({yangs: Number(money) - Number(500),})
    message.reply(`> :moneybag:  **| Compra Efetuada com sucesso**
    > <a:mih_seta_esquerda:903320549864923146> *Você comprou um **Machado de Madeira** por **500** <a:yang:905144178336493608> Yangs*`)
} else if (args[0] == 'bandagem') {
    if (money < 500) return message.reply(`> :moneybag:  **| Yangs Insuficientes!**
    > <a:mih_seta_esquerda:903320549864923146> *Você precisa de **500** <a:yang:905144178336493608> Yangs para comprar uma bandagem!*`)
    
    let band = await db.ref(`Banco/User/Inventario/${user.id}`).once("value")

    let banda = band.val().bandagem
    if(banda === null) {
        await db.ref(`Banco/User/Inventario/${user.id}`).set({bandagem: 0})
    };

    db.ref(`Banco/User/Inventario/${user.id}`).update({bandagem: Number(banda) + Number(1),})

      db.ref(`Banco/Economia/Yangs/${user.id}`).update({yangs: Number(money) - Number(500),})
    message.reply(`> :moneybag:  **| Compra Efetuada com sucesso**
    > <a:mih_seta_esquerda:903320549864923146> *Você comprou um **Bandagem** por **500** <a:yang:905144178336493608> Yangs*`)
}

else if (args[0] == 'poção_hp') {
    if (money < 1000) return message.reply(`> :moneybag:  **| Yangs Insuficientes!**
    > <a:mih_seta_esquerda:903320549864923146> *Você precisa de **1000** <a:yang:905144178336493608> Yangs para comprar uma Poção de vida!*`)
    
    let poc = await db.ref(`Banco/User/Inventario/${user.id}`).once("value")

    let poca = poc.val().pocao_hp
    if(poc === null) {
        await db.ref(`Banco/User/Inventario/${user.id}`).set({pocao_hp: 0})
    };

    db.ref(`Banco/User/Inventario/${user.id}`).update({pocao_hp: Number(poca) + Number(1),})

      db.ref(`Banco/Economia/Yangs/${user.id}`).update({yangs: Number(money) - Number(1000),})
    message.reply(`> :moneybag:  **| Compra Efetuada com sucesso**
    > <a:mih_seta_esquerda:903320549864923146> *Você comprou uma **Poção de vida** por **1000** <a:yang:905144178336493608> Yangs*`)
} else if (args[0] == 'banco'){
  if(money < 1000) return message.reply(`> :moneybag:  **| Yangs Insuficientes!**
  > <a:mih_seta_esquerda:903320549864923146> *Você precisa de **1000** <a:yang:905144178336493608> Yangs para comprar um Banco*`)

  let bank = await db.ref(`Banco/User/Inventario/${user.id}`).once("value")

  let banco = bank.val().banco
  if(banco === null){
    await db.ref(`Banco/User/Inventario/${user.id}`).set({banco: 0})
  };

  db.ref(`Banco/User/Inventario/${user.id}`).set({banco: 1})
  db.ref(`Banco/Economia/Yangs/${user.id}`).update({yangs: Number(money) - Number(1000),})

  message.reply(`> :moneybag:  **| Compra Efetuada com sucesso**
    > <a:mih_seta_esquerda:903320549864923146> *Você comprou um **Banco** por **1000** <a:yang:905144178336493608> Yangs*`)
} else if(args[0] == 'key_1'){

  if(money < 2000) return message.reply(`> :moneybag:  **| Yangs Insuficientes!**
  > <a:mih_seta_esquerda:903320549864923146> *Você precisa de **2000** <a:yang:905144178336493608> Yangs para comprar uma chave de Dungeon!*`)

  let bank = await db.ref(`Banco/User/Inventario/${user.id}`).once("value")

  let banco = bank.val().key_1
  if(banco === null){
    await db.ref(`Banco/User/Inventario/${user.id}`).set({key_1: 0})
};

db.ref(`Banco/User/Inventario/${user.id}`).set({key_1: 1})
db.ref(`Banco/Economia/Yangs/${user.id}`).update({yangs: Number(money) - Number(2000),})

message.reply(`> :moneybag:  **| Compra Efetuada com sucesso**
  > <a:mih_seta_esquerda:903320549864923146> *Você comprou uma **Key Simples** por **2000** <a:yang:905144178336493608> Yangs*`)
   };
   };

}
}
