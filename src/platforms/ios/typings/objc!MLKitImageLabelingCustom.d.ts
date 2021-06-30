
declare class MLKCustomImageLabelerOptions extends MLKCommonImageLabelerOptions {

	static alloc(): MLKCustomImageLabelerOptions; // inherited from NSObject

	static new(): MLKCustomImageLabelerOptions; // inherited from NSObject

	maxResultCount: number;

	constructor(o: { localModel: MLKLocalModel; });

	constructor(o: { remoteModel: MLKCustomRemoteModel; });

	initWithLocalModel(localModel: MLKLocalModel): this;

	initWithRemoteModel(remoteModel: MLKCustomRemoteModel): this;
}
