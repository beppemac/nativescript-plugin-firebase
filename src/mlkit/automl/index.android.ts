import { ImageSource } from "@nativescript/core";
import { MLKitVisionOptions, } from "../";
import { MLKitAutoMLOptions, MLKitAutoMLResult } from "./";
import { MLKitAutoML as MLKitAutoMLBase } from "./automl-common";

export class MLKitAutoML extends MLKitAutoMLBase {

  protected createDetector(): any {
    return getDetector(this.localModelResourceFolder, this.confidenceThreshold);
  }

  protected createSuccessListener(): any {
    return new (<any>com.google.android.gms).tasks.OnSuccessListener({
      onSuccess: labels => {

        if (labels.size() === 0) return;

        // const imageSource = new ImageSource();
        // imageSource.setNativeSource(this.lastVisionImage.getBitmapForDebugging());

        const result = <MLKitAutoMLResult>{
          // imageSource: imageSource,
          labels: []
        };

        // see https://github.com/firebase/quickstart-android/blob/0f4c86877fc5f771cac95797dffa8bd026dd9dc7/mlkit/app/src/main/java/com/google/firebase/samples/apps/mlkit/textrecognition/TextRecognitionProcessor.java#L62
        for (let i = 0; i < labels.size(); i++) {
          const label: com.google.mlkit.vision.label.ImageLabel = labels.get(i);
          result.labels.push({
            text: label.getText(),
            confidence: label.getConfidence()
          });
        }

        this.notify({
          eventName: MLKitAutoML.scanResultEvent,
          object: this,
          value: result
        });
      }
    });
  }
}

function getDetector(localModelResourceFolder: string, confidenceThreshold: number): com.google.mlkit.vision.label.ImageLabeler {
  // TODO also support cloud hosted models
  const model = new com.google.mlkit.common.model.LocalModel.Builder()
      .setAssetManifestFilePath(localModelResourceFolder + "/manifest.json") // we can use this..
      // .setFilePath() // .. or this
      .build();

  const labelDetectorOptions =
      new com.google.mlkit.vision.label.custom.CustomImageLabelerOptions.Builder(model)
          .setConfidenceThreshold(confidenceThreshold)
          .build();

  return com.google.mlkit.vision.label.ImageLabeling.getClient(labelDetectorOptions);
}

export function labelImage(options: MLKitAutoMLOptions): Promise<MLKitAutoMLResult> {
  return new Promise((resolve, reject) => {
    try {
      const firebaseVisionAutoMLImageLabeler = getDetector(options.localModelResourceFolder, options.confidenceThreshold || 0.5);

      const onSuccessListener = new (<any>com.google.android.gms).tasks.OnSuccessListener({
        onSuccess: labels => {
          const result = <MLKitAutoMLResult>{
            labels: []
          };

          if (labels) {
            for (let i = 0; i < labels.size(); i++) {
              const label: com.google.mlkit.vision.label.ImageLabel = labels.get(i);
              result.labels.push({
                text: label.getText(),
                confidence: label.getConfidence()
              });
            }
          }

          resolve(result);
          firebaseVisionAutoMLImageLabeler.close();
        }
      });

      const onFailureListener = new (<any>com.google.android.gms).tasks.OnFailureListener({
        onFailure: exception => reject(exception.getMessage())
      });

      firebaseVisionAutoMLImageLabeler
          .process(getImage(options))
          .addOnSuccessListener(onSuccessListener)
          .addOnFailureListener(onFailureListener);

    } catch (ex) {
      console.log("Error in firebase.mlkit.labelImageOnDevice: " + ex);
      reject(ex);
    }
  });
}

function getImage(options: MLKitVisionOptions): any /* com.google.firebase.ml.vision.common.FirebaseVisionImage */ {
  const image: android.graphics.Bitmap = options.image instanceof ImageSource ? options.image.android : options.image.imageSource.android;
  return com.google.mlkit.vision.common.InputImage.fromBitmap(image, 0);
}
