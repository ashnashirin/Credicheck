import { TRUSTED_PLATFORMS, GENERIC_EMAIL_DOMAINS, RED_FLAG_KEYWORDS, FAKE_AUTHORITY_KEYWORDS } from './scoringRules.js';

export function calculateScore(companyName, internshipLink, description = '') {
  let score = 50;
  const reasons = [];

  const lowerLink = internshipLink.toLowerCase();
  const lowerDesc = description.toLowerCase();
  const lowerCompany = companyName.toLowerCase();

  // Positive signals
  TRUSTED_PLATFORMS.forEach(platform => {
    if (lowerLink.includes(platform)) {
      score += 10;
      reasons.push(`Listed on trusted platform: ${platform}`);
    }
  });

  if (lowerLink.includes(lowerCompany.replace(/\s/g, ''))) {
    score += 10;
    reasons.push('Company name matches domain in link');
  }

  // Red flags
  RED_FLAG_KEYWORDS.forEach(flag => {
    if (lowerLink.includes(flag) || lowerDesc.includes(flag)) {
      score -= 15;
      reasons.push(`Red flag detected: "${flag}"`);
    }
  });

  GENERIC_EMAIL_DOMAINS.forEach(domain => {
    if (lowerDesc.includes(`@${domain}`)) {
      score -= 10;
      reasons.push(`Generic email used: ${domain}`);
    }
  });

  FAKE_AUTHORITY_KEYWORDS.forEach(keyword => {
    if (lowerDesc.includes(keyword)) {
      score -= 15;
      reasons.push(`Suspicious authority claim: "${keyword}"`);
    }
  });

  score = Math.max(0, Math.min(100, score));

  let label = 'Caution';
  if (score >= 75) label = 'Safe';
  else if (score < 45) label = 'Risky';

  return { score, label, reasons };
}
