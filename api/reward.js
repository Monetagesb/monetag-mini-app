// api/reward.js
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Only POST requests are allowed' });
    }

    const { rewardCount, username } = req.body;

    // Check if required data is available
    if (!rewardCount || !username) {
        return res.status(400).json({ message: 'Missing reward count or username' });
    }

    // Telegram bot token
    const botToken = process.env.TG_BOT_TOKEN;

    // Telegram message
    const message = `User @${username} earned a reward! Current rewards: ${rewardCount}`;

    // Telegram API URL to send the message
    const telegramApiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

    try {
        const response = await fetch(telegramApiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: `@${username}`, text: message }),
        });

        if (!response.ok) {
            throw new Error(`Telegram API Error: ${response.statusText}`);
        }

        res.status(200).json({ message: 'Reward sent to Telegram bot successfully' });
    } catch (error) {
        console.error('Error sending reward to Telegram:', error);
        res.status(500).json({ message: 'Failed to send reward to Telegram bot' });
    }
}
