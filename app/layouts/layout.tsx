import { Outlet } from 'react-router';

import { Footer } from '~/components/footer';
import { Header } from '~/components/header';

export default function PageLayout() {
  return (
    <main className="relative flex flex-col min-h-screen justify-between">
      <Header />
      <section className="container mt-20 py-10 mb-auto">
        <Outlet />
      </section>
      <Footer />
    </main>
  );
}
