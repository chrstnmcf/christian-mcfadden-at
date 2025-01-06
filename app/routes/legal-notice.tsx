// import type { Route } from './+types/home';

export function meta() {
  return [{ title: 'christian.mcfadden' }];
}

export default function Home() {
  return (
    <>
      <h2>Legal Notice / Impressum</h2>
      <p>
        In case you&apos;re looking for the guy who is responsible for all of this, here you go.
      </p>
      <address className="not-italic py-5">
        <strong>Christian McFadden</strong>
        <br />
        Haggenstraße 15
        <br />
        5110 Oberndorf bei Salzburg
        <br />
        Austria
      </address>
      <h3>Contact</h3>
      <p>
        <a href="mailto:christian@mcfadden.at">christian@mcfadden.at</a>
      </p>
    </>
  );
}
