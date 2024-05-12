import { error, json } from '@sveltejs/kit';
import { lemma } from '$lib/db';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = ({ params }) => {
	const id = parseInt(params.id);
	if (!id)
		throw error(404);
	return json(lemma(id));
};