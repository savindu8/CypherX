
module.exports = {
  command: ['ssweb', 'screenshot', 'ss'],
  operate: async ({ Cypher, m, reply, args }) => {
    const q = args.join(" ");
    if (!q) return reply(`Please provide a URL to screenshot!`);
    
    const apiURL = `https://api.tioo.eu.org/sshp?url=${q}`;
    
    try {
      await Cypher.sendMessage(m.chat, { image: { url: apiURL } }, { quoted: m });
    } catch (error) {
      console.error('Error generating screenshot:', error);
      reply("An error occurred while generating the image.");
    }
  }
};