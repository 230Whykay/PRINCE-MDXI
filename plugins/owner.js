const axios = require('axios');
const config = require('../config')
const {cmd , commands} = require('../command')
const os = require("os")
const { exec } = require('child_process')
const { runtime, sleep } = require('../lib/functions');
const path = require("path");





cmd({
    pattern: "delete",
    react: "🗑️",
    alias: ["del", "dlt"],
    desc: "Delete the bot's messages or other messages (requires admin for others).",
    category: "group",
    use: '.del',
    filename: __filename
  },
  async (conn, mek, m, { 
    from, 
    quoted, 
    isAdmins, 
    isBotAdmins, 
    isOwner, 
    sender 
  }) => {
    try {
      // Vérifier si un message est cité
      if (!quoted) {
        return await conn.sendMessage(from, { text: "❌ Please reply to a message to delete it." }, { quoted: m });
      }
  
      // Construire la clé pour supprimer le message
      const key = {
        remoteJid: from, // ID du groupe ou du chat
        fromMe: quoted.fromMe, // Vérifie si le message appartient au bot
        id: quoted.id, // ID du message cité
        participant: quoted.sender // Expéditeur du message cité
      };
  
      // Vérifier si l'utilisateur est administrateur ou propriétaire
      if (!isAdmins && !isOwner) {
        return await conn.sendMessage(from, { text: "❌ Only admins or the owner can delete messages." }, { quoted: m });
      }
  
      // Supprimer le message si le bot ou l'owner l'a envoyé
      if (quoted.fromMe || sender === isOwner) {
        return await conn.sendMessage(from, { delete: key });
      }
  
      // Vérifier si le bot est administrateur pour supprimer les messages des autres dans un groupe
      if (m.isGroup) {
        if (!isBotAdmins) {
          return await conn.sendMessage(from, { text: "❌ I need admin privileges to delete messages from others." }, { quoted: m });
        }
        // Supprimer le message
        return await conn.sendMessage(from, { delete: key });
      }
  
      // Si en privé et le message n'appartient pas au bot
      return await conn.sendMessage(from, { text: "❌ I can only delete my messages in private chats." }, { quoted: m });
    } catch (e) {
      console.error("Error in delete command:", e);
    }
  });
  



cmd({
    pattern: "infoowner",
    desc: "owner the bot",
    category: "owner",
    react: "👨‍💻",
    filename: __filename
},

async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

let dec = `*👋 Hello ${pushname}*

*👨‍💻𝗣𝗥𝗜𝗡𝗖𝗘 𝗠𝗗𝗫𝗜👨‍💻*

> *𝗢𝗪𝗡𝗘𝗥 𝗜𝗡𝗙𝗢* 

*⚡Owner name -: ᴘʀɪɴᴄᴇ*
*⚡Number* -: https://t.me/faraday_11

⚡️◦ https://whatsapp.com/channel/0029Vac8SosLY6d7CAFndv3

> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴘʀɪɴᴄᴇ ᴍᴅxɪ*
`;
await conn.sendMessage(from,{image:{url:config.MENU_IMG},caption:dec},{quoted:mek});

}catch(e){
console.log(e)
reply(`${e}`)
}
});

