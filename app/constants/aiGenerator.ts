export const REJECTION_REASONS = [
  'Position filled',
  'Not a fit for company culture',
  'Insufficient experience',
  'Skills mismatch',
  'Budget constraints',
  'Overqualified',
  'Location requirements',
  'Timeline mismatch'
] as const;

export const TONE_OPTIONS = [
  {
    id: 'professional',
    label: 'Professional',
    color: 'bg-blue-100 text-blue-800'
  },
  {
    id: 'friendly',
    label: 'Friendly',
    color: 'bg-green-100 text-green-800'
  },
  {
    id: 'empathetic',
    label: 'Empathetic',
    color: 'bg-purple-100 text-purple-800'
  }
] as const;

export const LENGTH_OPTIONS = [
  { id: 'brief', label: 'Brief' },
  { id: 'standard', label: 'Standard' },
  { id: 'detailed', label: 'Detailed' }
] as const;


export const EMAIL_TEMPLATES = {
  professional: {
    brief: (data: any) => `Dear ${data.candidateName},

Thank you for your interest in the ${data.position} position at ${data.companyName}. After careful consideration, we have decided to move forward with other candidates.

We appreciate the time you invested in our process.

Best regards,
Hiring Team`,
    standard: (data: any) => `Dear ${data.candidateName},

Thank you for taking the time to apply for the ${data.position} position at ${data.companyName}. We were impressed by your background and experience.

After thorough consideration, we have decided to proceed with candidates whose experience more closely aligns with our current needs. Specifically, ${data.reason.toLowerCase()}.

We encourage you to apply for future opportunities that match your qualifications.

Best wishes,
Hiring Team`,
    detailed: (data: any) => `Dear ${data.candidateName},

I hope this message finds you well. I wanted to personally reach out regarding your application for the ${data.position} position at ${data.companyName}.

First, I want to express our sincere appreciation for the time and effort you put into your application and interview process. Your qualifications and enthusiasm were evident throughout our interactions.

After careful deliberation with our team, we have decided to move forward with a candidate whose experience more closely matches our specific requirements. The primary factor in our decision was ${data.reason.toLowerCase()}.

Please know that this decision was not easy, and we were genuinely impressed by your professional accomplishments. We will keep your information on file and encourage you to apply for future positions that align with your expertise.

Thank you again for your interest in ${data.companyName}. We wish you the very best in your career journey.

Warm regards,
Hiring Team`
  },
  friendly: {
    brief: (data: any) => `Hi ${data.candidateName}! 👋

Thanks so much for applying to our ${data.position} role at ${data.companyName}! While we enjoyed learning about your background, we've decided to go with another candidate.

We really appreciate your time and interest!

Cheers,
The Team`,
    standard: (data: any) => `Hi ${data.candidateName}! 👋

I hope you're doing well! I wanted to reach out about your application for the ${data.position} position with us at ${data.companyName}.

We were really impressed with your experience and enjoyed our conversations. Unfortunately, we've decided to move forward with someone else, primarily due to ${data.reason.toLowerCase()}.

Please don't let this discourage you - you have great skills! We'd love to see you apply for other roles that might be a better fit.

Thanks again for your interest!

Best,
The Hiring Team`,
    detailed: (data: any) => `Hi ${data.candidateName}! 👋

I hope this message finds you well! I wanted to personally follow up on your application for the ${data.position} position at ${data.companyName}.

First off, thank you for the time you invested in getting to know us and sharing your story. We genuinely enjoyed our conversations and were impressed by your passion and experience.

After much consideration (and honestly, some tough discussions), we've decided to move forward with another candidate. The main factor was ${data.reason.toLowerCase()}, which doesn't reflect on your abilities at all!

We think you're talented and would be a great fit somewhere amazing. We'll definitely keep you in mind for future opportunities that align better with your strengths.

Thanks again for considering ${data.companyName} - it means a lot to us!

Wishing you all the best,
The Hiring Team ✨`
  },
  empathetic: {
    brief: (data: any) => `Dear ${data.candidateName},

I understand how much effort goes into job searching, and I want to personally thank you for considering ${data.companyName} for the ${data.position} role.

While we won't be moving forward together, I hope you find the perfect opportunity soon.

With appreciation,
Hiring Team`,
    standard: (data: any) => `Dear ${data.candidateName},

I know how much time and energy you've invested in the application process, and I want to personally reach out about your candidacy for the ${data.position} position at ${data.companyName}.

While we were impressed by your qualifications, we've decided to proceed with another candidate, largely due to ${data.reason.toLowerCase()}. I understand how disappointing this news can be.

Please know that this decision doesn't diminish your value as a professional. The right opportunity is out there for you.

I wish you success in your continued search.

Warmly,
Hiring Team`,
    detailed: (data: any) => `Dear ${data.candidateName},

I hope you're doing well. I wanted to take a moment to personally address your application for the ${data.position} position at ${data.companyName}.

I recognize that behind every application is someone who has hopes, dreams, and career aspirations. Your dedication to pursuing this role with us was evident, and I want you to know that we truly appreciate the time and effort you invested in getting to know our company.

After careful consideration, we have decided to move forward with another candidate. This decision was primarily influenced by ${data.reason.toLowerCase()}. I want to emphasize that this choice reflects our specific needs at this moment, not your worth as a professional.

Job searching can be challenging and emotionally taxing. Please don't let this setback discourage you. Your skills and experience have value, and I'm confident that the right opportunity will come your way.

We will keep your information on file and would be happy to consider you for future positions that better align with your background.

Thank you once again for your interest in joining our team. I genuinely wish you the very best in your career journey.

With sincere regards,
Hiring Team`
  }
};