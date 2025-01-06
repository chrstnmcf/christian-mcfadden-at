import { Home as HomeComponent } from '~/components/home';

export function meta() {
  return [{ title: 'christian.mcfadden' }];
}

export default function Home() {
  return <HomeComponent />;
}
