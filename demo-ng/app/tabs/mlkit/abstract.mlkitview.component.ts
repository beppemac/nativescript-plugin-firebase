import { PropertyChangeData } from '@nativescript/core';

export abstract class AbstractMLKitViewComponent {
  torchOn: boolean = false;

  toggleTorch(args: PropertyChangeData): void {
    if (args.value !== null && args.value !== this.torchOn) {
      this.torchOn = args.value;
    }
  }
}
