import { Component } from "@angular/core";
import { isAndroid, SelectedIndexChangedEventData, TabView } from '@nativescript/core';

@Component({
  selector: "TabsComponent",
  moduleId: module.id,
  templateUrl: "./tabs.component.html"
})
export class TabsComponent {
  private _title: string;

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    if (this._title !== value) {
      this._title = value;
    }
  }

  getIconSource(icon: string): string {
    return isAndroid ? "" : "res://tabIcons/" + icon;
  }

  onSelectedIndexChanged(args: SelectedIndexChangedEventData) {
    const tabView = <TabView>args.object;
    const selectedTabViewItem = tabView.items[args.newIndex];

    this.title = selectedTabViewItem.title;
  }
}
