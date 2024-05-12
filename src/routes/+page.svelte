<div class="mx-auto">
	<div class="text-center text-2xl">deutsch-persisches Lexikon</div>
	<div class="sticky z-50 top-0 bg-white dark:bg-slate-950">
		<div class="w-full mx-auto mt-4 py-2">
			<input class="text-2xl w-full p-2 border dark:text-black" type="text" placeholder="suchen …" bind:value={term} onkeydown={key} />
		</div>
	</div>
	{#if !lemmas.length}
		<div transition:fade>
			<div class="lg:text-center text-xl ">
				Aktuell sind {data.lemmas.toLocaleString('de-DE')} Einträge und {data.translations.toLocaleString('de-DE')} Übersetzungen in der Datenbank
			</div>
			<div class="noto-sans-pe lg:text-center text-xl mt-4" dir="rtl">
				فرهنگ فارسی - آلمانی
				<br>لغات، اصطلاحات، ضرب المثلها
			</div>
		</div>
	{:else}
		<ul class="text-xl">
			{#each lemmas as lemma, index}
				<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
				<li class=" py-2 px-1 cursor-pointer" class:dark:bg-green-950={lemma === selectedLemma || index === selected} class:bg-green-50={lemma === selectedLemma || index === selected} onclick={e=>showLemma(lemma)} onkeydown={e => e.key === 'enter' && showLemma(lemma)}>
					{#if persian}
						<span dir="rtl" class="noto-sans-pe text-2xl px-2 text-right">{lemma.lemma}</span>
					{:else}
						<span dir="ltr" class="text-xl px-2 text-left">{lemma.lemma}</span>
					{/if}
					{#if selectedLemma === lemma}
						<ul bind:this={translationList} in:fade>
							{#each translations as translation}
								<li class="flex justify-between odd:bg-green-100 even:bg-green-200 dark:odd:bg-green-900 dark:even:bg-green-800 py-2">
									<div dir="ltr" class="text-xl px-2 text-left">{persian ? translation.target : translation.source}</div>
									<div dir="rtl" class="noto-sans-pe text-2xl px-2 text-right">{persian ? translation.source : translation.target}</div></li>
							{/each}
						</ul>
					{/if}
				</li>
			{/each}
		</ul>
	{/if}
</div>

<script lang="ts">
	import type { Lemma, Translation } from "$lib/types";
	import type { PageData } from "./$types";
	import { fade } from 'svelte/transition';

	const { data }: { data: PageData } = $props();

	let term: string = $state("");
	let persian: boolean = $state.frozen(false);
	let selected: number = $state.frozen(-1);
	let selectedLemma: Lemma | undefined = $state.frozen(undefined);
	let lemmas: readonly Lemma[] = $state.frozen([]);
	let translations: readonly Translation[] = $state.frozen([]);
	let translationList: HTMLElement | null = $state(null);

	$effect(() => {
		if (!term || term.length < 2) {
			lemmas = [];
			return;
		}
		persian = isPersian(term);
		const normalized = persian ? term.replace(/([\u064B-\u0655])/g, '') : term;
		const uri = encodeURI(`a/${normalized}`);
		fetch(uri)
			.then(res => {
					if (res.ok)
						return res.json();
					throw "Nichts gefunden";
			})
			.then(json => lemmas = json)
			.catch(e => lemmas=[{id: -1, lemma: e}])
	});

	function isPersian (string: string): boolean {
			const regex = /[\u0622\u0627\u0628\u067E\u062A-\u0632\u0686\u0698\u0633-\u063A\u0641\u0642\u06A9\u06AF\u0644-\u0648\u06CC]/;
			return regex.test(string);
	}

	async function showLemma (lemma: Lemma) {
		if (!lemma || lemma === selectedLemma)
			return;
		selectedLemma = lemma;
		const uri = encodeURI(`g/${selectedLemma.id}`);
		const res = await fetch(uri);
		translations = await res.json();
	}

	$effect(() => translationList?.scrollIntoView({block: 'nearest'}))

	function key(e: KeyboardEvent) {
		if (e.key === 'ArrowDown')
			selected += 1;
		else if (e.key === 'ArrowUp')
			selected -= 1;
		else if (e.key === 'Enter')
			showLemma(lemmas[selected]);
		else
			return;
		if (selected > lemmas.length-1)
			selected = 0;
		if (selected < 0)
			selected = lemmas.length -1;
		e.preventDefault();
	}
</script>
