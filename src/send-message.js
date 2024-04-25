const {Client , IntentsBitField , ActionRowBuilder,ButtonBuilder,ButtonStyle,EmbedBuilder} = require("discord.js")

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,

    ],
});

const roles =[
    {
        id:'1157972905074888794',
        label:'دخول',
        style : ButtonStyle.Success
    },
    {
        id:'1157973092900028416',
        label:'خروج',
        style : ButtonStyle.Danger
    },
]
const embed = new EmbedBuilder()
      .setColor('#0099ff') 
      .setTitle('ورقة الحضور')
      .setDescription('**تأكد من تسجيل دخولك**')
      .addFields({name: '***في حال حدوث خطأ***',value: '**عد المحاولة او تواصل مع احد القادة**'})
      .setFooter({text:"SSS205"})
 
      .setAuthor({name:"المباحث العامة",iconURL:"https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Seal_of_the_Mabahith.svg/140px-Seal_of_the_Mabahith.svg.png"})


client.on('ready', async(c)=>{
    try{
        // channel 7dhour 
        const channel = await client.channels.cache.get('1148907252812628005');
        if (!channel) return;
        const row = new ActionRowBuilder();
        roles.forEach((role) => {
            row.components.push(
                new ButtonBuilder().setCustomId(role.id).setLabel(role.label).setStyle(role.style)
            )
        })
        const channel1 = await client.channels.cache.get('1093944101247909934');
        const channel2 = await client.channels.cache.get('1093944101461839933');
        await channel.send({
            embeds: [embed],
            components : [row],
           })
           
        // await channel1.send({
        //     embeds: [embed],
        //     components : [row],
        //    })

        // await channel2.send({
        //     embeds: [embed],
        //     components : [row],
        //    })
           process.exit();
        }
    catch(error){
        console.log(error);
    }
});

// discord token 

//client.login("");