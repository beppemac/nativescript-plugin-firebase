
declare class MLKSmartReply extends NSObject {

	static alloc(): MLKSmartReply; // inherited from NSObject

	static new(): MLKSmartReply; // inherited from NSObject

	static smartReply(): MLKSmartReply;

	suggestRepliesForMessagesCompletion(messages: NSArray<MLKTextMessage> | MLKTextMessage[], completion: (p1: MLKSmartReplySuggestionResult, p2: NSError) => void): void;
}

declare var MLKSmartReplyResultStatusNoReply: number;

declare var MLKSmartReplyResultStatusNotSupportedLanguage: number;

declare var MLKSmartReplyResultStatusSuccess: number;

declare class MLKSmartReplySuggestion extends NSObject {

	static alloc(): MLKSmartReplySuggestion; // inherited from NSObject

	static new(): MLKSmartReplySuggestion; // inherited from NSObject

	readonly text: string;
}

declare class MLKSmartReplySuggestionResult extends NSObject {

	static alloc(): MLKSmartReplySuggestionResult; // inherited from NSObject

	static new(): MLKSmartReplySuggestionResult; // inherited from NSObject

	readonly status: number;

	readonly suggestions: NSArray<MLKSmartReplySuggestion>;
}

declare class MLKTextMessage extends NSObject {

	static alloc(): MLKTextMessage; // inherited from NSObject

	static new(): MLKTextMessage; // inherited from NSObject

	readonly isLocalUser: boolean;

	readonly text: string;

	readonly timestamp: number;

	readonly userID: string;

	constructor(o: { text: string; timestamp: number; userID: string; isLocalUser: boolean; });

	initWithTextTimestampUserIDIsLocalUser(text: string, timestamp: number, userID: string, isLocalUser: boolean): this;
}
