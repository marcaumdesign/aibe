import type { Access } from 'payload';

import { checkRole } from '@/access/checkRole';

export const admins: Access = ({ req: { user } }) => checkRole(['admin'], user);
