export type LegalSection = {
  title: string;
  points: string[];
};

export type LegalDocument = {
  title: string;
  updatedAt: string;
  intro: string;
  sections: LegalSection[];
  contactEmail: string;
  contactPhone: string;
};

export const privacyPolicy: LegalDocument = {
  title: 'Privacy Policy',
  updatedAt: 'June 2, 2026',
  intro:
    'We respect your privacy and only collect the information needed to create your account, process enquiries, and improve your experience on web and mobile.',
  sections: [
    {
      title: 'Information we collect',
      points: [
        'Account details such as name, email address, phone number, and password hash.',
        'Service and enquiry details you submit through login, signup, cart, enquiry, or profile flows.',
        'Basic device and usage data that helps us keep the app stable and secure.',
      ],
    },
    {
      title: 'How we use information',
      points: [
        'To create and manage your account and authenticate sign in attempts.',
        'To respond to enquiries, bookings, order requests, and support messages.',
        'To improve product recommendations, service quality, and platform reliability.',
      ],
    },
    {
      title: 'Sharing and storage',
      points: [
        'We do not sell your personal information.',
        'Your account data may be stored in our database and processed by trusted service providers that help run the app.',
        'We keep reasonable security controls in place, but no online system can be guaranteed 100% secure.',
      ],
    },
    {
      title: 'Your choices',
      points: [
        'You can update or request removal of your account details by contacting us.',
        'You can log out anytime from web or mobile.',
        'You may ask questions about data handling before continuing to use the platform.',
      ],
    },
  ],
  contactEmail: 'privacy@businesshub.com',
  contactPhone: '+91 9876 543 210',
};

export const termsAndConditions: LegalDocument = {
  title: 'Terms and Conditions',
  updatedAt: 'June 2, 2026',
  intro:
    'By using our web or mobile app, you agree to follow these terms that keep the platform fair, secure, and usable for everyone.',
  sections: [
    {
      title: 'Account rules',
      points: [
        'You are responsible for keeping your login details confidential.',
        'You must provide accurate information when creating an account or sending an enquiry.',
        'We may suspend or restrict accounts that misuse the platform or provide false information.',
      ],
    },
    {
      title: 'Acceptable use',
      points: [
        'Do not attempt to disrupt, hack, scrape, or abuse the app or backend services.',
        'Do not upload harmful content, fake bookings, or misleading business requests.',
        'Use the platform only for lawful purposes related to our products and services.',
      ],
    },
    {
      title: 'Orders and services',
      points: [
        'Product availability, pricing, and service timelines may change without prior notice.',
        'Quotes, bookings, and service confirmations are subject to operational review and availability.',
        'We may contact you to verify order or service details before fulfillment.',
      ],
    },
    {
      title: 'Liability and updates',
      points: [
        'We provide the platform and content on an as-available basis.',
        'We may update these terms from time to time and the latest version will apply once published.',
        'If you continue to use the app after an update, that means you accept the updated terms.',
      ],
    },
  ],
  contactEmail: 'legal@businesshub.com',
  contactPhone: '+91 9876 543 210',
};

