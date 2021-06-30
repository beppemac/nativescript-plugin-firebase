import { ImageSource } from "@nativescript/core";
import { MLKitDetectFacesOnDeviceOptions, MLKitDetectFacesOnDeviceResult, MLKitDetectFacesResultBounds } from "./";
import { MLKitVisionOptions } from "../";
import { MLKitFaceDetection as MLKitFaceDetectionBase } from "./facedetection-common";

export class MLKitFaceDetection extends MLKitFaceDetectionBase {

  protected createDetector(): any {
    return getFaceDetector({
      detectionMode: this.detectionMode,
      enableFaceTracking: this.enableFaceTracking,
      minimumFaceSize: this.minimumFaceSize
    });
  }

  protected createSuccessListener(): any {
    return new (<any>com.google.android.gms).tasks.OnSuccessListener({
      onSuccess: faces => {

        if (!faces || faces.size() === 0) return;

        // const imageSource = new ImageSource();
        // imageSource.setNativeSource(this.lastVisionImage.getBitmapForDebugging());

        const result = <MLKitDetectFacesOnDeviceResult>{
          // imageSource: imageSource,
          faces: []
        };

        // see https://github.com/firebase/quickstart-android/blob/0f4c86877fc5f771cac95797dffa8bd026dd9dc7/mlkit/app/src/main/java/com/google/firebase/samples/apps/mlkit/textrecognition/TextRecognitionProcessor.java#L62
        for (let i = 0; i < faces.size(); i++) {
          const face = faces.get(i);
          result.faces.push({
            bounds: boundingBoxToBounds(face.getBoundingBox()),
            smilingProbability: face.getSmilingProbability() != null ? face.getSmilingProbability() : undefined,
            leftEyeOpenProbability: face.getLeftEyeOpenProbability() != null ? face.getLeftEyeOpenProbability() : undefined,
            rightEyeOpenProbability: face.getRightEyeOpenProbability() != null ? face.getRightEyeOpenProbability() : undefined,
            trackingId: face.getTrackingId() != null ? face.getTrackingId() : undefined,
            headEulerAngleY: face.getHeadEulerAngleY(),
            headEulerAngleZ: face.getHeadEulerAngleZ()
          });
        }

        this.notify({
          eventName: MLKitFaceDetection.scanResultEvent,
          object: this,
          value: result
        });
      }
    });
  }
}

function getFaceDetector(options: MLKitDetectFacesOnDeviceOptions): any {
  const builder = new com.google.mlkit.vision.face.FaceDetectorOptions.Builder()
      .setPerformanceMode(options.detectionMode === "accurate" ? com.google.mlkit.vision.face.FaceDetectorOptions.PERFORMANCE_MODE_ACCURATE : com.google.mlkit.vision.face.FaceDetectorOptions.PERFORMANCE_MODE_FAST)
      .setLandmarkMode(com.google.mlkit.vision.face.FaceDetectorOptions.LANDMARK_MODE_ALL) // TODO make configurable
      .setClassificationMode(com.google.mlkit.vision.face.FaceDetectorOptions.CLASSIFICATION_MODE_ALL) // TODO make configurable
      .setMinFaceSize(options.minimumFaceSize);

  if (options.enableFaceTracking === true) {
    builder.enableTracking();
  }

  return com.google.mlkit.vision.face.FaceDetection.getClient(builder.build());
}

function boundingBoxToBounds(rect: any): MLKitDetectFacesResultBounds {
  return {
    origin: {
      x: rect.left,
      y: rect.top
    },
    size: {
      width: rect.width(),
      height: rect.height()
    }
  }
}

export function detectFacesOnDevice(options: MLKitDetectFacesOnDeviceOptions): Promise<MLKitDetectFacesOnDeviceResult> {
  return new Promise((resolve, reject) => {
    try {
      const firebaseVisionFaceDetector = getFaceDetector(options);

      const onSuccessListener = new (<any>com.google.android.gms).tasks.OnSuccessListener({
        onSuccess: faces => {

          const result = <MLKitDetectFacesOnDeviceResult>{
            faces: []
          };

          if (faces) {
            // see https://github.com/firebase/quickstart-android/blob/0f4c86877fc5f771cac95797dffa8bd026dd9dc7/mlkit/app/src/main/java/com/google/firebase/samples/apps/mlkit/textrecognition/TextRecognitionProcessor.java#L62
            for (let i = 0; i < faces.size(); i++) {
              const face = faces.get(i);
              result.faces.push({
                bounds: boundingBoxToBounds(face.getBoundingBox()),
                smilingProbability: face.getSmilingProbability() != null ? face.getSmilingProbability() : undefined,
                leftEyeOpenProbability: face.getLeftEyeOpenProbability() != null ? face.getLeftEyeOpenProbability() : undefined,
                rightEyeOpenProbability: face.getRightEyeOpenProbability() != null ? face.getRightEyeOpenProbability() : undefined,
                trackingId: face.getTrackingId() != null ? face.getTrackingId() : undefined,
                headEulerAngleY: face.getHeadEulerAngleY(),
                headEulerAngleZ: face.getHeadEulerAngleZ()
              });
            }
          }

          resolve(result);
          firebaseVisionFaceDetector.close();
        }
      });

      const onFailureListener = new (<any>com.google.android.gms).tasks.OnFailureListener({
        onFailure: exception => reject(exception.getMessage())
      });

      firebaseVisionFaceDetector
          .detectInImage(getImage(options))
          .addOnSuccessListener(onSuccessListener)
          .addOnFailureListener(onFailureListener);

    } catch (ex) {
      console.log("Error in firebase.mlkit.detectFacesOnDevice: " + ex);
      reject(ex);
    }
  });
}

function getImage(options: MLKitVisionOptions): any /* com.google.firebase.ml.vision.common.FirebaseVisionImage */ {
  const image: android.graphics.Bitmap = options.image instanceof ImageSource ? options.image.android : options.image.imageSource.android;
  return com.google.mlkit.vision.common.InputImage.fromBitmap(image, 0);
}
