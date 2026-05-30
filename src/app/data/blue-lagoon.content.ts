/**
 * Blue Lagoon — hospitality house content, ported from the Sleight & Co. bureau
 * (SLEIGHTCOWEB/src/houses.ts, slug `blue-lagoon`). Single source of truth for
 * the narrative sections so the standalone site and the bureau stay aligned.
 */

export interface FunnelStage {
  name: string;
  customer: string;
  move: string;
}

export interface Lever {
  title: string;
  text: string;
}

export interface Metric {
  label: string;
  caption: string;
}

export interface Faq {
  q: string;
  a: string;
}

/** Hero headline word-rotator — the last word cycles. */
export const heroWords = ['direct', 'again', 'by name', 'in season'];

export const promise =
  'A property that travels. Guests find you, feel the place before they arrive, and book you direct.';

export const clientTypes = ['Boutique hotels', 'Beach resorts', 'Mountain retreats', 'City hotels'];

export const problem = {
  lead: 'Most properties hand their best guests, and 15 to 25% of the rate, to the booking platforms — then start every relationship from zero.',
  points: [
    'The OTA owns the guest data and the next booking.',
    'The site looks the part but doesn’t close the direct reservation.',
    'Demand is seasonal, and nobody is warming the next one.',
  ],
};

export const howItWorks =
  'You get a brand, a website, and content that sell the stay, plus the ads and the booking path that bring travellers to book direct. An AI assistant answers enquiries day and night and follows up before and after the stay, so more of each booking’s value stays with you and more guests come back.';

export const funnel: FunnelStage[] = [
  {
    name: 'Discover',
    customer: 'A traveller in a feeder market first sees the property.',
    move: 'Targeted demand and the property film put you in front of the right markets, by season.',
  },
  {
    name: 'Dream',
    customer: 'They picture the stay — the rooms, the light, the ritual.',
    move: 'A site and content that sell the experience, with retargeting that keeps you in mind.',
  },
  {
    name: 'Decide',
    customer: 'They weigh booking direct against the OTA.',
    move: 'A direct offer and an assistant that answers in seconds tip the choice your way.',
  },
  {
    name: 'Book',
    customer: 'They commit to the dates.',
    move: 'A booking path with no friction, and no reason to leave for a third party.',
  },
  {
    name: 'Return',
    customer: 'The stay ends.',
    move: 'Automated follow-up, a reason to come back, and a guest who refers the next one.',
  },
];

export const aiAngle = {
  headline: 'AI that fills rooms quietly.',
  text: 'We wire AI into the booking path and the follow-up, so enquiries get answered in seconds and guests get a reason to come back, without adding headcount.',
};

export const engineNarrative =
  'We put your property in front of travellers in the markets that actually fill your rooms, then keep them warm with content and retargeting until they book you direct instead of a booking site. A multilingual assistant answers questions in seconds and recovers bookings people start but don’t finish, and after the stay, automated follow-up gives past guests a reason to come back and refer the next one.';

export const engineSteps = [
  'Run feeder-market demand',
  'Capture the enquiry',
  'Answer in seconds, any language',
  'Book direct, no friction',
  'Follow up and bring them back',
];

export const levers: Lever[] = [
  {
    title: 'Brand & identity',
    text: 'A destination identity that reads in any market: name, voice, and a visual world guests want to belong to.',
  },
  {
    title: 'Content & production',
    text: 'Film and photography of the rooms, the light, the ritual of the stay. The frames guests save and send to a friend.',
  },
  {
    title: 'Advertising',
    text: 'Meta, Google, and Pinterest aimed at your feeder markets, plus Google Hotel Ads on metasearch where intent runs highest.',
  },
  {
    title: 'AI & automation',
    text: 'A multilingual assistant that answers enquiries in seconds, recovers abandoned bookings, and follows up before and after the stay.',
  },
  {
    title: 'Strategy',
    text: 'A direct-booking engine that wins share back from the OTAs and protects your rate.',
  },
];

export const channels = 'Meta · Google · Google Hotel Ads · Pinterest · YouTube';

export const metrics: Metric[] = [
  { label: 'Direct-booking share', caption: 'Revenue you keep instead of paying away.' },
  { label: 'Cost per booked night', caption: 'What demand actually costs to create.' },
  { label: 'Repeat & referral rate', caption: 'Guests who come back and bring others.' },
];

export const faqs: Faq[] = [
  {
    q: 'Will this reduce how much we depend on Booking.com and Expedia?',
    a: 'That’s the goal. We build a direct-booking path and the demand to feed it, so more of each stay’s value stays with you instead of going to the platforms.',
  },
  {
    q: 'We’re seasonal. Can the campaigns follow our calendar?',
    a: 'Yes. We plan demand by season and feeder market, pushing the right dates to the right places before they sell out elsewhere.',
  },
  {
    q: 'Do you handle the photography and film?',
    a: 'We can. Property film and stills that sell the experience are usually the fastest lever, so we plan them in when they earn their place.',
  },
  {
    q: 'How quickly do direct bookings start to move?',
    a: 'The site and booking path go live in weeks. The demand and the repeat-guest engine compound over the months after.',
  },
];

export const cta = {
  title: 'Fill the calendar, on your terms.',
  text: 'Tell us the property and the markets you want. We come back with the brand, the content, and the booking plan.',
};
