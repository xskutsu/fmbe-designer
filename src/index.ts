import { entities } from "./entity/entities";
import { camera, renderer, scene } from "./viewport/viewport";

document.body.appendChild(renderer.domElement);

function animateFrame(): void {
	requestAnimationFrame(animateFrame);
	for (const entity of entities.values()) {
		entity.update();
	}
	renderer.render(scene, camera);
}

animateFrame();
