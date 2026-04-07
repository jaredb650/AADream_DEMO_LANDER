import EventLayout, { PhotoGallery } from "../EventLayout";

const BASE = "";

export const metadata = {
  title: "2025 Table of Dreams | Asian American Dream",
  description: "AAD's 2nd Annual Table of Dreams Giving Tuesday benefit dinner, raising $31,000 in support of the Kin Mentorship Program.",
};

export default function Event2025TableOfDreams() {
  return (
    <EventLayout
      title="2025 Table of Dreams"
      date="Giving Tuesday, 2025"
      tag="Benefit Dinner"
      heroImage={`${BASE}/images/events/table-of-dreams-2025-cover.jpeg`}
    >
      <p>
        The 2nd Annual Table of Dreams was a truly unforgettable evening. On Giving Tuesday,
        the AAD community came together for a spectacular culinary journey and raised an
        incredible <strong>$31,000</strong> in support of the AAD mission.
      </p>

      <p>
        The evening championed AAD&rsquo;s signature <strong>Kin Mentorship Program</strong>,
        celebrating the strong bonds between our 200+ mentees and 200+ mentors while fueling
        the future of AAPI leadership. Every dollar raised goes directly toward paving the way
        for the next generation of AAPI leaders.
      </p>

      <h2>A Culinary Celebration</h2>

      <p>
        A huge thank you to our community partner, the Michelin Bib Gourmand-honored
        <strong> La D&#7891;ng</strong>, for hosting another magnificent culinary adventure
        and for their steadfast support of the AAPI community here in New York City. Each
        course was a celebration of Vietnamese culinary tradition, bringing warmth, flavor,
        and connection to every table.
      </p>

      <h2>Breaking Records Together</h2>

      <p>
        This year&rsquo;s Table of Dreams broke records, more than doubling our fundraising
        goal. The generosity of our attendees, sponsors, and community partners is a testament
        to the collective belief in AAD&rsquo;s mission and the power of investing in
        underserved AAPI undergraduates.
      </p>

      <p>
        Thank you to everyone who helped make this evening possible. Your support empowers our
        students to fearlessly chase and achieve their career dreams.
      </p>

      <PhotoGallery
        images={Array.from({ length: 10 }, (_, i) =>
          `${BASE}/images/events/table-of-dreams-2025/tod-${i + 1}.jpeg`
        )}
      />
    </EventLayout>
  );
}
