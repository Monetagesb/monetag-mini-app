export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Only POST requests are allowed' });
    }

    const { rewardCount, userId } = req.body;

    // Telegram bot token and chat ID
    const botToken = process.env.TG_BOT_TOKEN;
    const chatId = userId; // Replace with your method of identifying the chat ID

    // Message to send to the Telegram bot
    const message = `User ${chatId} earned a reward! Current rewards: ${rewardCount}`;

    // Send message to Telegram bot
    const telegramApiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    
    try {
        const response = await fetch(telegramApiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: chatId, text: message }),
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
