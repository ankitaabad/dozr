<script lang="ts">
	export let loan_type;
</script>

{#if loan_type == 'Student Loan'}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		class="icon icon-tabler icon-tabler-school"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		stroke-width="2"
		stroke="currentColor"
		fill="none"
		stroke-linecap="round"
		stroke-linejoin="round"
		><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path
			d="M22 9l-10 -4l-10 4l10 4l10 -4v6"
		/><path d="M6 10.6v5.4a6 3 0 0 0 12 0v-5.4" /></svg
	>
{:else if loan_type == 'Home Loan'}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		class="icon icon-tabler icon-tabler-home"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		stroke-width="2"
		stroke="currentColor"
		fill="none"
		stroke-linecap="round"
		stroke-linejoin="round"
		><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 12l-2 0l9 -9l9 9l-2 0" /><path
			d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"
		/><path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" /></svg
	>
{:else if loan_type == 'Personal Loan'}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		class="icon icon-tabler icon-tabler-user"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		stroke-width="2"
		stroke="currentColor"
		fill="none"
		stroke-linecap="round"
		stroke-linejoin="round"
		><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path
			d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"
		/><path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /></svg
	>
{/if}
