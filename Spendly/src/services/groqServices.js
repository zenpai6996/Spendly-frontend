// services/groqService.js

class GroqService {
  constructor() {
    this.apiKey = import.meta.env.GROQ_API_KEY;
    this.baseURL = 'https://api.groq.com/openai/v1/chat/completions';
  }

  async generateFinancialInsights(financialData, userQuery = '') {
    const systemPrompt = `You are a professional financial advisor AI called SpendlyAI assistant specializing in personal finance management. 
    
    Your role is to:
    - Analyze financial data and provide actionable insights
    - Offer practical budgeting and savings advice
    - Identify spending patterns and trends
    - Suggest ways to optimize financial health
    - Be encouraging yet realistic in your recommendations
    
    Always provide specific, actionable advice based on the user's actual financial data.`;

    const userPrompt = this.buildFinancialPrompt(financialData, userQuery);

    try {
      const response = await fetch(this.baseURL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          model: 'llama3-8b-8192',
          temperature: 0.7,
          max_tokens: 600,
        }),
      });

      if (!response.ok) {
        throw new Error(`Groq API error: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Error calling Groq API:', error);
      throw new Error('Failed to generate financial insights');
    }
  }

  buildFinancialPrompt(data, userQuery) {
    const {
      totalBalance = 0,
      totalIncome = 0,
      totalExpenses = 0,
      recentTransactions = [],
      monthlyData = []
    } = data;

    const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome * 100).toFixed(1) : 0;
    const expenseRatio = totalIncome > 0 ? (totalExpenses / totalIncome * 100).toFixed(1) : 0;

    return `
Financial Summary:
- Current Balance: ₹${totalBalance.toLocaleString()}
- Total Income: ₹${totalIncome.toLocaleString()}
- Total Expenses: ₹${totalExpenses.toLocaleString()}
- Savings Rate: ${savingsRate}%
- Expense-to-Income Ratio: ${expenseRatio}%

Recent Transactions (Last 5):
${recentTransactions.slice(0, 5).map(transaction => 
  `- ${transaction.description}: ₹${transaction.amount} (${transaction.type}) - ${transaction.date}`
).join('\n')}

${userQuery ? `User Question: ${userQuery}` : 'Please provide a comprehensive financial analysis and actionable recommendations.'}

Please provide specific insights and recommendations based on this financial data.`;
  }

  async getChatResponse(messages, financialContext = null) {
    const systemPrompt = `You are SpendlyAI, a friendly and knowledgeable personal finance assistant. 
    
    Your capabilities include:
    - Analyzing spending patterns and financial health
    - Providing budgeting and savings advice
    - Explaining financial concepts in simple terms
    - Helping users set and achieve financial goals
    - Offering practical money management tips
    
    Always be helpful, encouraging, and provide actionable advice.`;

    try {
      const response = await fetch(this.baseURL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: systemPrompt },
            ...messages.map(msg => ({
              role: msg.type === 'user' ? 'user' : 'assistant',
              content: msg.content
            }))
          ],
          model: 'llama3-8b-8192',
          temperature: 0.8,
          max_tokens: 500,
        }),
      });

      if (!response.ok) {
        throw new Error(`Groq API error: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Error in chat response:', error);
      throw new Error('Failed to get chat response');
    }
  }

  getSpendingAnalysis(expenses) {
    const categories = this.categorizeExpenses(expenses);
    const topCategories = Object.entries(categories)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3);

    return {
      categories,
      topSpendingCategories: topCategories,
      totalExpenses: Object.values(categories).reduce((sum, amount) => sum + amount, 0)
    };
  }

  categorizeExpenses(expenses) {
    const categories = {};
    expenses.forEach(expense => {
      const category = expense.category || 'Miscellaneous';
      categories[category] = (categories[category] || 0) + expense.amount;
    });
    return categories;
  }

  generateBudgetRecommendations(income, expenses) {
    const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const savingsRate = ((income - totalExpenses) / income) * 100;

    let recommendations = [];

    if (savingsRate < 10) {
      recommendations.push("Consider increasing your savings rate to at least 10% of your income.");
    }

    if (savingsRate < 0) {
      recommendations.push("You're spending more than you earn. It's crucial to reduce expenses immediately.");
    }

    const needs = income * 0.5;
    const wants = income * 0.3;
    const savings = income * 0.2;

    recommendations.push(`Ideal budget allocation: Needs (₹${needs.toLocaleString()}), Wants (₹${wants.toLocaleString()}), Savings (₹${savings.toLocaleString()})`);

    return recommendations;
  }
}

export default new GroqService();