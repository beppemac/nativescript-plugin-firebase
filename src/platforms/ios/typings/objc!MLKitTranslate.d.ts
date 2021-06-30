
declare function MLKTranslateAllLanguages(): NSSet<string>;

declare var MLKTranslateLanguageAfrikaans: string;

declare var MLKTranslateLanguageAlbanian: string;

declare var MLKTranslateLanguageArabic: string;

declare var MLKTranslateLanguageBelarusian: string;

declare var MLKTranslateLanguageBengali: string;

declare var MLKTranslateLanguageBulgarian: string;

declare var MLKTranslateLanguageCatalan: string;

declare var MLKTranslateLanguageChinese: string;

declare var MLKTranslateLanguageCroatian: string;

declare var MLKTranslateLanguageCzech: string;

declare var MLKTranslateLanguageDanish: string;

declare var MLKTranslateLanguageDutch: string;

declare var MLKTranslateLanguageEnglish: string;

declare var MLKTranslateLanguageEsperanto: string;

declare var MLKTranslateLanguageEstonian: string;

declare var MLKTranslateLanguageFinnish: string;

declare var MLKTranslateLanguageFrench: string;

declare var MLKTranslateLanguageGalician: string;

declare var MLKTranslateLanguageGeorgian: string;

declare var MLKTranslateLanguageGerman: string;

declare var MLKTranslateLanguageGreek: string;

declare var MLKTranslateLanguageGujarati: string;

declare var MLKTranslateLanguageHaitianCreole: string;

declare var MLKTranslateLanguageHebrew: string;

declare var MLKTranslateLanguageHindi: string;

declare var MLKTranslateLanguageHungarian: string;

declare var MLKTranslateLanguageIcelandic: string;

declare var MLKTranslateLanguageIndonesian: string;

declare var MLKTranslateLanguageIrish: string;

declare var MLKTranslateLanguageItalian: string;

declare var MLKTranslateLanguageJapanese: string;

declare var MLKTranslateLanguageKannada: string;

declare var MLKTranslateLanguageKorean: string;

declare var MLKTranslateLanguageLatvian: string;

declare var MLKTranslateLanguageLithuanian: string;

declare var MLKTranslateLanguageMacedonian: string;

declare var MLKTranslateLanguageMalay: string;

declare var MLKTranslateLanguageMaltese: string;

declare var MLKTranslateLanguageMarathi: string;

declare var MLKTranslateLanguageNorwegian: string;

declare var MLKTranslateLanguagePersian: string;

declare var MLKTranslateLanguagePolish: string;

declare var MLKTranslateLanguagePortuguese: string;

declare var MLKTranslateLanguageRomanian: string;

declare var MLKTranslateLanguageRussian: string;

declare var MLKTranslateLanguageSlovak: string;

declare var MLKTranslateLanguageSlovenian: string;

declare var MLKTranslateLanguageSpanish: string;

declare var MLKTranslateLanguageSwahili: string;

declare var MLKTranslateLanguageSwedish: string;

declare var MLKTranslateLanguageTagalog: string;

declare var MLKTranslateLanguageTamil: string;

declare var MLKTranslateLanguageTelugu: string;

declare var MLKTranslateLanguageThai: string;

declare var MLKTranslateLanguageTurkish: string;

declare var MLKTranslateLanguageUkrainian: string;

declare var MLKTranslateLanguageUrdu: string;

declare var MLKTranslateLanguageVietnamese: string;

declare var MLKTranslateLanguageWelsh: string;

declare class MLKTranslateRemoteModel extends MLKRemoteModel {

	static alloc(): MLKTranslateRemoteModel; // inherited from NSObject

	static new(): MLKTranslateRemoteModel; // inherited from NSObject

	static translateRemoteModelWithLanguage(language: string): MLKTranslateRemoteModel;

	readonly language: string;
}

declare class MLKTranslator extends NSObject {

	static alloc(): MLKTranslator; // inherited from NSObject

	static new(): MLKTranslator; // inherited from NSObject

	static translatorWithOptions(options: MLKTranslatorOptions): MLKTranslator;

	downloadModelIfNeededWithCompletion(completion: (p1: NSError) => void): void;

	downloadModelIfNeededWithConditionsCompletion(conditions: MLKModelDownloadConditions, completion: (p1: NSError) => void): void;

	translateTextCompletion(text: string, completion: (p1: string, p2: NSError) => void): void;
}

declare class MLKTranslatorOptions extends NSObject {

	static alloc(): MLKTranslatorOptions; // inherited from NSObject

	static new(): MLKTranslatorOptions; // inherited from NSObject

	readonly sourceLanguage: string;

	readonly targetLanguage: string;

	constructor(o: { sourceLanguage: string; targetLanguage: string; });

	initWithSourceLanguageTargetLanguage(sourceLanguage: string, targetLanguage: string): this;
}
