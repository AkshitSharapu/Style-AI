import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config({ path: '../.env' });

const app = express();
const PORT = 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Configure multer for file uploads
const upload = multer({ storage: multer.memoryStorage() });

// Gemini Configuration
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Model fallback strategy - exhaustive list of variants to handle 404s and 429s.
const MODEL_IDS = [
    'gemini-1.5-flash-latest',
    'gemini-1.5-flash',
    'gemini-2.0-flash-exp',
    'gemini-2.0-flash-lite-preview-02-05',
    'gemini-1.5-pro-latest',
    'gemini-1.5-flash-8b'
];

// Helper function to try multiple models
async function tryGenerateContent(prompt, imageData = null) {
    let lastError = null;

    for (const modelId of MODEL_IDS) {
        try {
            console.log(`Trying model: ${modelId}...`);
            const model = genAI.getGenerativeModel({ model: modelId });

            let result;
            if (imageData) {
                const imagePart = {
                    inlineData: {
                        data: imageData.buffer.toString('base64'),
                        mimeType: imageData.mimetype
                    }
                };
                result = await model.generateContent([prompt, imagePart]);
            } else {
                result = await model.generateContent(prompt);
            }

            const response = await result.response;
            const text = response.text();

            if (text && text.trim().length > 0) {
                console.log(`✅ Success! Used ${modelId}`);
                return text;
            }
            throw new Error('Empty response from AI');
        } catch (error) {
            const errorMsg = error.message || '';
            console.log(`Failed ${modelId}: ${errorMsg.substring(0, 100)}...`);
            lastError = error;

            // If it's a 404, 429, or quota error, try next model
            if (errorMsg.includes('404') || errorMsg.includes('429') || errorMsg.toLowerCase().includes('quota')) {
                continue;
            }
            // For other critical errors, stop trying
            break;
        }
    }

    throw lastError;
}

// Robust JSON parse helper
function parseGeminiResponse(text) {
    try {
        // Remove markdown code blocks if present
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        const cleanJson = jsonMatch ? jsonMatch[0] : text;
        return JSON.parse(cleanJson);
    } catch (e) {
        console.error('JSON Parse Error:', e);
        console.error('Raw content:', text);
        throw new Error('Failed to parse AI response as JSON');
    }
}

// Routes
app.get('/', (req, res) => {
    res.json({ message: 'Style AI API is running with Express.js and Gemini' });
});

app.get('/trending/:gender', (req, res) => {
    const { gender } = req.params;

    const maleItems = [
        { id: 1, name: "Classic Navy Suit", type: "Formal", image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500&h=600&fit=crop" },
        { id: 2, name: "Beige Chinos", type: "Casual", image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500&h=600&fit=crop" },
        { id: 3, name: "Leather Biker Jacket", type: "Streetwear", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=600&fit=crop" },
        { id: 4, name: "White Oxford Shirt", type: "Smart Casual", image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&h=600&fit=crop" },
        { id: 5, name: "Dark Denim Jeans", type: "Casual", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=600&fit=crop" },
        { id: 6, name: "Bomber Jacket", type: "Streetwear", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&h=600&fit=crop" }
    ];

    const femaleItems = [
        { id: 1, name: "Silk Wrap Dress", type: "Formal", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=600&fit=crop" },
        { id: 2, name: "High-Waist Trousers", type: "Chic", image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=600&fit=crop" },
        { id: 3, name: "Knitted Co-ord Set", type: "Comfort", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&h=600&fit=crop" },
        { id: 4, name: "Floral Maxi Dress", type: "Casual", image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&h=600&fit=crop" },
        { id: 5, name: "Blazer & Jeans", type: "Smart Casual", image: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=500&h=600&fit=crop" },
        { id: 6, name: "Leather Trench Coat", type: "Chic", image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=500&h=600&fit=crop" }
    ];

    res.json(gender.toLowerCase() === 'male' ? maleItems : femaleItems);
});

app.post('/recommend/text', async (req, res) => {
    try {
        const { gender, style_preference, occasion, size } = req.body;

        const prompt = `Act as a professional fashion stylist. Provide a structured 3-piece outfit recommendation for a ${gender} 
based on these preferences:
Style: ${style_preference || 'General'}
Occasion: ${occasion || 'General'}
Size: ${size || 'Normal'}

Return the response in STRICT JSON format:
{
    "outfit": [
        {"item": "item_name", "description": "brief description"},
        {"item": "item_name", "description": "brief description"},
        {"item": "item_name", "description": "brief description"}
    ],
    "styling_tips": "A short summary of why this works."
}`;

        const responseText = await tryGenerateContent(prompt);
        const data = parseGeminiResponse(responseText);

        // Add dynamic image URLs
        if (data.outfit) {
            data.outfit.forEach(item => {
                item.image = `https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500&h=600&fit=crop&q=80&fashion,${item.item.replace(/ /g, ',')}`;
            });
        }

        res.json(data);
    } catch (error) {
        console.error('Error in recommend_text:', error);

        if (error.message.includes('429') || error.message.includes('quota')) {
            return res.status(429).json({
                detail: 'Your Gemini API quota is zero. Please check your account limits at aistudio.google.com.'
            });
        }

        res.status(500).json({ detail: `AI Error: ${error.message}` });
    }
});

app.post('/recommend/image', upload.single('file'), async (req, res) => {
    try {
        const { gender } = req.body;
        const file = req.file;

        if (!file) {
            return res.status(400).json({ detail: 'No file uploaded' });
        }

        const prompt = `Analyze this image of a clothing item or a person. Suggest 2-3 complementary items to complete the outfit 
for a ${gender}. 
Return the response in STRICT JSON format:
{
    "analysis": "Brief description of what you see.",
    "recommendations": [
        {"item": "item_name", "description": "why it matches"},
        {"item": "item_name", "description": "why it matches"}
    ],
    "styling_tips": "Overall advice."
}`;

        const responseText = await tryGenerateContent(prompt, file);
        const data = parseGeminiResponse(responseText);

        // Add dynamic image URLs
        if (data.recommendations) {
            data.recommendations.forEach(item => {
                item.image = `https://images.unsplash.com/photo-1445205170230-053b83016050?w=500&h=600&fit=crop&q=80&${item.item.replace(/ /g, ',')}`;
            });
        }

        res.json(data);
    } catch (error) {
        console.error('Error in recommend_image:', error);

        if (error.message.includes('429') || error.message.includes('quota')) {
            return res.status(429).json({
                detail: 'Your Gemini API quota is zero. Please check your account limits at aistudio.google.com.'
            });
        }

        res.status(500).json({ detail: `AI Error: ${error.message}` });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`✅ Style AI Express server running on http://localhost:${PORT}`);
    console.log(`📊 Trending endpoint: http://localhost:${PORT}/trending/Male`);
    console.log(`🤖 AI Models available: ${MODEL_IDS.join(', ')}`);
});
