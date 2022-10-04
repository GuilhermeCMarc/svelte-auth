import { db } from '$lib/database';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const search = url.searchParams.get('search');
	const page = Number(url.searchParams.get('page')) || 1;
	const perPage = 20;

	const [users, count] = await db.$transaction([
		db.user.findMany({
			skip: (page - 1) * perPage,
			where: { name: { contains: search?.trim().toLowerCase() || '' } },
			take: perPage
		}),
		db.user.count({
			skip: (page - 1) * perPage,
			where: { name: { contains: search?.trim().toLowerCase() || '' } },
			take: perPage
		})
	]);
	return {
		users,
		total: count,
		initialSearch: search
	};
};
