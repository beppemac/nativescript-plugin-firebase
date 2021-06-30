import { ImageSource } from "@nativescript/core";
import { MLKitAutoMLResult, MLKitAutoMLOptions } from "./index";
import { MLKitVisionOptions } from "../index";
import { MLKitAutoML as MLKitAutoMLBase } from "./automl-common";

export class MLKitAutoML extends MLKitAutoMLBase {

  protected createDetector(): any {
    return getDetector(this.localModelResourceFolder, this.confidenceThreshold);
  }

  protected createSuccessListener(): any {
    return (labels: NSArray<MLKImageLabel>, error: NSError) => {
      if (error !== null) {
        console.log(error.localizedDescription);

      } else if (labels !== null && labels.count > 0) {
        const result = <MLKitAutoMLResult>{
          labels: []
        };

        for (let i = 0, l = labels.count; i < l; i++) {
          const label: MLKImageLabel = labels.objectAtIndex(i);
          result.labels.push({
            text: label.text,
            confidence: label.confidence
          });
        }

        this.notify({
          eventName: MLKitAutoML.scanResultEvent,
          object: this,
          value: result
        });
      }
    }
  }

  protected rotateRecording(): boolean {
    return true;
  }
}

function getDetector(localModelResourceFolder: string, confidenceThreshold?: number): MLKImageLabeler {
  const manifestPath = NSBundle.mainBundle.pathForResourceOfTypeInDirectory("manifest", "json", localModelResourceFolder);
  const fIRAutoMLLocalModel = MLKLocalModel.alloc().initWithManifestPath(manifestPath);

  const options = MLKCustomImageLabelerOptions.alloc().initWithLocalModel(fIRAutoMLLocalModel);
  options.confidenceThreshold = confidenceThreshold || 0.5;
  const mlkImageLabeler = MLKImageLabeler.imageLabelerWithOptions(options);

  // TODO also support cloud hosted models
  return mlkImageLabeler;
}

export function labelImage(options: MLKitAutoMLOptions): Promise<MLKitAutoMLResult> {
  return new Promise((resolve, reject) => {
    try {
      const labelDetector = getDetector(options.localModelResourceFolder, options.confidenceThreshold);

      labelDetector.processImageCompletion(getImage(options), (labels: NSArray<MLKImageLabel>, error: NSError) => {
        if (error !== null) {
          reject(error.localizedDescription);

        } else if (labels !== null) {
          const result = <MLKitAutoMLResult>{
            labels: []
          };

          for (let i = 0, l = labels.count; i < l; i++) {
            const label: MLKImageLabel = labels.objectAtIndex(i);
            result.labels.push({
              text: label.text,
              confidence: label.confidence
            });
          }
          resolve(result);
        }
      });
    } catch (ex) {
      console.log("Error in firebase.mlkit.labelImageOnDevice: " + ex);
      reject(ex);
    }
  });
}

function getImage(options: MLKitVisionOptions): MLKVisionImage {
  const image: UIImage = options.image instanceof ImageSource ? options.image.ios : options.image.imageSource.ios;
  return MLKVisionImage.alloc().initWithImage(image);
}
