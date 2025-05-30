import React, { useState, useRef, useEffect, useContext } from 'react';
import { Send, Bot, User, TrendingUp, DollarSign, PieChart, BarChart3 } from 'lucide-react';
import { UserContext } from '@/context/userContext';

const SpendlyAI = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: "Hello! I'm your personal finance AI assistant SpendlyAI. I can help you analyze your spending patterns, income trends, and provide insights to improve your financial health. What would you like to know about your finances?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [financialData, setFinancialData] = useState(null);
  const messagesEndRef = useRef(null);
  const { user } = useContext(UserContext);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    fetchFinancialData();
  }, []);

  const fetchFinancialData = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      const [dashboardResponse, incomeResponse, expenseResponse] = await Promise.all([
        fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/dashboard`, { headers }),
        fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/income/get`, { headers }),
        fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/expense/get`, { headers })
      ]);

      const dashboardData = await dashboardResponse.json();
      const incomeData = await incomeResponse.json();
      const expenseData = await expenseResponse.json();

      setFinancialData({
        dashboard: dashboardData.data || dashboardData,
        income: incomeData.data || incomeData,
        expenses: expenseData.data || expenseData
      });
    } catch (error) {
      console.error('Error fetching financial data:', error);
      setFinancialData({
        dashboard: { totalBalance: 0, totalIncome: 0, totalExpenses: 0, recentTransactions: [] },
        income: [],
        expenses: []
      });
    }
  };

  const generateFinancialPrompt = (userMessage) => {
    if (!financialData) return userMessage;

    const dashboard = financialData.dashboard || {};
    const income = financialData.income || [];
    const expenses = financialData.expenses || [];

    const totalIncome = Array.isArray(income) ? income.reduce((sum, item) => sum + (item.amount || 0), 0) : 0;
    const totalExpenses = Array.isArray(expenses) ? expenses.reduce((sum, item) => sum + (item.amount || 0), 0) : 0;
    const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome * 100).toFixed(1) : 0;

    const recentIncome = Array.isArray(income) ? income.slice(-3) : [];
    const recentExpenses = Array.isArray(expenses) ? expenses.slice(-3) : [];

    const expenseCategories = {};
    if (Array.isArray(expenses)) {
      expenses.forEach(expense => {
        const category = expense.category || expense.type || 'Miscellaneous';
        expenseCategories[category] = (expenseCategories[category] || 0) + (expense.amount || 0);
      });
    }

    const context = `
    User Financial Data Analysis:
    
    FINANCIAL OVERVIEW:
    - Current Balance: ₹${dashboard.totalBalance || 0}
    - Total Income: ₹${totalIncome}
    - Total Expenses: ₹${totalExpenses}
    - Savings Rate: ${savingsRate}%
    - Net Cash Flow: ₹${totalIncome - totalExpenses}
    
    RECENT INCOME (Last 3):
    ${recentIncome.map(item => `- ${item.description || item.source || 'Income'}: ₹${item.amount} (${item.date || 'Recent'})`).join('\n') || '- No recent income recorded'}
    
    RECENT EXPENSES (Last 3):
    ${recentExpenses.map(item => `- ${item.description || item.name || 'Expense'}: ₹${item.amount} (${item.date || 'Recent'})`).join('\n') || '- No recent expenses recorded'}
    
    EXPENSE BREAKDOWN BY CATEGORY:
    ${Object.entries(expenseCategories).map(([category, amount]) => `- ${category}: ₹${amount}`).join('\n') || '- No expense categories available'}
    
    USER QUESTION: ${userMessage}
    
    Please provide personalized, actionable financial advice based on this specific data. Be encouraging but realistic. Focus on practical steps the user can take to improve their financial health.
    `;
    
    return context;
  };

  const sendMessageToGroq = async (message) => {
    try {
      
      const apiKey = import.meta.env.VITE_GROQ_API_KEY;
      
      if (!apiKey) {
        throw new Error('Groq API key not found. Please add VITE_GROQ_API_KEY to your .env file');
      }

      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'system',
              content: 'You are SpendlyAI, a professional financial advisor assistant. Provide clear, actionable financial advice based on user data. Be encouraging but realistic. Focus on practical tips for budgeting, saving, and financial planning. Keep responses concise and helpful.'
            },
            {
              role: 'user',
              content: generateFinancialPrompt(message)
            }
          ],
          model: 'llama3-8b-8192', 
          temperature: 0.7,
          max_tokens: 1000,
          top_p: 1,
          stream: false
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Groq API Error:', errorData);
        throw new Error(`Groq API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Error calling Groq API:', error);
      
     
      if (error.message.includes('API key')) {
        return "⚠️ API configuration issue. Please check your  API key setup.";
      } else if (error.message.includes('401')) {
        return "🔑 Authentication failed. Please verify your Groq API key is valid and has sufficient credits.";
      } else if (error.message.includes('429')) {
        return "⏰ Rate limit exceeded. Please wait a moment before trying again.";
      } else {
        return "I'm sorry, I'm having trouble connecting to analyze your finances right now. Please try again later.";
      }
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const aiResponse = await sendMessageToGroq(inputMessage);
      
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: aiResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: "I apologize, but I'm having trouble processing your request right now. Please try again.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!isLoading && inputMessage.trim()) {
        handleSendMessage();
      }
    }
  };

  const quickActions = [
    {
      icon: TrendingUp,
      text: "Analyze my spending trends",
      prompt: "Can you analyze my spending trends and tell me where I'm spending the most money?"
    },
    {
      icon: DollarSign,
      text: "Budget recommendations",
      prompt: "Based on my income and expenses, what budget recommendations do you have for me?"
    },
    {
      icon: PieChart,
      text: "Savings advice",
      prompt: "How can I improve my savings based on my current financial situation?"
    },
    {
      icon: BarChart3,
      text: "Financial goals",
      prompt: "Help me set realistic financial goals based on my current income and expenses."
    }
  ];

  const handleQuickAction = (prompt) => {
    setInputMessage(prompt);
  };

  return(
  <div className="flex flex-col h-[calc(100vh-120px)] bg-white dark:bg-gray-900 rounded-lg shadow-lg">

      <div className="flex items-center gap-3 p-4 border-b dark:border-gray-700 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
        <Bot className="w-6 h-6 md:w-8 md:h-8" />
        <div>
          <h2 className="text-lg md:text-xl font-semibold">SpendlyAI</h2>
          <p className="text-xs md:text-sm opacity-90">Your Personal Finance Assistant</p>
        </div>
      </div>

      {messages.length <= 1 && (
        <div className="p-3 md:p-4 border-b dark:border-gray-700">
          <h3 className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 md:mb-3">Quick Actions:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => handleQuickAction(action.prompt)}
                className="flex items-center gap-2 p-2 text-left border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <action.icon className="w-4 h-4 md:w-5 md:h-5 text-green-500" />
                <span className="text-xs md:text-sm dark:text-gray-300">{action.text}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-2 md:gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.type === 'ai' && (
              <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </div>
            )}
            
            <div
              className={`max-w-[90%] md:max-w-[80%] p-2 md:p-3 rounded-lg ${
                message.type === 'user'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
              }`}
            >
              <p className="text-xs md:text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
              <p className="text-[10px] md:text-xs opacity-70 mt-1 md:mt-2">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>

            {message.type === 'user' && (
              <div className="w-6 h-6 md:w-8 md:h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-2 md:gap-3 justify-start">
            <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Bot className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-2 md:p-3 rounded-lg">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="p-3 md:p-4 border-t dark:border-gray-700">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me about your finances..."
            className="flex-1 p-2 md:p-3 text-xs md:text-sm border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100"
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading || !inputMessage.trim()}
            className="px-3 py-2 md:px-4 md:py-3 bg-green-500 text-white rounded-lg hover:bg-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>
        <p className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400 mt-1 md:mt-2 text-center">
          Press Enter to send, Shift+Enter for new line
        </p>
      </div>
    </div>
  );
};


export default SpendlyAI;