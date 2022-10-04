import { invalid, redirect } from '@sveltejs/kit';
import { db } from '$lib/database';
import type { Action, Actions } from './$types';

import bcrypt from 'bcrypt';

enum Roles {
	ADMIN = 'ADMIN',
	USER = 'USER'
}

const register: Action = async ({ request }) => {
	const data = await request.formData();
	const name = data.get('name');
	const email = data.get('email');
	const password = data.get('password');

	if (
		typeof name !== 'string' ||
		typeof email !== 'string' ||
		typeof password !== 'string' ||
		!name ||
		!email ||
		!password
	)
		return invalid(400, { invalid: true });

	const found = await db.user.findUnique({ where: { email } });

	if (found) return invalid(400, { exists: true });

	await db.user.create({
		data: {
			email,
			name,
			password: await bcrypt.hash(password, 10),
			role: {
				connect: {
					name: Roles.USER
				}
			},
			token: { create: {} }
		}
	});

	throw redirect(303, '/');
};

export const actions: Actions = { register };
