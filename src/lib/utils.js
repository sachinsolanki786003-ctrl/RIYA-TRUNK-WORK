// Utility helpers for RIYA TRUNK WORK

export const OFFICIAL_PHONE = "+91 97248 32538";
export const OFFICIAL_PHONE_RAW = "919724832538";
export const OFFICIAL_WHATSAPP = "+91 97232 21997";
export const OFFICIAL_WHATSAPP_RAW = "919723221997";

/**
 * Generate a prefilled WhatsApp link
 */
export function getWhatsAppLink({ product = null, enquiryType = 'general', customMessage = '', quantity = '', variant = '', includeTrolley = false } = {}) {
  let message = '';

  if (product) {
    message = `Hello RIYA TRUNK WORK,\n\nI am interested in *${product.name}* (Category: ${product.categoryName || 'Metal Storage'}).\n` +
      `${variant ? `Surface Finish: *${variant}*\n` : ''}` +
      `${includeTrolley ? `Wheeled Trolley Base: *Yes, please include movable trolley*\n` : ''}` +
      `${quantity ? `Required Quantity: ${quantity}\n` : ''}\n` +
      `Please share:\n1. Current Price & Wholesale Rates\n2. Available Sizes & Dimensions\n3. Actual Product Photographs / Video\n4. Delivery or Shop Pickup options at Devraj Complex, Kathwada.\n\nThank you!`;
  } else if (enquiryType === 'wholesale') {
    message = `Hello RIYA TRUNK WORK (Mohanbhai Chauhan),\n\nI am contacting you regarding a *WHOLESALE / BULK ENQUIRY* for metal storage boxes, grain drums (kothi), and GI containers.\n${customMessage ? `Details: ${customMessage}\n` : ''}\nPlease share your wholesale catalog, minimum order quantities, and best trader rates.\n\nThank you.`;
  } else if (enquiryType === 'retail') {
    message = `Hello RIYA TRUNK WORK,\n\nI would like to enquire for *RETAIL / PERSONAL USE* metal storage box / grain drum.\n${customMessage ? `Requirement: ${customMessage}\n` : ''}\nPlease let me know available models and shop timings at Devraj Complex, Kathwada.\n\nThank you.`;
  } else {
    message = customMessage || `Hello RIYA TRUNK WORK,\n\nI am visiting your website and would like to know more about your metal trunks and storage products at Shop No. 6, Devraj Complex, Kathwada, Ahmedabad.\n\nThank you.`;
  }

  return `https://wa.me/${OFFICIAL_WHATSAPP_RAW}?text=${encodeURIComponent(message)}`;
}

/**
 * Direct phone call link
 */
export function getPhoneLink(phone = OFFICIAL_PHONE_RAW) {
  return `tel:+${phone.replace(/[^0-9]/g, '')}`;
}

/**
 * Combine class names conditionally
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}
