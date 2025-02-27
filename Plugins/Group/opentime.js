
module.exports = {
    command: ['opentime'],
    operate: async (context) => {
        const { m, mess, args, isAdmins, isCreator, isBotAdmins, Cypher } = context;
        if (!m.isGroup) return reply(mess.group);
        if (!isAdmins && !isCreator) return reply(mess.notadmin);
        if (!isBotAdmins) return reply(mess.admin);

        const duration = args[0];
        const unit = args[1].toLowerCase();

        let timer;
        switch (unit) {
            case "seconds":
                timer = duration * 1000;
                break;
            case "minutes":
                timer = duration * 60000;
                break;
            case "hours":
                timer = duration * 3600000;
                break;
            case "days":
                timer = duration * 86400000;
                break;
            default:
                return reply("*Select unit:*\nseconds\nminutes\nhours\ndays\n\n*Example:*\n10 seconds");
        }

        reply(`*Opening group after ${duration} ${unit}*`);
        setTimeout(() => {
            Cypher.groupSettingUpdate(m.chat, "not_announcement");
            reply("Group opened by admin. Members can now send messages.");
        }, timer);
    }
};