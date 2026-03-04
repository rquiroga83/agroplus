// api/chat.js
// In-memory store (Note: In Vercel serverless, this state is per-instance and may be reset frequently. 
// For production with true rate limiting, use Redis/KV. For this demo, it's a basic approach.)
const rateLimitMap = new Map();

// Helper to clean up old entries to prevent memory leaks
const cleanupRateLimits = () => {
    const now = Date.now();
    for (const [ip, data] of rateLimitMap.entries()) {
        if (now - data.dailyReset > 24 * 60 * 60 * 1000) {
            rateLimitMap.delete(ip);
        }
    }
};

// No setInterval in serverless as it prevents process exit, run inline or manually when needed
// But since data lives per invocation container, it's fine.

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
    const now = Date.now();

    // Cleanup old limits inline (lightweight)
    for (const [storedIp, data] of rateLimitMap.entries()) {
        if (now > data.dailyReset) rateLimitMap.delete(storedIp);
    }

    let userLimit = rateLimitMap.get(ip);

    if (!userLimit) {
        userLimit = {
            minuteCount: 0,
            minuteReset: now + 60 * 1000,
            dailyCount: 0,
            dailyReset: now + 24 * 60 * 60 * 1000,
        };
    }

    // Reset minute counter if time passed
    if (now > userLimit.minuteReset) {
        userLimit.minuteCount = 0;
        userLimit.minuteReset = now + 60 * 1000;
    }

    // Reset daily counter if time passed
    if (now > userLimit.dailyReset) {
        userLimit.dailyCount = 0;
        userLimit.dailyReset = now + 24 * 60 * 60 * 1000;
    }

    // Parse limits from environment variables or use defaults
    const MAX_DAILY = parseInt(process.env.RATE_LIMIT_PER_DAY || '40', 10);
    const MAX_MINUTE = parseInt(process.env.RATE_LIMIT_PER_MINUTE || '10', 10);

    // Check limits
    if (userLimit.dailyCount >= MAX_DAILY) {
        return res.status(429).json({ error: `Has excedido el límite diario de ${MAX_DAILY} solicitudes.` });
    }
    if (userLimit.minuteCount >= MAX_MINUTE) {
        return res.status(429).json({ error: `Has excedido el límite de ${MAX_MINUTE} solicitudes por minuto. Intenta pronto.` });
    }

    // Increment counters
    userLimit.minuteCount++;
    userLimit.dailyCount++;
    rateLimitMap.set(ip, userLimit);

    try {
        const { messages } = req.body;

        if (!messages || !Array.isArray(messages)) {
            return res.status(400).json({ error: 'Messages array is required' });
        }

        const systemMessage = {
            role: 'system',
            content: `Eres un asistente agrícola de AgroPlus. Tu objetivo es preguntarle al granjero qué cultivos ha tenido antes en su terreno y cómo le fue con ellos (rendimiento, problemas, etc.).
Debes ser conversacional, amable y hacer preguntas cortas y fáciles de responder.
Solo haz una pregunta a la vez. No des respuestas largas.
Una vez que el usuario te mencione los cultivos y cómo le fue, agradécele, dale un consejo corto y dile que ya puede proceder haciendo clic en "Analizar Terreno con IA".`
        };

        const apiMessages = [systemMessage, ...messages];

        const apiKey = process.env.DEEPSEEK_API_KEY;
        if (!apiKey) {
            return res.status(500).json({ error: 'API key no configurada en el servidor.' });
        }

        const response = await fetch('https://api.deepseek.com/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'deepseek-chat',
                messages: apiMessages,
                max_tokens: 150,
                temperature: 0.7
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('DeepSeek API Error:', errorText);
            return res.status(response.status).json({ error: 'Error del servicio AI' });
        }

        const data = await response.json();

        return res.status(200).json({ message: data.choices[0].message.content });

    } catch (error) {
        console.error('Error in chat handler:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
}
