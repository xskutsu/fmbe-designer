export function loadImage(src: string): Promise<HTMLImageElement> {
	return new Promise(function (resolve, reject): void {
		const imageElement: HTMLImageElement = new Image();
		imageElement.crossOrigin = "Anonymous";
		imageElement.onload = () => resolve(imageElement);
		imageElement.onerror = e => reject(e);
		imageElement.src = src;
	})
}
