import { HeaderClient } from './header-client';
import { getPayload } from 'payload';
import config from '@/payload.config';

export default async function Header() {
  const payload = await getPayload({ config });

  // Buscar workshops - primeiro os current, depois os past ordenados por data
  const workshops = await payload.find({
    collection: 'workshops',
    depth: 0,
    limit: 10,
    sort: '-period.startDate',
    where: {
      _status: {
        equals: 'published',
      },
    },
  });

  // Separar current e past
  const currentWorkshops = workshops.docs.filter(w => w.type === 'current');
  const pastWorkshops = workshops.docs.filter(w => w.type === 'past');

  // Ordenar: current primeiro, depois past por data decrescente
  const sortedWorkshops = [...currentWorkshops, ...pastWorkshops];

  return <HeaderClient workshops={sortedWorkshops} />;
}
