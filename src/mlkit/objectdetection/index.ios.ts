import { ImageSource, Utils } from "@nativescript/core";
import { MLKitVisionOptions } from "../";
import { MLKitObjectDetectionOptions, MLKitObjectDetectionResult, MLKitObjectDetectionResultItem } from "./";
import { MLKitObjectDetection as MLKitObjectDetectionBase, ObjectDetectionCategory } from "./objectdetection-common";

export class MLKitObjectDetection extends MLKitObjectDetectionBase {

  protected createDetector(): any {
    return getDetector(true, this.classify, this.multiple);
  }

  protected createSuccessListener(): any {
    return (objects: NSArray<MLKObject>, error: NSError) => {
      if (error !== null) {
        console.log(error.localizedDescription);

      } else if (objects !== null && objects.count > 0) {
        const result = <MLKitObjectDetectionResult>{
          objects: []
        };

        for (let i = 0, l = objects.count; i < l; i++) {
          const obj: MLKObject = objects.objectAtIndex(i);
          result.objects.push(getMLKitObjectDetectionResultItem(obj, this.lastVisionImage));
        }

        this.notify({
          eventName: MLKitObjectDetection.scanResultEvent,
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

function getDetector(stream: boolean, classify: boolean, multiple: boolean): MLKObjectDetector {
  const mlkObjectDetectorOptions = MLKObjectDetectorOptions.new();
  mlkObjectDetectorOptions.detectorMode = stream ? MLKObjectDetectorModeStream : MLKObjectDetectorModeSingleImage;
  mlkObjectDetectorOptions.shouldEnableClassification = classify || false;
  mlkObjectDetectorOptions.shouldEnableMultipleObjects = multiple || false;
  return MLKObjectDetector.objectDetectorWithOptions(mlkObjectDetectorOptions);
}

export function detectObjects(options: MLKitObjectDetectionOptions): Promise<MLKitObjectDetectionResult> {
  return new Promise((resolve, reject) => {
    try {
      const detector = getDetector(false, options.classify, options.multiple);
      detector.processImageCompletion(getImage(options), (objects: NSArray<MLKObject>, error: NSError) => {
        if (error !== null) {
          reject(error.localizedDescription);

        } else if (objects !== null) {
          const result = <MLKitObjectDetectionResult>{
            objects: []
          };

          const image: UIImage = options.image instanceof ImageSource ? options.image.ios : options.image.imageSource.ios;
          for (let i = 0, l = objects.count; i < l; i++) {
            const obj: MLKObject = objects.objectAtIndex(i);
            result.objects.push(getMLKitObjectDetectionResultItem(obj, image));
          }
          resolve(result);
        }
      });
    } catch (ex) {
      console.log("Error in firebase.mlkit.detectObjects: " + ex);
      reject(ex);
    }
  });
}

function getMLKitObjectDetectionResultItem(detected: MLKObject, image: UIImage): MLKitObjectDetectionResultItem {
  console.log(">> getMLKitObjectDetectionResultItem, image: " + image);

  let imageWidth;
  let imageHeight;

  // the iOS image is rotated, so compensate for it when reporting these
  let { x, y } = detected.frame.origin;
  let { width, height } = detected.frame.size;

  if (image) {
    imageWidth = image.size.width;
    imageHeight = image.size.height;

    const origX = x;
    const origWidth = width;
    const origImageWidth = imageWidth;

    if (Utils.ios.isLandscape()) {
      if (UIDevice.currentDevice.orientation === UIDeviceOrientation.LandscapeRight) {
        // the image is rotated 180 degrees
        x = image.size.width - (width + x);
        y = image.size.height - (height + y);
      }
    } else {
      // the image is rotated 90 degrees to the left
      x = image.size.height - (height + y);
      y = origX;
      width = height;
      height = origWidth;
      imageWidth = imageHeight;
      imageHeight = origImageWidth;
    }
  }

  for (let i = 0; i < detected.labels.count; i++) {
    const obj: MLKObjectLabel = detected.labels.objectAtIndex(i);
    return {
      id: detected.trackingID,
      category: ObjectDetectionCategory[obj.text],
      confidence: obj.confidence,
      ios: obj,
      bounds: {
        origin: {
          x,
          y
        },
        size: {
          width,
          height
        }
      },
      image: {
        width: imageWidth,
        height: imageHeight
      }
    }
  }

  return null;

  
}

function getImage(options: MLKitVisionOptions): MLKVisionImage {
  const image: UIImage = options.image instanceof ImageSource ? options.image.ios : options.image.imageSource.ios;
  return MLKVisionImage.alloc().initWithImage(image);
}
