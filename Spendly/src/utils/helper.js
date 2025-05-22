
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