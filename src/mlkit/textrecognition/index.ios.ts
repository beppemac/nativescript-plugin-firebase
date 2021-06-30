import { ImageSource } from "@nativescript/core";
import { MLKitVisionOptions } from "../";
import { MLKitRecognizeTextCloudOptions, MLKitRecognizeTextOnDeviceOptions, MLKitRecognizeTextResult } from "./";
import { MLKitTextRecognition as MLKitTextRecognitionBase } from "./textrecognition-common";
import { MLKitRecognizeTextResultBlock, MLKitRecognizeTextResultLine } from "./index";

export class MLKitTextRecognition extends MLKitTextRecognitionBase {
  protected createDetector(): any {
    return MLKTextRecognizer.textRecognizer();
  }

  protected createSuccessListener(): any {
    return (visionText: MLKText, error: NSError) => {
      if (error !== null) {
        console.log(error.localizedDescription);
      } else if (visionText !== null) {
        this.notify({
          eventName: MLKitTextRecognition.scanResultEvent,
          object: this,
          value: getResult(visionText)
        });
      }
    };
  }

  protected rotateRecording(): boolean {
    return true;
  }
}

function getResult(visionText: MLKText): MLKitRecognizeTextResult {
  if (visionText === null) {
    return {};
  }

  const result = <MLKitRecognizeTextResult>{
    text: visionText.text,
    blocks: [],
    ios: visionText
  };

  for (let i = 0, l = visionText.blocks.count; i < l; i++) {
    const feature: MLKTextBlock = visionText.blocks.objectAtIndex(i);
    const resultFeature = <MLKitRecognizeTextResultBlock>{
      text: feature.text,
      // confidence: feature.confidence,
      bounds: feature.frame,
      lines: []
    };

    const addLineToResult = (line: MLKTextLine): void => {
      const resultLine = <MLKitRecognizeTextResultLine>{
        text: feature.text,
        // confidence: line.confidence,
        bounds: line.frame,
        elements: []
      };
      for (let a = 0, m = line.elements.count; a < m; a++) {
        const element: MLKTextElement = line.elements.objectAtIndex(a);
        resultLine.elements.push({
          text: element.text,
          bounds: element.frame,
        });
      }
      resultFeature.lines.push(resultLine);
    };

    // TODO
    if (feature instanceof MLKTextBlock) {
      const textBlock = <MLKTextBlock>feature;
      for (let j = 0, k = textBlock.lines.count; j < k; j++) {
        addLineToResult(textBlock.lines.objectAtIndex(j));
      }
    }

    // TODO
    if (feature instanceof MLKTextLine) {
      addLineToResult(feature);
    }

    result.blocks.push(resultFeature);
  }
  return result;
}

export function recognizeTextOnDevice(options: MLKitRecognizeTextOnDeviceOptions): Promise<MLKitRecognizeTextResult> {
  return new Promise((resolve, reject) => {
    try {
      const textDetector: MLKTextRecognizer = MLKTextRecognizer.textRecognizer();

      textDetector.processImageCompletion(getImage(options), (visionText: MLKText, error: NSError) => {
        if (error !== null) {
          reject(error.localizedDescription);
        } else {
          resolve(getResult(visionText));
        }
      });
    } catch (ex) {
      console.log("Error in firebase.mlkit.recognizeTextOnDevice: " + ex);
      reject(ex);
    }
  });
}

export function recognizeTextCloud(options: MLKitRecognizeTextCloudOptions): Promise<MLKitRecognizeTextResult> {
  return new Promise((resolve, reject) => {
    // TODO 
    reject("NOT IMPLEMENTED YET");
    /*
    try {
      const MLKCloudDetectorOptions = MLKCloudTextRecognizerOptions.new();
      MLKCloudDetectorOptions.modelType = MLKCloudTextModelType.Sparse;
      // MLKCloudDetectorOptions.modelType = options.modelType === "latest" ? MLKCloudModelType.Latest : MLKCloudModelType.Stable;
      // MLKCloudDetectorOptions.maxResults = options.maxResults || 10;

      const MLK: MLK = MLK.vision();
      const textDetector = MLK.cloudTextRecognizerWithOptions(MLKCloudDetectorOptions);

      textDetector.processImageCompletion(getImage(options), (visionText: MLKText, error: NSError) => {
        console.log(">>> recognizeTextCloud error? " + error + ", visionText? " + visionText);
        if (error !== null) {
          reject(error.localizedDescription);
        } else if (visionText !== null) {
          resolve(getResult(visionText));
        } else {
          reject("Unknown error :'(");
        }
      });
    } catch (ex) {
      console.log("Error in firebase.mlkit.recognizeTextCloud: " + ex);
      reject(ex);
    }
    */
  });
}

function getImage(options: MLKitVisionOptions): MLKVisionImage {
  const image: UIImage = options.image instanceof ImageSource ? options.image.ios : options.image.imageSource.ios;
  return MLKVisionImage.alloc().initWithImage(image);
}
