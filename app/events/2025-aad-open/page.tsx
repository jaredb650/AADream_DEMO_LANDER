import EventLayout, { ResultsTable, PhotoGallery } from "../EventLayout";

const BASE = "";

export const metadata = {
  title: "2025 AAD Open | Asian American Dream",
  description: "The third annual AAD Open tennis fundraiser brought 84 players and raised $14,988 for AAPI undergraduates.",
};

export default function Event2025AADOpen() {
  return (
    <EventLayout
      title="2025 AAD Open"
      date="June 7, 2025"
      tag="Fundraiser"
      heroImage={`${BASE}/images/events/event-1.jpg`}
    >
      <p>
        To say the 2025 AAD Open was a movie would be an understatement. This year&apos;s Open was a
        saga &ndash; a story of grit and determination that helped us all remember why we all love
        tennis. It reminded us that the one thing that we can control on court is our attitude. It
        also reminded us of those formative years in USTA tournaments, waiting for the rain to
        subside before heading back to battle.
      </p>

      <p>
        However, if there&apos;s only one take away, it&apos;s that <strong>we found community</strong>.
        We all lead such different lives, but we all came together on Saturday because of our love
        for the game. We hope you were able to find new hitting partners, reconnect with old friends,
        and build community with each other.
      </p>

      <p>
        With that said, we want to express our sincerest gratitude to you, patrons of the AAD Open
        and the AAD mission more broadly, for supporting our 3rd annual tennis benefit! This year,
        we brought in a record <strong>84 players</strong> and have raised another
        record <strong>$14,988</strong>! Thunderstorms aside, we made history and that&apos;s
        something we can all be proud of.
      </p>

      <p>
        A tremendous thank you to our event partners: <strong>Capri Holdings</strong>, Drink
        Boken, <strong>Happy Tuna</strong>, Drink Lunar, <strong>NYC Racquet
        Sports</strong>, Trophy Central, <strong>USTA Eastern</strong> and Voss World for
        sponsoring the AAD Open and championing our mission.
      </p>

      <h2>Champions &amp; Finalists</h2>

      <ResultsTable
        flights={[
          {
            name: "A Flight",
            champions: "Amir Alkhafaji, Aryan Chaudhary, Isaac Gorelik, Nathan Reekie",
            finalists: "Brian Tan, Bryan Datyner, Ethan Chen, Sunil Sabnis",
          },
          {
            name: "B Flight",
            champions: "Alec Liu, Sid Bagaria, Zac May, Varun Deedwaniya",
            finalists: "David Sollod, John Marymount, Neel Sambamurthy, Timothy Chiang",
          },
          {
            name: "C Flight",
            champions: "Aiden Chen, Caleb Thaler, Ian Han, Jack MacInnes",
            finalists: "Avery Aviv, Avery Schuldt, Avi Bond, Rhea Lieber",
          },
        ]}
      />

      <PhotoGallery
        images={[
          "https://i0.wp.com/asianamericandream.org/wp-content/uploads/2025/06/139-IMG_0251-683x1024.jpeg?ssl=1",
          "https://i0.wp.com/asianamericandream.org/wp-content/uploads/2025/06/100-IMG_0202-683x1024.jpeg?ssl=1",
          "https://i0.wp.com/asianamericandream.org/wp-content/uploads/2025/06/81-IMG_0178-683x1024.jpeg?ssl=1",
          "https://i0.wp.com/asianamericandream.org/wp-content/uploads/2025/06/57-IMG_0141-683x1024.jpeg?ssl=1",
          "https://i0.wp.com/asianamericandream.org/wp-content/uploads/2025/06/53-IMG_0131-683x1024.jpeg?ssl=1",
          "https://i0.wp.com/asianamericandream.org/wp-content/uploads/2025/06/41-IMG_0107-683x1024.jpeg?ssl=1",
          "https://i0.wp.com/asianamericandream.org/wp-content/uploads/2025/06/38-IMG_0101-683x1024.jpeg?ssl=1",
          "https://i0.wp.com/asianamericandream.org/wp-content/uploads/2025/06/37-IMG_0096-683x1024.jpeg?ssl=1",
          "https://i0.wp.com/asianamericandream.org/wp-content/uploads/2025/06/13-IMG_0059-683x1024.jpeg?ssl=1",
          "https://i0.wp.com/asianamericandream.org/wp-content/uploads/2025/06/IMG_8807-768x1024.jpeg?ssl=1",
          "https://i0.wp.com/asianamericandream.org/wp-content/uploads/2025/06/IMG_8734-768x1024.jpeg?ssl=1",
          "https://i0.wp.com/asianamericandream.org/wp-content/uploads/2025/06/IMG_8788-768x1024.jpeg?ssl=1",
          "https://i0.wp.com/asianamericandream.org/wp-content/uploads/2025/06/IMG_8782-768x1024.jpeg?ssl=1",
          "https://i0.wp.com/asianamericandream.org/wp-content/uploads/2025/06/IMG_8768-768x1024.jpeg?ssl=1",
          "https://i0.wp.com/asianamericandream.org/wp-content/uploads/2025/06/IMG_8773-768x1024.jpeg?ssl=1",
        ]}
      />
    </EventLayout>
  );
}