cmd({
    pattern: "repo",
    desc: "repo the bot",
    react: "📡",
    category: "main",
    filename: __filename
},

async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

let dec = `*📍ℝ𝔼ℙ𝕆-𝕃𝕀ℕ𝕂 ❤️‍🔥👇*

👨‍💻◦https://github.com/MayelPrince/PRINCE-MDXI


*📍ℙ𝕃𝔼𝔸𝕊𝔼 𝔽𝕆𝕃𝕃𝕆𝕎 𝕄𝕐 𝕎ℍ𝔸𝕋𝕊𝔸ℙℙ ℂℍ𝔸ℕℕ𝔼𝕃 ❤️‍🔥👇*

👨‍💻◦ *https://whatsapp.com/channel/0029Vakd0RY35fLr1MUiwO3O*

> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴘʀɪɴᴄᴇ ᴍᴅxɪ*
`;
await conn.sendMessage(from,{image:{url: config.MENU_IMG},caption:dec},{quoted:mek});

}catch(e){
console.log(e)
reply(`${e}`)
}
});
cmd({
    pattern: "system",
    alias: ["status","botinfo"],
    desc: "Check up time , ram usage and more",
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let status = `┌─────────────────────
├ *Runtime:-* ${runtime(process.uptime())}
├ *Ram usage:-* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}GB / ${Math.round(require('os').totalmem / 1024 / 1024)}GB
├  *Platform:-* Linux
├ *Owners:-* ᴜꜱᴇʀꜱ
├ *Version:-* xɪ
└─────────────────────

> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴘʀɪɴᴄᴇ ᴍᴅxɪ*
`;
return reply(`${status}`)
  
}catch(e){
console.log(e)
reply(`${e}`)

}
})
cmd({
    pattern: "alive",
    desc: "Check bot online or no.",
    react: "👋",
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
return await conn.sendMessage(from,{image: {url: config.ALIVE_IMG},caption: config.ALIVE_MSG},{quoted: mek})
}catch(e){
console.log(e)
reply(`${e}`)
}
});

cmd({
    pattern: "jid",
    desc: "Get the JID of the chat.",
    category: "main",
   // react: "🔍",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
       
        
        const chatJid = from;

        
       await reply (`${chatJid}`)

    } catch (e) {
        console.error(e);
        reply(`${e}`);
    }
});

cmd({
    pattern: "restart",
    desc: "restart the bot",
    react :"🔄",
    category: "owner",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!isOwner) return reply(`only for owner`);
const {exec} = require("child_process")
reply("restarting...")
await sleep(1500)
exec("pm2 restart all")
}catch(e){
console.log(e)
reply(`${e}`)
}
})
// 1. Shutdown Bot
cmd({
    pattern: "shutdown",
    desc: "Shutdown the bot.",
    category: "owner",
    react: "🛑",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    reply("🛑 Shutting down...").then(() => process.exit());
});

// 2. Broadcast Message to All Groups
cmd({
    pattern: "broadcast",
    desc: "Broadcast a message to all groups.",
    category: "owner",
    react: "📢",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, args, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    if (args.length === 0) return reply("📢 Please provide a message to broadcast.");

    const message = args.join(' ');
    const groups = Object.keys(await conn.groupFetchAllParticipating());

    for (const groupId of groups) {
        await conn.sendMessage(groupId, { text: message }, { quoted: mek });
    }

    reply("📢 Message broadcasted to all groups.");
});


cmd({
    pattern: "block",
    desc: "Block a user.",
    category: "owner",
    react: "🚫",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, quoted, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    if (!quoted) return reply("❌ Please reply to the user you want to block.");

    const user = quoted.sender;
    try {
        await conn.updateBlockStatus(user, 'block');
        reply(`🚫 User blocked successfully.`);
    } catch (error) {
        reply(`❌ Error blocking user: ${error.message}`);
    }
});

// 5. Unblock User
cmd({
    pattern: "unblock",
    desc: "Unblock a user.",
    category: "owner",
    react: "✅",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, quoted, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    if (!quoted) return reply("❌ Please reply to the user you want to unblock.");

    const user = quoted.sender;
    try {
        await conn.updateBlockStatus(user, 'unblock');
        reply(`✅ User unblocked successfully.`);
    } catch (error) {
        reply(`❌ Error unblocking user: ${error.message}`);
    }
});


cmd({
    pattern: "ping",
    desc: "Check bot's response time.",
    category: "main",
    react: "✅",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const startTime = Date.now()
        const message = await conn.sendMessage(from, { text: '𝗣𝗶𝗻𝗴𝗶𝗻𝗴...' })
        const endTime = Date.now()
        const ping = endTime - startTime
        await conn.sendMessage(from, { text: `📍Ping :${ping}ms` }, { quoted: message })
    } catch (e) {
        console.log(e)
        reply(`${e}`)
    }
});