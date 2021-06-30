import { platformNativeScriptDynamic } from "@nativescript/angular";

import { AppModule } from "./app.module";

require("nativescript-plugin-firebase");

platformNativeScriptDynamic().bootstrapModule(AppModule);
