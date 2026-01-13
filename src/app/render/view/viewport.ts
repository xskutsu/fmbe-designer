import { PerspectiveCamera, type Scene, SRGBColorSpace, WebGLRenderer } from "three";

export class Viewport {
	public readonly container: HTMLElement;
	public readonly renderer: WebGLRenderer;
	public readonly camera: PerspectiveCamera;
	private _observer: ResizeObserver;
	public onresize: (() => void) | null;

	public constructor(container: HTMLElement) {
		this.container = container;
		this.renderer = new WebGLRenderer({
			antialias: false,
			powerPreference: "high-performance"
		});
		this.renderer.shadowMap.enabled = true;
		this.renderer.outputColorSpace = SRGBColorSpace;
		this.renderer.domElement.style.width = "100%";
		this.renderer.domElement.style.height = "100%";
		this.renderer.domElement.style.display = "block";
		this.renderer.domElement.style.touchAction = "none";
		this.container.appendChild(this.renderer.domElement);
		this.camera = new PerspectiveCamera(60, 1, 0.1, 200);
		this._observer = new ResizeObserver(this._resizeObserverCallback.bind(this));
		this._observer.observe(this.container);
		this.onresize = null;
		const rect = this.container.getBoundingClientRect();
		this._updateDimensions(rect.width, rect.height);
	}

	public dispose(): void {
		this._observer.disconnect();
		this.renderer.domElement.remove();
		this.renderer.dispose();
		this.onresize = null;
	}

	public render(scene: Scene): void {
		this.renderer.render(scene, this.camera);
	}

	private _resizeObserverCallback(entries: ResizeObserverEntry[]): void {
		let maxWidth: number = 0;
		let maxHeight: number = 0;
		for (const entry of entries) {
			const width: number = entry.contentRect.width;
			const height: number = entry.contentRect.height;
			if (maxWidth < width) {
				maxWidth = width;
			}
			if (maxHeight < height) {
				maxHeight = height;
			}
		}
		this._updateDimensions(maxWidth, maxHeight);
	}

	private _updateDimensions(width: number, height: number): void {
		if (width < 1 || height < 1) {
			return;
		}
		this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		this.renderer.setSize(width, height, false);
		this.camera.aspect = width / height;
		this.camera.updateProjectionMatrix();
		if (this.onresize !== null) {
			this.onresize();
		}
	}
}
