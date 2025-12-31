import { entities } from "./entity/entities";
import { camera, renderer, scene } from "./viewport/viewport";

document.body.appendChild(renderer.domElement);

export function animationFrame(): void {
	requestAnimationFrame(animationFrame);
	for (const entity of entities.values()) {
		entity.update();
	}
	renderer.render(scene, camera);
}

animationFrame();
