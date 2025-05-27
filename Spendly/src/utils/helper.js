import moment from "moment";


export const validateEmail = (email) => {

  if (!email || typeof email !== 'string') {
    return false;
  }
  
  email = email.trim();
  
  const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
  if (!regex.test(email)) {
    return false;
  }
  
  const parts = email.split('@');
  if (parts.length !== 2) {
    return false;
  }
  
  const domain = parts[1];
  if (domain.indexOf('.') === -1 || domain.endsWith('.')) {
    return false;
  }
  
  return true;
};

export const validatePassword = (password) => {
  if (!password || typeof password !== 'string') {
    return {
      isValid: false,
      checks: {
        length: false,
        uppercase: false,
        number: false,
        specialChar: false
      }
    };
  }

  const checks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    number: /\d/.test(password),
    specialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
  };

  return {
    isValid: checks.length && checks.uppercase && checks.number && checks.specialChar,
    checks
  };
};

export const getInitials = (name) => {
  if(!name) return "";

  const words = name.split("");
  let initials ="";

  for(let i=0 ; i< Math.min(words.length,2) ; i++){
    initials += words[i][0];
  }
  return initials.toUpperCase();
};

export const addThousandsSeparator = (num) => {

  if (typeof num !== "number" || isNaN(num) || !isFinite(num)) return "";

  const [integerPart, fractionalPart] = num.toString().split(".");
  
  const sign = integerPart.startsWith("-") ? "-" : "";
  const absoluteInteger = integerPart.replace("-", "");
  
  const formattedInteger = absoluteInteger.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  
  return fractionalPart 
    ? `${sign}${formattedInteger}.${fractionalPart}` 
    : `${sign}${formattedInteger}`;
};

export const prepareExpenseBarChartData = (data = []) => {
  const chartData = data.map((item) => ({
    category: item?.category,
    amount : item?.amount,
  }));

  return chartData;
};

export const prepareIncomeBarChartData = (data = []) => {
  const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date)); 

  const chartData = sortedData.map((item) => ({
    month: moment(item?.date).format("Do MMM"), 
    amount: item?.amount,
    source: item?.source
  }));
  return chartData;
};

export const prepareExpenseLineChartData = (data = []) => {
  const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date)); 
    const chartData = sortedData.map((item) => ({
    month: moment(item?.date).format("Do MMM"), 
    amount: item?.amount,
    category: item?.category
  }));
  return chartData;
} 