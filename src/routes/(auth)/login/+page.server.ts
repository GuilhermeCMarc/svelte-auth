import { invalid, redirect } from '@sveltejs/kit';
import { db } from '$lib/database';
import type { Action, Actions } from './$types';

import bcrypt from 'bcrypt';

import crypto from 'crypto';

const login: Action = async ({ request, cookies }) => {
	const data = await request.formData();
	const email = data.get('email');
	const password = data.get('password');

	if (typeof email !== 'string' || typeof password !== 'string' || !email || !password)
		return invalid(400, { invalid: true });

	const found = await db.user.findUnique({ where: { email } });

	if (!found) return invalid(400, { credentials: true });

	const matchPassword = await bcrypt.compare(password, found.password);

	if (!matchPassword) return invalid(400, { credentials: true });

	const { accessToken } = await db.token.update({
		where: { userId: found.id },
		data: { accessToken: crypto.randomUUID() }
	});

	if (!accessToken) return invalid(400, { token: true });

	cookies.set('app-session', accessToken, {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		secure: process.env.NODE_ENV === 'production',
		maxAge: 60 * 60 * 24 * 30
	});

	throw redirect(302, '/');
};

export const actions: Actions = { login };
