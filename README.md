## Nour Bot modified By Noureddine ouafy

- If you facing some issue, just 
# Installation

### Deploy to heroku

 Fork the repo
 
 <a href='https://github.com/xxirfanx/zoromd/fork' target="_blank"><img alt='Fork repo' src='https://img.shields.io/badge/fork repo-000?style=for-the-badge&logo=github&logoColor=white'/></a>


### Deploy to Replit
[![Run on Repl.it](https://repl.it/badge/github/noureddineouafy/Nour-MD)](https://repl.it/github/noureddineouafy/Nour-MD)

Language Search/Type `nix Bash` Don't nodejs

add forget [uptimerobot click](https://uptimerobot.com)

### RUN ON REPLIT
1. Visit the web [this](https://replit.com)
2. Login or register
3. Press Create Repl
4. Press `import for github`
5. Search for this Repo or type in `xxirfanx/zoromd`
6. Language Search/Type `nix Bash` Don't nodejs
7. Press `Import from Github`
8. Edit `config.js` replace the owner number with another number or edit
9. Swipe Right from the post `Shell` then click
10. type `npm install` to install modules
11. Wait until the module install process is complete
12. Run the Bot by typing this
13. add forget [uptimerobot click](https://uptimerobot.com)
```bash
node . --server
```

---------


## How To Customise Message Display

### Send Message
```js
conn.reply(m.chat, 'text', m)
//without reply message
conn.reply(m.chat, 'text', null) // just need to change "m" to null, can be applied in conn.sendFile
```

### Send Message With Tag
```js
conn.reply(m.chat, 'text @919911111111', m, {
	mentions: ['919911111111@s.whatsapp.net']
})

// or

m.reply('anu @919911111111', null, {
	mentions: ['919911111111@s.whatsapp.net']
})

// use thumbnail & tag

m.reply('anu @919911111111', null, {
	contextInfo: {
		mentionedJid: ['919911111111@s.whatsapp.net'],
		externalAdReply: await thumb(buffer_image, ['title', 'body'], [true, true])
	}
})

conn.reply(m.chat, 'anu @919911111111', m, {
	contextInfo: {
		mentionedJid: ['919911111111@s.whatsapp.net'],
		externalAdReply: await thumb(buffer_image, ['title', 'body'], [true, true])
	}
})
```

### Simple Send Message
```js
m.reply('text')
```

### Send All Type File
```js
conn.sendFile(m.chat, 'buffer', 'filename.jpg', 'caption', m)

// mode document
conn.sendFile(m.chat, 'buffer', 'filename.jpg', 'caption', m, null, {
	asDocument: true
})

// mode document and thumbnail
conn.sendFile(m.chat, 'buffer', 'filename.jpg', 'caption', m, null, {
	asDocument: true,
	contextInfo: {
		externalAdReply: await thumb(buffer_image, ['title', 'body'], [true, true])
	}
})

// mode document and thumbnail and tag
conn.sendFile(m.chat, 'buffer', 'filename.jpg', 'caption @919911111111', m, null, {
	asDocument: true,
	contextInfo: {
		mentionedJid: ['919911111111@s.whatsapp.net'],
		externalAdReply: await thumb(buffer_image, ['title', 'body'], [true, true])
	}
})
```

### Send All Type File With Caption Tag
```js
conn.sendFile(m.chat, 'buffer', 'filename.jpg', 'caption @919911111111', m, null, {
mentions: ['919911111111@s.whatsapp.net']
})

//use thumbnail
conn.sendFile(m.chat, 'buffer', 'filename.jpg', 'caption @919911111111', m, null, {
	contextInfo: {
		mentionedJid: ['919911111111@s.whatsapp.net'],
		externalAdReply: await thumb(buffer_image, ['title', 'body'], [true, true])
	}
})

```

### Edit Message
```js
var a = await m.reply('text')
conn.editMessage(m.chat, a.key, 'text', m)

// or

let a = await conn.reply(m.chat, 'text', m)
conn.editMessage(m.chat, a.key, 'text', m)
```
### React Message
```js
m.react('🤑')
```

---------

### 📮 S&K
1. Not For Sale
2. Don't forget give star this repo
3. Follow Github
4. Don't use this repository wrong!
5. If you have problem chat me in owner number

---------

- How to delete session?

> You can delete folder `sessions` or run command ```rm -rf sessions```
- How to change owner number?

> You can change in `config.js`, on global.owner. make sure you use correct syntax.
```js
global.owner = [
  ['919911111111', 'Name', true]
]

and

global.nomorown = '919911111111'
```
> First argument on array is number like `919911111111`, second argument is name like `Name` (if this argument pass, if using `owner` command, this number will send as owner), third argument is developer like `true` (if this argument pass, if there have plugins error (not syntax error) the error will send to developer)
---------
### want to contribute?
1. fork this repository
2. Change/edit/create what you want. for example you can add features, fix bug, etc
3. **test** before making a pull req!!
4. make a pull req!
5. if your pull req is already in **acc/merge**, you can delete your branch or you can create pull req again :)

---------
  
 ```bash
 𝐀𝐮𝐭𝐡𝐨𝐫 : lua ser ofc
 𝐖𝐚 : +91 6235 050 956
 𝐛𝐚𝐬𝐞 : Narutomo and BochilGaming and Rlxfly
 𝐌𝐲 𝐏𝐫𝐨𝐣𝐞𝐜𝐭 : 7 may 2023
 ```
