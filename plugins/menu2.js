/*created by King Malvin 🕵
contact dev1 263780934873 ♻️
contact dev2 https://t.me/malvinking2 ♻️
© just give credit will you ⚠
*/





const config = require('../config')
const {cmd , commands} = require('../command')
cmd({
    pattern: "menu",
    react: "📜",
    desc: "get cmd list",
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let menu = {
main: '',
download: '',
group: '',
owner: '',
convert: '',
search: ''
};

for (let i = 0; i < commands.length; i++) {
if (commands[i].pattern && !commands[i].dontAddCommandList) {
menu[commands[i].category] += `*┋* ${commands[i].pattern}\n`;
 }
}

let madeMenu = `
╔═❖「 *${config.BOT_NAME}*  」❖╗
║  Hello, *${pushname}*  
║ ᴘʟᴜɢɪɴꜱ: *${commands.length}*  
║ ᴄʀᴇᴀᴛᴇᴅ ʙʏ 𝙿𝚁𝙸𝙽𝙲𝙴 𝚃𝙴𝙲𝙷  
╚══════════════╝

╔═✦『 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃 』✦╗
${menu.download}
╚════════════════╝

╔═══✦『 𝐌𝐀𝐈𝐍 』✦═══╗
${menu.main}
╚═════════════════╝

╔═══✦『 𝐆𝐑𝐎𝐔𝐏 』✦══╗
${menu.group}
╚═════════════════╝

╔══✦『 𝐎𝐖𝐍𝐄𝐑 』✦══╗
${menu.owner}
╚════════════════╝

╔═✦『 𝐂𝐎𝐍𝐕𝐄𝐑𝐓𝐄𝐑 』✦╗
${menu.convert}
╚═════════════════╝

╔═══✦『 𝐒𝐄𝐀𝐑𝐂𝐇 』✦═╗
${menu.search}
╚═════════════════╝ 
> ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴘʀɪɴᴄᴇ ᴛᴇᴄʜ 
`


await conn.sendMessage(from,{image:{url:config.MENU_IMG},caption:madeMenu},{quoted:mek})

}catch(e){
console.log(e)
reply(`${e}`)
}
})
