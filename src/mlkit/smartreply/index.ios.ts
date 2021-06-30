import { MLKitSmartReplySuggestRepliesOptions, } from "./index";

export function suggestReplies(options: MLKitSmartReplySuggestRepliesOptions): Promise<Array<string>> {
  return new Promise((resolve, reject) => {
    try {
      const smartReply = MLKSmartReply.smartReply();
      const conversation: NSMutableArray<MLKTextMessage> = NSMutableArray.new();

      options.conversation.forEach(m => conversation.addObject(
          MLKTextMessage.alloc().initWithTextTimestampUserIDIsLocalUser(m.text, m.timestamp, m.userId, m.localUser)
      ));

      smartReply.suggestRepliesForMessagesCompletion(conversation, (result: MLKSmartReplySuggestionResult, error: NSError) => {
        if (error) {
          reject(error.localizedDescription);
        } else if (!result) {
          reject("No results");
        } else if (result.status === MLKSmartReplyResultStatusNotSupportedLanguage) {
          reject("Unsupported language");
        } else if (result.status === MLKSmartReplyResultStatusNoReply) {
          reject("No reply");
        } else if (result.status === MLKSmartReplyResultStatusSuccess) {
          const suggestions = [];
          for (let i = 0; i < result.suggestions.count; i++) {
            const s = result.suggestions.objectAtIndex(i);
            suggestions.push(s.text);
          }
          resolve(suggestions);
        } else {
          reject();
        }
      });
    } catch (ex) {
      console.log("Error in firebase.mlkit.suggestReplies: " + ex);
      reject(ex);
    }
  });
}
