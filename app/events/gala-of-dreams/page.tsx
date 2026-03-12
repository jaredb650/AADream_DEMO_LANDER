import EventLayout from "../EventLayout";

const BASE = process.env.NODE_ENV === "production" ? "/AADream_DEMO_LANDER" : "";

export const metadata = {
  title: "Inaugural Gala of Dreams | Asian American Dream",
  description: "Celebrating 5 years of impact at Glasshouse Chelsea, NYC. May 19, 2026.",
};

export default function EventGalaOfDreams() {
  return (
    <EventLayout
      title="Inaugural Gala of Dreams"
      date="May 19, 2026 · 6:30 PM – 11:00 PM EDT"
      tag="Gala"
      heroImage={`${BASE}/images/events/gala-of-dreams.png`}
    >
      <p>
        Join us for an evening of elegance and inspiration as Asian American Dream celebrates
        its <strong>fifth anniversary</strong> at the stunning Glasshouse Chelsea in New York City.
      </p>

      <p>
        The Inaugural Gala of Dreams is a multi-floor experience featuring a meticulously curated
        menu inspired by vibrant Asian flavors. This evening brings together industry pioneers,
        community leaders, and mission champions to celebrate milestones and empower the next
        generation of AAPI leaders.
      </p>

      <h2>Event Details</h2>

      <ul>
        <li><strong>Date:</strong> Tuesday, May 19, 2026</li>
        <li><strong>Time:</strong> 6:30 PM &ndash; 11:00 PM EDT</li>
        <li><strong>Location:</strong> Glasshouse Chelsea, 545 W 25th St, 20th Floor, New York, NY 10001</li>
        <li><strong>Dress Code:</strong> Formal evening attire (black tie optional)</li>
      </ul>

      <h2>Ticket Tiers</h2>

      <div className="rounded-2xl border border-[var(--color-light-gray)] overflow-hidden my-6">
        <table className="w-full">
          <thead>
            <tr className="bg-[var(--color-off-white)]">
              <th className="font-inter font-semibold text-xs tracking-wider uppercase text-[var(--color-deep-teal)] text-left px-5 py-3">Tier</th>
              <th className="font-inter font-semibold text-xs tracking-wider uppercase text-[var(--color-deep-teal)] text-left px-5 py-3">Price</th>
              <th className="font-inter font-semibold text-xs tracking-wider uppercase text-[var(--color-deep-teal)] text-left px-5 py-3">Impact</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-[var(--color-light-gray)]">
              <td className="font-inter font-medium text-sm text-[var(--color-charcoal)] px-5 py-3">Gala Ticket</td>
              <td className="font-inter text-sm text-[var(--color-dark-gray)] px-5 py-3">$500</td>
              <td className="font-inter text-sm text-[var(--color-dark-gray)] px-5 py-3">Funds 1 mentorship pairing</td>
            </tr>
            <tr className="border-t border-[var(--color-light-gray)]">
              <td className="font-inter font-medium text-sm text-[var(--color-charcoal)] px-5 py-3">Community Anchor</td>
              <td className="font-inter text-sm text-[var(--color-dark-gray)] px-5 py-3">$5,000</td>
              <td className="font-inter text-sm text-[var(--color-dark-gray)] px-5 py-3">Funds 10 pairings + recognition + 5 premium seats</td>
            </tr>
            <tr className="border-t border-[var(--color-light-gray)]">
              <td className="font-inter font-medium text-sm text-[var(--color-charcoal)] px-5 py-3">Impact Sponsor</td>
              <td className="font-inter text-sm text-[var(--color-dark-gray)] px-5 py-3">$7,500</td>
              <td className="font-inter text-sm text-[var(--color-dark-gray)] px-5 py-3">Funds 15 pairings + table for 10</td>
            </tr>
            <tr className="border-t border-[var(--color-light-gray)]">
              <td className="font-inter font-medium text-sm text-[var(--color-charcoal)] px-5 py-3">Heritage Visionary</td>
              <td className="font-inter text-sm text-[var(--color-dark-gray)] px-5 py-3">$15,000</td>
              <td className="font-inter text-sm text-[var(--color-dark-gray)] px-5 py-3">Funds 30 pairings + VIP table for 10</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>
        Every ticket directly funds mentorship pairings for first-generation and low-income AAPI
        undergraduates navigating the early stages of their careers.
      </p>

      <div className="my-8 flex flex-wrap gap-4">
        <a
          href="https://givebutter.com/c/galaofdreams"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-inter font-semibold text-base bg-[var(--color-warm-gold)] text-[var(--color-navy)] px-8 py-3.5 rounded-full hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 no-underline"
        >
          Get Tickets
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </EventLayout>
  );
}
