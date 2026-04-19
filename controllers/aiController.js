const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:8000';

exports.getRecommendations = async (req, res) => {
    try {
        const { preference, location, max_budget } = req.body;
        if (!preference) {
            return res.status(400).json({ message: 'Preference string is required' });
        }
        
        const response = await fetch(`${AI_SERVICE_URL}/ml/recommend`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                user_preference: preference,
                location: location || null,
                max_budget: max_budget || null
            })
        });
        
        if (!response.ok) {
            throw new Error(`AI Service returned status: ${response.status}`);
        }
        
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching recommendations from AI service', error: error.message });
    }
};

exports.predictPrice = async (req, res) => {
    try {
        const { month, dayOfWeek } = req.body;
        if (month === undefined || dayOfWeek === undefined) {
            return res.status(400).json({ message: 'Month and dayOfWeek are required' });
        }
        
        const response = await fetch(`${AI_SERVICE_URL}/ml/price-predict`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ month: Number(month), day_of_week: Number(dayOfWeek) })
        });
        
        if (!response.ok) {
            throw new Error(`AI Service returned status: ${response.status}`);
        }
        
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: 'Error predicting price from AI service', error: error.message });
    }
};
