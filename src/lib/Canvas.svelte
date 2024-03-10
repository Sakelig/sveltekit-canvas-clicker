<script lang="ts">
	import { onMount } from 'svelte';

	export let width = 600;
	export let height = 500;
	export let background = '#AAAAAA';

	let canvas: HTMLCanvasElement;
	let context: CanvasRenderingContext2D | null;
	let imagePosition = { x: 0, y: 0 };
	let imagePosition2 = { x: 0, y: 30 };

	onMount(() => {
		context = canvas.getContext('2d');
		canvas.addEventListener('click', (e) => {
			console.log(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
		});
	});

	let peepoImage: HTMLImageElement = new Image();
	peepoImage.src = 'https://cdn.7tv.app/emote/638767f24cc489ef45239272/3x.webp';

	let peepoImage2: HTMLImageElement = new Image();
	peepoImage2.src = 'https://cdn.7tv.app/emote/649b89d33b4504dd621e53cc/3x.webp';

	setTimeout(() => {
		context?.drawImage(peepoImage, imagePosition.x, imagePosition.y);
		context?.drawImage(peepoImage2, imagePosition2.x, imagePosition2.y);
		draw();
	}, 2000);
	// peepoImage.onload = () => {
	// 	context?.drawImage(peepoImage, 0, 0);
	// };

	let lastFrame = performance.now();

	function draw() {
		let direction = 'right';
		const delta = Math.min(1, Math.max(0, (performance.now() - lastFrame) / 1000));
		lastFrame = performance.now();
		context?.clearRect(0, 0, canvas.width, canvas.height);

		if (direction === 'right') {
			imagePosition.x += delta * 50;
			context?.drawImage(peepoImage, imagePosition.x, imagePosition.y);
			if (canvas?.width / 2 < imagePosition.x) {
				direction = 'left';
			}
		}
		if (direction === 'left') {
			imagePosition.x -= delta * 50;
			context?.drawImage(peepoImage, imagePosition.x, imagePosition.y);
			if (canvas?.width / 2 > imagePosition.x) {
				direction = 'right';
			}
		}

		context?.drawImage(peepoImage2, imagePosition2.x, imagePosition2.y);

		requestAnimationFrame(draw);
	}
</script>

<canvas {width} {height} style:background bind:this={canvas} />
