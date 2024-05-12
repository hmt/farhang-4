<script lang="ts">
	import { browser } from "$app/environment";
	import "../app.css";
	function toggleDarkMode() {
		if (browser) {
			if (document.documentElement.classList.contains('dark')) {
				document.documentElement.classList.remove('dark');
			} else {
				document.documentElement.classList.add('dark');
			}
		}
	};
</script>

<!-- svelte-ignore slot_element_deprecated -->
<div class="noto-sans-400 dark:bg-slate-900 dark:text-white">
	<div class="container mx-auto p-2 sm:p-4 flex flex-col h-screen">
		<div>
			<div class="noto-sans-900 text-center relative">Farhang</div>
			<button class="absolute top-5 right-5" onclick={toggleDarkMode}>
				<div class="hidden dark:block">🌙</div><div class="dark:hidden">☀️</div>
			</button>
		</div>
		<div class="mb-auto">
			<slot></slot>
		</div>
		<div class="text-sm w-full">
			<div class="mx-auto w-fit">
				Farhang.im ©&nbsp;<a class="no-underline" href="https://github.com/ckh/farhang">ckh</a>&nbsp;&&nbsp;<a class="no-underline" href="https://github.com/hmt">hmt</a>
				– <a href="https://creativecommons.org/licenses/by-sa/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer">CC BY-SA 4.0<img class="inline-block h-4 mb-1 ml-1" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1" alt=""><img class="inline-block mb-1 mx-1 h-4" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1" alt=""><img class="inline-block h-4 mb-1" src="https://mirrors.creativecommons.org/presskit/icons/sa.svg?ref=chooser-v1" alt=""></a>
			</div>
		</div>
	</div>
</div>
