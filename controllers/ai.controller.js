
const aiService = require('../services/ai.service');

async function generateDecisions(req, res){
  try {
    const { name, age, job, income, occupation, goals, currentMoney, hobbies, previousSummary } = req.body;

    const prompt=`
    Player Information:
    
    Name: ${name}
    Age: ${age}
    Occupation: ${occupation}  
    Goals: ${goals}
    Current Money: ${currentMoney}
    Hobbies: ${hobbies}
    income: ${income}
    job: ${job}
    
    Previous Rounds Summary: ${previousSummary? previousSummary : 'No previous summary available.'}
    
    Instructions:
    You are an AI scenario generator for a financial literacy choose-your-own-adventure game. Based on the player's information and the outcomes of previous rounds, generate a new scenario where the player faces a fresh financial decision. The scenario should be concise (1-3 sentences) and tailored to the player's context.
    
    For the new scenario, provide exactly two choices. Each choice must include:
    Label: A short title for the choice (e.g., "Invest in Stock", "Buy a New Phone").
    Description: A brief 1-2 sentence explanation of what the choice involves.
    Score: A numeric value between -1 and 1 indicating how this choice will affect the player's money (negative means a loss, positive means a gain).
    Explanation: A short explanation of why this choice has the stated impact on the player's finances.
    
    Output the response in the following JSON format:
    
    {
      "scenario": "Text describing the new situation.",
      "choices": [
        {
          "label": "Option 1 Label",
          "description": "Description of option 1.",
          "score": 0.0,
          "explanation": "Explanation for option 1."
        },
        {
          "label": "Option 2 Label",
          "description": "Description of option 2.",
          "score": 0.0,
          "explanation": "Explanation for option 2."
        }
      ]
    `
    
    const result = await aiService.runGeminiPrompt(prompt);
   // console.log(result);
   res.status(200).send(result);
} catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate response' });
  }
}

async function generateSummary(req, res) {
    const { name, age, job, income, occupation, goals, currentMoney, hobbies, decisions } = req.body;

    const decisionSummary = decisions.map((decision) => {
        return `Decision: ${decision.label}, Description: ${decision.description}, Score: ${decision.score}, Explanation: ${decision.explanation}`;
    }).join('\n');

    const prompt =`
    Player Information:
    
    Name: ${name}
    Age: ${age}
    Occupation: ${occupation}  
    Goals: ${goals}
    Current Money: ${currentMoney}
    Hobbies: ${hobbies}
    income: ${income}
    job: ${job}
    
    
    Decisions: ${decisionSummary}
    
    Instructions:
    You are an AI financial advisor. Based on the player's information and the decisions they made, generate a summary of the round. The summary should include:
    - A brief overview of the player's situation and decisions.
    - A summary of the impact of each decision on the player's finances.
    - Any additional advice or insights for the player.
    `
    const result = await aiService.runGeminiPrompt(prompt);
    res.status(200).send(result);
}

module.exports = {
    generateDecisions,
    generateSummary
};