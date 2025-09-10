// Contact utility functions for WhatsApp and Email integration

export const WHATSAPP_NUMBER = "919035767307";
export const EMAIL_ADDRESS = "pitamah.techinsights@gmail.com";

// Pre-defined messages for different contexts
export const WHATSAPP_MESSAGES = {
  general: "Hi Suraj! I found your ML portfolio impressive and would like to discuss a potential project.",
  mlops: "Hi Suraj! I'm interested in your MLOps expertise and would like to discuss ML pipeline implementation.",
  architecture: "Hi Suraj! I need help with system architecture design for our platform.",
  costOptimization: "Hi Suraj! I'd like to discuss cost optimization strategies for our cloud infrastructure.",
  consulting: "Hi Suraj! I'm looking for ML/AI consulting services for my business.",
  codepitamah: "Hi Suraj! I tried your CodePitamah tool and would like to discuss custom code analysis solutions."
};

export const EMAIL_SUBJECTS = {
  general: "ML Project Inquiry",
  mlops: "MLOps Implementation Discussion",
  architecture: "System Architecture Consultation",
  costOptimization: "Cost Optimization Services",
  consulting: "ML/AI Consulting Inquiry",
  codepitamah: "CodePitamah Custom Solutions"
};

// Generate WhatsApp URL with pre-filled message
export const createWhatsAppLink = (context: keyof typeof WHATSAPP_MESSAGES = 'general'): string => {
  const message = WHATSAPP_MESSAGES[context];
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

// Generate Email link with pre-filled subject and body
export const createEmailLink = (context: keyof typeof EMAIL_SUBJECTS = 'general'): string => {
  const subject = EMAIL_SUBJECTS[context];
  const body = `Hi Suraj,\n\nI found your portfolio and would like to discuss ${context === 'general' ? 'a potential project' : 'your services'}.\n\nBest regards,`;
  return `mailto:${EMAIL_ADDRESS}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

// Open WhatsApp chat
export const openWhatsApp = (context: keyof typeof WHATSAPP_MESSAGES = 'general'): void => {
  window.open(createWhatsAppLink(context), '_blank');
};

// Open Email client
export const openEmail = (context: keyof typeof EMAIL_SUBJECTS = 'general'): void => {
  window.location.href = createEmailLink(context);
};
