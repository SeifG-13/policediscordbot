const {Client , IntentsBitField,GatewayIntentBits} = require("discord.js")
const mongoose = require("mongoose");
const time = require("./start time");
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        GatewayIntentBits.Guilds,
         GatewayIntentBits.GuildMembers

    ],
});



client.on('ready', async(c)=>{
    console.log(`${c.user.username} is online`)
    // bdd code https://www.youtube.com/watch?v=edeNqzKvj0g&t=6s
    // mongoose code connect
    await mongoose.connect('',
    {keepAlive: true,  useNewUrlParser: true, useUnifiedTopology: true,})
    if(mongoose.connect){     console.log('Connected to MongoDB ') }
});



client.on('interactionCreate', async(interaction)=>{
    try{ if(!interaction.isButton())return;
        const guild = interaction.guild;
        
        const roled5oul = guild.roles.cache.find((role) => role.id === '1157972905074888794');
        const role5rouj = guild.roles.cache.find((role) => role.id === '1157973092900028416');
        await interaction.deferReply({ephemeral: true});
        const role = interaction.guild.roles.cache.get(interaction.customId);
        
        if(!role){
            interaction.editReply({content: "يوجد عطل فني تواصل مع احدالقادات"})
            return;
        }
        const hasRole = interaction.member.roles.cache.has(role.id)
        if (hasRole){
            await interaction.editReply('العملية قد تمت بالفعل');
            return;
        }
        if(!hasRole){
            // role d5oul 
            if(role.id === '1157972905074888794'){
                await interaction.member.roles.add(roled5oul);
                await interaction.member.roles.remove(role5rouj);
                await interaction.editReply(`تم تسجيل دخولك بنجاح `)
                var start = new Date()
                const newstart = new time (
                    {
                        userId: interaction.user.id,
                        timeId : start ,
                    }
                )
                await newstart.save();
            }
            // role 5rouj
            else if (role.id === '1157973092900028416'){
                try {
                await interaction.member.roles.add(role5rouj);
                await interaction.member.roles.remove(roled5oul);
                await interaction.editReply(`تم تسجيل خروجك بنجاح `)
                const query = {
                    userId: interaction.user.id,
                }
                const ntime = await time.findOne(query)
                var timebd = ntime.timeId
                var end = new Date()
                const diff = end - timebd
                const hour = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const min = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                const sec = Math.floor((diff % (1000 * 60)) / 1000);
                // channel log 
                const channel1 = client.channels.cache.find(c=>c.id === "1150092426111885353")
                channel1.send(`تم تسجيل خروج العسكري <@${interaction.user.id}>\n مدة التواجد : ${sec} ثانية  و ${min} دقيقة و${hour} ساعة`)
                time.findOneAndDelete(query).exec().catch((error) => {
                    console.error('Error:', error);  });
                } catch (error) {
                    console.log(error)
                }
               
            }
        }
        
    }
    catch (error){console.log(error)}
   

})

// bot token 
//client.login("");
