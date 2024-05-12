import "../app.css";
import type { LayoutServerLoad } from './$types';
import { stats } from "$lib/db";

export const load: LayoutServerLoad = () => {
	return stats();
};