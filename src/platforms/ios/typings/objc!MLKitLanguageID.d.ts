
declare class MLKIdentifiedLanguage extends NSObject {

	static alloc(): MLKIdentifiedLanguage; // inherited from NSObject

	static new(): MLKIdentifiedLanguage; // inherited from NSObject

	readonly confidence: number;

	readonly languageTag: string;
}

declare class MLKLanguageIdentification extends NSObject {

	static alloc(): MLKLanguageIdentification; // inherited from NSObject

	static languageIdentification(): MLKLanguageIdentification;

	static languageIdentificationWithOptions(options: MLKLanguageIdentificationOptions): MLKLanguageIdentification;

	static new(): MLKLanguageIdentification; // inherited from NSObject

	identifyLanguageForTextCompletion(text: string, completion: (p1: string, p2: NSError) => void): void;

	identifyPossibleLanguagesForTextCompletion(text: string, completion: (p1: NSArray<MLKIdentifiedLanguage>, p2: NSError) => void): void;
}

declare class MLKLanguageIdentificationOptions extends NSObject {

	static alloc(): MLKLanguageIdentificationOptions; // inherited from NSObject

	static new(): MLKLanguageIdentificationOptions; // inherited from NSObject

	readonly confidenceThreshold: number;

	constructor(o: { confidenceThreshold: number; });

	initWithConfidenceThreshold(confidenceThreshold: number): this;
}

declare var MLKUndeterminedLanguageTag: string;

declare var kMLKDefaultIdentifyLanguageConfidenceThreshold: number;

declare var kMLKDefaultIdentifyPossibleLanguagesConfidenceThreshold: number;
