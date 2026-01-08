import { OrbitCameraControl } from "./input/orbitCameraControl";
import { Editor } from "./live/editor";
import { Viewport } from "./render/view/viewport";

const editor: Editor = new Editor();

const viewport: Viewport = new Viewport(editor.scene, document.body);

const cameraControl = new OrbitCameraControl(viewport.camera, viewport.renderer.domElement);

function animateFrame(): void {
	cameraControl.update();
	editor.update(null);
	viewport.render();
	requestAnimationFrame(animateFrame);
}

document.body.appendChild(viewport.renderer.domElement);
animateFrame();
