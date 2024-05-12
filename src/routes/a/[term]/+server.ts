import { error, json } from '@sveltejs/kit';
import { search } from '$lib/db';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = ({ params }) => {
	const term = params.term;
	if (!term)
		throw error(404);
	return json(search(term));
};