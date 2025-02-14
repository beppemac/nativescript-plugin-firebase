// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScript } from "@nativescript/angular";
import { AppModuleNgFactory } from "./app.module.ngfactory";

require("nativescript-plugin-firebase");

platformNativeScript().bootstrapModuleFactory(AppModuleNgFactory);
