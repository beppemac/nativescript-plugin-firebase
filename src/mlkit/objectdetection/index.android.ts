import { ImageSource } from "@nativescript/core";
import { MLKitVisionOptions, } from "../";
import { MLKitScanBarcodesResultBounds } from "../barcodescanning";
import { MLKitObjectDetectionOptions, MLKitObjectDetectionResult, MLKitObjectDetectionResultItem } from "./";
import { MLKitObjectDetection as MLKitObjectDetectionBase, ObjectDetectionCategory } from "./objectdetection-common";

export class MLKitObjectDetection extends MLKitObjectDetectionBase {

  protected createDetector(): any {
    return getDetector(this.classify, this.multiple);
  }

  protected createSuccessListener(): any {
    return new (<any>com.google.android.gms).tasks.OnSuccessListener({
      onSuccess: objects => {
        console.log(">> onSuccess @ " + new Date().getTime() + ", objects: " + objects.size());

        if (objects.size() === 0) return;

        const result = <MLKitObjectDetectionResult>{
          objects: []
        };

        const image: android.graphics.Bitmap = this.lastVisionImage && this.lastVisionImage.getBitmap ? this.lastVisionImage.getBitmap() : null;

        // see https://github.com/firebase/quickstart-android/blob/0f4c86877fc5f771cac95797dffa8bd026dd9dc7/mlkit/app/src/main/java/com/google/firebase/samples/apps/mlkit/textrecognition/TextRecognitionProcessor.java#L62
        for (let i = 0; i < objects.size(); i++) {
          result.objects.push(getMLKitObjectDetectionResultItem(objects.get(i), image));
        }

        this.notify({
          eventName: MLKitObjectDetection.scanResultEvent,
          object: this,
          value: result
        });
      }
    });
  }
}

function getDetector(classify: boolean, multiple: boolean): com.google.mlkit.vision.objects.ObjectDetector {
  const builder = new com.google.mlkit.vision.objects.defaults.ObjectDetectorOptions.Builder()
      .setDetectorMode(com.google.mlkit.vision.objects.defaults.ObjectDetectorOptions.SINGLE_IMAGE_MODE);

  if (classify) {
    builder.enableClassification();
  }

  if (multiple) {
    builder.enableMultipleObjects();
  }

  return com.google.mlkit.vision.objects.ObjectDetection.getClient(builder.build());
}

export function detectObjects(options: MLKitObjectDetectionOptions): Promise<MLKitObjectDetectionResult> {
  return new Promise((resolve, reject) => {
    try {
      const firebaseObjectDetector = getDetector(options.classify, options.multiple);

      const image: android.graphics.Bitmap = options.image instanceof ImageSource ? options.image.android : options.image.imageSource.android;
      const firImage = com.google.mlkit.vision.common.InputImage.fromBitmap(image, 0);

      const onSuccessListener = new (<any>com.google.android.gms).tasks.OnSuccessListener({
        onSuccess: objects => {
          const result = <MLKitObjectDetectionResult>{
            objects: []
          };

          if (objects) {
            for (let i = 0; i < objects.size(); i++) {
              result.objects.push(getMLKitObjectDetectionResultItem(objects.get(i), image));
            }
          }

          resolve(result);
          firebaseObjectDetector.close();
        }
      });

      const onFailureListener = new (<any>com.google.android.gms).tasks.OnFailureListener({
        onFailure: exception => reject(exception.getMessage())
      });

      firebaseObjectDetector
          .process(firImage)
          .addOnSuccessListener(onSuccessListener)
          .addOnFailureListener(onFailureListener);

    } catch (ex) {
      console.log("Error in firebase.mlkit.labelImageOnDevice: " + ex);
      reject(ex);
    }
  });
}

function getMLKitObjectDetectionResultItem(detected: com.google.mlkit.vision.objects.DetectedObject, image: android.graphics.Bitmap): MLKitObjectDetectionResultItem {
  for (let i = 0; i < detected.getLabels().size(); i++) {
    const obj: com.google.mlkit.vision.objects.DetectedObject.Label = detected.getLabels().get(i);
    return {
      id: detected.getTrackingId() ? detected.getTrackingId().intValue() : undefined,
      confidence: obj.getConfidence() ? obj.getConfidence() : undefined,
      category: ObjectDetectionCategory[obj.getText()],
      bounds: boundingBoxToBounds(detected.getBoundingBox()),
      image: !image ? null : {
        width: image.getWidth(),
        height: image.getHeight()
      }
    };
  }
  return null;
  
}

function getImage(options: MLKitVisionOptions): any /* com.google.firebase.ml.vision.common.FirebaseVisionImage */ {
  const image: android.graphics.Bitmap = options.image instanceof ImageSource ? options.image.android : options.image.imageSource.android;
  return com.google.mlkit.vision.common.InputImage.fromBitmap(image, 0);
}

function boundingBoxToBounds(rect: any): MLKitScanBarcodesResultBounds {
  return {
    origin: {
      x: rect.left,
      y: rect.top
    },
    size: {
      width: rect.width(),
      height: rect.height()
    }
  };
}