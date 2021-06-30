
declare class MLKVision3DPoint extends MLKVisionPoint {

	static alloc(): MLKVision3DPoint; // inherited from NSObject

	static new(): MLKVision3DPoint; // inherited from NSObject

	readonly z: number;
}

declare class MLKVisionImage extends NSObject {

	static alloc(): MLKVisionImage; // inherited from NSObject

	static new(): MLKVisionImage; // inherited from NSObject

	orientation: UIImageOrientation;

	constructor(o: { buffer: any; });

	constructor(o: { image: UIImage; });

	initWithBuffer(sampleBuffer: any): this;

	initWithImage(image: UIImage): this;
}

declare class MLKVisionPoint extends NSObject {

	static alloc(): MLKVisionPoint; // inherited from NSObject

	static new(): MLKVisionPoint; // inherited from NSObject

	readonly x: number;

	readonly y: number;
}
