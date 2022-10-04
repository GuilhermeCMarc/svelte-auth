import { db } from '$lib/database';
import { sleep } from '$lib/utils/sleep';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ resolve, event }) => {
	if (process.env.NODE_ENV === 'development') await sleep(500);

	const session = event.cookies.get('app-session');

	if (!session) return await resolve(event);

	const authToken = await db.token.findUnique({
		where: { accessToken: session },
		include: { user: { include: { role: true } } }
	});

	if (authToken) {
		event.locals.user = {
			name: authToken.user.name,
			email: authToken.user.email,
			role: authToken.user.role?.name || 'USER'
		};
	}

	return await resolve(event);
};
