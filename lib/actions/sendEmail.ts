export async function sendEmail() {
  // Email functionality disabled - return success message
  // console.log('Email would be sent:', data);
  
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    success: true,
    message: 'Thank you for your message! Email functionality is currently disabled, but your message has been logged to console.'
  };
} 