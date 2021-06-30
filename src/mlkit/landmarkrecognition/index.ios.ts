import { ImageSource } from "@nativescript/core";
import { MLKitVisionOptions } from "../";
import { MLKitLandmarkRecognitionCloudOptions, MLKitLandmarkRecognitionCloudResult } from "./";
import { MLKitCloudModelType } from "../index";

function getDetector(modelType: MLKitCloudModelType, maxResults: number): any {
  // TODO: NOT IMPLEMENTED YET
  /*const MLK: MLK = MLK.vision();
  const MLKCloudDetectorOptions = MLKCloudDetectorOptions.alloc();
  MLKCloudDetectorOptions.modelType = modelType === "latest" ? MLKCloudModelType.Latest : MLKCloudModelType.Stable;
  MLKCloudDetectorOptions.maxResults = maxResults || 10;
  return MLK.cloudLandmarkDetectorWithOptions(MLKCloudDetectorOptions);*/
  return null;
}

export function recognizeLandmarksCloud(options: MLKitLandmarkRecognitionCloudOptions): Promise<MLKitLandmarkRecognitionCloudResult> {
  return new Promise((resolve, reject) => {
    // TODO 
    reject("NOT IMPLEMENTED YET");
    /*
    try {
      const landmarkDetector = getDetector(options.modelType, options.maxResults);

      landmarkDetector.detectInImageCompletion(getImage(options), (landmarks: NSArray<MLKCloudLandmark>, error: NSError) => {
        if (error !== null) {
          reject(error.localizedDescription);

        } else if (landmarks !== null) {
          const result = <MLKitLandmarkRecognitionCloudResult>{
            landmarks: []
          };

          for (let i = 0, l = landmarks.count; i < l; i++) {
            const landmark: MLKCloudLandmark = landmarks.objectAtIndex(i);
            console.log(">> detected landmark: " + landmark);
            result.landmarks.push({
              name: landmark.landmark,
              confidence: landmark.confidence
            });
          }

          resolve(result);
        }
      });
    } catch (ex) {
      console.log("Error in firebase.mlkit.recognizeLandmarksCloud: " + ex);
      reject(ex);
    }
    */
  });
}

function getImage(options: MLKitVisionOptions): MLKVisionImage {
  const image: UIImage = options.image instanceof ImageSource ? options.image.ios : options.image.imageSource.ios;
  return MLKVisionImage.alloc().initWithImage(image);
}
