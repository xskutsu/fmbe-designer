import { OrbitCameraControl } from "./input/orbitCameraControl";
import { Editor } from "./live/editor";
import type { MolangVariableMap } from "./molang/types";
import { Viewport } from "./render/view/viewport";

const editor: Editor = new Editor();

const viewport: Viewport = new Viewport(document.body);
viewport.onresize = () => viewport.render(editor.scene);

const cameraControl = new OrbitCameraControl(viewport.camera, viewport.renderer.domElement);

const molangVariables: MolangVariableMap = new Map([
	["q.life_time", () => performance.now() / 1000],
	["query.life_time", () => performance.now() / 1000],
	["q.vertical_speed", () => 0],
	["query.vertical_speed", () => 0],
	["q.modified_distance_moved", () => 0],
	["query.modified_distance_moved", () => 0]
]);

function animateFrame(): void {
	cameraControl.update();
	editor.update(molangVariables);
	viewport.render(editor.scene);
	requestAnimationFrame(animateFrame);
}

animateFrame();
