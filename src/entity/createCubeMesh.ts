import { BoxGeometry, Material, Mesh, MeshStandardMaterial, NearestFilter, SRGBColorSpace, Texture } from "three";
import { EntityTexture } from "./types";

export function createBlockMesh(et: EntityTexture): Mesh {
	const materials: Material[] = [];
	const textures: Texture[] = [et.east, et.west, et.up, et.down, et.south, et.north];
	for (const texture of textures) {
		texture.magFilter = NearestFilter;
		texture.minFilter = NearestFilter;
		texture.colorSpace = SRGBColorSpace;
		materials.push(new MeshStandardMaterial({
			map: texture,
			roughness: 0,
			metalness: 0
		}));
	}
	return new Mesh(new BoxGeometry(1, 1, 1), materials);
}
