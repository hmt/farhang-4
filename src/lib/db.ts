import Database from 'better-sqlite3';
const DB_PATH = process.env.DB_PATH;

const db = new Database(DB_PATH, {readonly: true});

export function stats() {
	const { translations, lemmas} = db.prepare(`
		SELECT
			(SELECT COUNT(DISTINCT id) FROM translations) AS translations,
			(SELECT COUNT(DISTINCT id) FROM lemmas) AS lemmas
		`).get() as {translations: number, lemmas: number};
		return { translations, lemmas };
	}

export function search(term: string) {
  return db.prepare(`
		SELECT id, lemma
		FROM lemmas
		WHERE lemma
			LIKE ?
		ORDER BY lemma
			COLLATE NOCASE ASC
	`).all(`${term}%`);
}

export function lemma(id: number) {
  return db.prepare(`
		SELECT source, target
		FROM translations
		WHERE lemma_id = ?
	`).all(id);
}