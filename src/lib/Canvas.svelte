<script lang="ts">
	import { onMount } from 'svelte';
	import { checkClickedOnEnemy } from './Helpers';

	export let width = 600;
	export let height = 500;
	export let background = '#AAAAAA';

	let canvas: HTMLCanvasElement;
	let context: CanvasRenderingContext2D | null;
	let imagePosition = { x: 0, y: 0 };
	let imagePosition2 = { x: 0, y: 30 };

	let activeEnemies: Array<EnemyItem> = [];

	onMount(() => {
		context = canvas.getContext('2d');
		canvas.addEventListener('click', (e) => {
			const clickPos: ClickedPosition = {
				xPos: e.clientX - canvas.offsetLeft,
				yPos: e.clientY - canvas.offsetTop
			};
			checkClickedOnEnemy(clickPos, activeEnemies);
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
	let direction = 'right';

	function draw() {
		activeEnemies = [];
		const delta = Math.min(1, Math.max(0, (performance.now() - lastFrame) / 1000));
		lastFrame = performance.now();
		context?.clearRect(0, 0, canvas.width, canvas.height);

		if (direction === 'right') {
			imagePosition.x += delta * 50;
			context?.drawImage(peepoImage, imagePosition.x, imagePosition.y);
			activeEnemies.push({
				enemy: peepoImage,
				position: {
					x: imagePosition.x,
					y: imagePosition.y
				}
			});
			if (canvas?.width / 2 - peepoImage.width < imagePosition.x) {
				direction = 'left';
			}
		}
		if (direction === 'left') {
			imagePosition.x += delta * -50;
			context?.drawImage(peepoImage, imagePosition.x, imagePosition.y);
			activeEnemies.push({
				enemy: peepoImage,
				position: {
					x: imagePosition.x,
					y: imagePosition.y
				}
			});
			if (imagePosition.x < 0) {
				direction = 'right';
			}
		}

		context?.drawImage(peepoImage2, imagePosition2.x, imagePosition2.y);

		requestAnimationFrame(draw);
	}
</script>

<canvas {width} {height} style:background bind:this={canvas} />
