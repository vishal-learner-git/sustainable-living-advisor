export const analyzeSustainability = (data) => {
    let score = 0;
    let maxScore = 0;
    const observations = [];
    const recommendations = [];
    let impactExplanation = "";

    // Helper to add points
    const addScore = (points, max) => {
        score += points;
        maxScore += max;
    };

    // 1. Electricity Analysis
    // Assumptions: Fan ~75W, Lights ~10W, AC ~1500W
    const { electricity } = data;
    const acHours = parseFloat(electricity.acHours) || 0;
    const lightHours = parseFloat(electricity.lightHours) || 0;
    const fanHours = parseFloat(electricity.fanHours) || 0;

    if (acHours === 0) {
        addScore(20, 20);
        observations.push("Excellent! Avoiding AC significantly reduces your carbon footprint.");
    } else if (acHours < 4) {
        addScore(10, 20);
        observations.push("Moderate AC usage.");
        recommendations.push("Try to use AC only when necessary and set the temperature to 24°C or higher to save energy.");
    } else {
        addScore(0, 20);
        observations.push("High AC usage detected, which is a major contributor to greenhouse gas emissions.");
        recommendations.push("Limit AC usage. Use fans and natural ventilation (open windows) during cooler parts of the day.");
    }

    if (fanHours > 12) {
        // Just a note, fans are efficient but high usage still counts
    }

    // Lights - encouraging LED and natural light logic not fully capturable but hours count
    if (lightHours > 10) {
        recommendations.push("Consider using natural light during the day or switching to motion-sensor LEDs.");
    }

    // 2. Water Usage Analysis
    const { water } = data;
    if (water.bathingDuration === 'Bucket Bath' || water.bathingDuration === '< 5 minutes') {
        addScore(20, 20);
        observations.push("Using a bucket or quick showers is a great water-saving habit.");
    } else if (water.bathingDuration === '10-15 minutes') {
        addScore(10, 20);
        observations.push("Average water consumption for bathing.");
        recommendations.push("Try to reduce shower time by 2-3 minutes or switch to a bucket.");
    } else {
        addScore(0, 20); // Long showers
        observations.push("Long showers consume huge amounts of treated water.");
        recommendations.push("Avoid long showers. A 5-minute shower is a good target.");
    }

    if (water.wastage === 'yes') {
        score -= 5;
        observations.push("Water wastage reported (leaks or running taps).");
        recommendations.push("Fix leaky taps immediately; a drop a second wastes thousands of liters a year. Turn off taps while brushing.");
    }

    // 3. Food Habits
    const { food } = data;
    if (food.diet === 'Vegan' || food.diet === 'Vegetarian') {
        addScore(20, 20);
        observations.push("Plant-based diets have a significantly lower carbon footprint.");
    } else if (food.diet.includes('Mixed')) {
        addScore(10, 20);
        observations.push("Mixed diet has a moderate footprint.");
    } else {
        addScore(5, 20); // Heavy meat
        observations.push("Heavy meat consumption has a high environmental impact.");
        recommendations.push("Try 'Meatless Mondays' or reducing meat consumption to weekends only.");
    }

    if (food.wastage === 'Moderate wastage' || food.wastage === 'High wastage') {
        score -= 5;
        recommendations.push("Plan meals to avoid food waste. Compost organic scraps if possible.");
    }

    // 4. Transportation
    const { transport } = data;
    const distance = parseFloat(transport.distance) || 0;

    if (transport.mode.includes('Walking')) {
        addScore(20, 20);
        observations.push("Zero-emission transport! You are a eco-champion.");
    } else if (transport.mode.includes('Public')) {
        addScore(15, 20);
        observations.push("Using public transport significantly reduces per-capita emissions.");
    } else if (transport.mode === 'Carpool') {
        addScore(10, 20);
    } else if (transport.mode === 'Electric Vehicle') {
        addScore(15, 20);
        observations.push("EVs significantly reduce tailpipe emissions compared to fossil fuel cars.");
    } else if (transport.mode === 'Bike') {
        addScore(5, 20);
    } else {
        // Car
        if (distance > 30) {
            addScore(0, 20);
            recommendations.push("Your daily car travel is high. Consider carpooling or hybrid work options.");
        } else {
            addScore(5, 20);
        }
    }

    // Calculate Final Results
    const percentage = Math.round((score / maxScore) * 100);
    let sustainabilityLevel = "Medium";
    if (percentage >= 80) sustainabilityLevel = "High";
    if (percentage < 50) sustainabilityLevel = "Low";

    // Generic backup recommendations if few are triggered
    if (recommendations.length < 5) {
        const backups = [
            "Use reusable bags and bottles to reduce plastic waste.",
            "Unplug electronics when not in use to stop 'vampire' energy drain.",
            "Buy local and seasonal produce to cut down on food miles.",
            "Practice the 3 Rs: Reduce, Reuse, Recycle.",
            "Plant a tree or maintain a small home garden for better air quality."
        ];
        // Add unique backups
        for (const tip of backups) {
            if (recommendations.length >= 5) break;
            if (!recommendations.includes(tip)) recommendations.push(tip);
        }
    }

    // Impact Explanation
    impactExplanation = `Your habits result in a sustainability score of ${percentage}%. ` +
        (percentage > 70
            ? "You are living largely within planetary boundaries. Your low resource consumption helps preserve clear air and water for future generations."
            : `There is room for improvement. Small changes in your daily routine, especially in ${acHours > 2 ? 'energy' : 'transport/food'}, can collectively save tons of CO2 and liters of water annually.`);

    return {
        level: sustainabilityLevel,
        score: percentage,
        observations,
        recommendations: recommendations.slice(0, 5),
        impactExplanation
    };
};
