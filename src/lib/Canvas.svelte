<script lang="ts">
	import { onMount } from 'svelte';

	export let width = 600;
	export let height = 500;
	export let color = '#333';
	export let background = '#AAAAAA';

	let canvas: HTMLCanvasElement;
	let context: CanvasRenderingContext2D | null;

	onMount(() => {
		context = canvas.getContext('2d');
	});

	const peepoImage: HTMLImageElement = new Image();
	peepoImage.onload = () => {
		context?.drawImage(peepoImage, 0, 0);
	};

	peepoImage.src = 'https://cdn.discordapp.com/emojis/925076402573824011.webp';
</script>

<canvas {width} {height} style:background bind:this={canvas} />
