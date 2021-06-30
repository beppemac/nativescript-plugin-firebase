/// <reference path="android-declarations.d.ts"/>

declare module com {
	export module google {
		export module android {
			export module gms {
				export module internal {
					export module mlkit_vision_label_common {
						export class zza {
							public static class: java.lang.Class<com.google.android.gms.internal.mlkit_vision_label_common.zza>;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module google {
		export module android {
			export module gms {
				export module internal {
					export module mlkit_vision_label_common {
						export class zzb {
							public static class: java.lang.Class<com.google.android.gms.internal.mlkit_vision_label_common.zzb>;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module google {
		export module android {
			export module gms {
				export module internal {
					export module mlkit_vision_label_common {
						export class zzc {
							public static class: java.lang.Class<com.google.android.gms.internal.mlkit_vision_label_common.zzc>;
							public toString(): string;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module google {
		export module android {
			export module gms {
				export module internal {
					export module mlkit_vision_label_common {
						export class zzd {
							public static class: java.lang.Class<com.google.android.gms.internal.mlkit_vision_label_common.zzd>;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module google {
		export module android {
			export module gms {
				export module internal {
					export module mlkit_vision_label_common {
						export class zze {
							public static class: java.lang.Class<com.google.android.gms.internal.mlkit_vision_label_common.zze>;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module google {
		export module android {
			export module gms {
				export module internal {
					export module mlkit_vision_label_common {
						export class zzf {
							public static class: java.lang.Class<com.google.android.gms.internal.mlkit_vision_label_common.zzf>;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module google {
		export module android {
			export module gms {
				export module internal {
					export module mlkit_vision_label_common {
						export class zzg {
							public static class: java.lang.Class<com.google.android.gms.internal.mlkit_vision_label_common.zzg>;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module google {
		export module android {
			export module gms {
				export module internal {
					export module mlkit_vision_label_common {
						export class zzh {
							public static class: java.lang.Class<com.google.android.gms.internal.mlkit_vision_label_common.zzh>;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module google {
		export module mlkit {
			export module vision {
				export module label {
					export class ImageLabel {
						public static class: java.lang.Class<com.google.mlkit.vision.label.ImageLabel>;
						public getConfidence(): number;
						public constructor(param0: string, param1: number, param2: number);
						public equals(param0: any): boolean;
						public hashCode(): number;
						public getIndex(): number;
						public getText(): string;
						public constructor(param0: string, param1: number, param2: number, param3: string);
						public toString(): string;
					}
				}
			}
		}
	}
}

declare module com {
	export module google {
		export module mlkit {
			export module vision {
				export module label {
					export class ImageLabeler extends com.google.mlkit.vision.common.internal.Detector<java.util.List<com.google.mlkit.vision.label.ImageLabel>> {
						public static class: java.lang.Class<com.google.mlkit.vision.label.ImageLabeler>;
						/**
						 * Constructs a new instance of the com.google.mlkit.vision.label.ImageLabeler interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							process(param0: com.google.mlkit.vision.common.InputImage): com.google.android.gms.tasks.Task<java.util.List<com.google.mlkit.vision.label.ImageLabel>>;
							close(): void;
						});
						public constructor();
						public close(): void;
						public process(param0: com.google.mlkit.vision.common.InputImage): com.google.android.gms.tasks.Task<java.util.List<com.google.mlkit.vision.label.ImageLabel>>;
					}
				}
			}
		}
	}
}

declare module com {
	export module google {
		export module mlkit {
			export module vision {
				export module label {
					export abstract class ImageLabelerOptionsBase extends com.google.mlkit.vision.common.internal.MultiFlavorDetectorCreator.DetectorOptions<java.util.List<com.google.mlkit.vision.label.ImageLabel>> {
						public static class: java.lang.Class<com.google.mlkit.vision.label.ImageLabelerOptionsBase>;
						public constructor(param0: com.google.mlkit.vision.label.ImageLabelerOptionsBase.Builder<any>);
						public getConfidenceThreshold(): number;
						public equals(param0: any): boolean;
						public hashCode(): number;
						public getExecutor(): java.util.concurrent.Executor;
					}
					export module ImageLabelerOptionsBase {
						export abstract class Builder<B>  extends java.lang.Object {
							public static class: java.lang.Class<com.google.mlkit.vision.label.ImageLabelerOptionsBase.Builder<any>>;
							public constructor();
							public build(): com.google.mlkit.vision.label.ImageLabelerOptionsBase;
							public setConfidenceThreshold(param0: number): B;
							public setExecutor(param0: java.util.concurrent.Executor): B;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module google {
		export module mlkit {
			export module vision {
				export module label {
					export class ImageLabeling {
						public static class: java.lang.Class<com.google.mlkit.vision.label.ImageLabeling>;
						public static getClient(param0: com.google.mlkit.vision.label.ImageLabelerOptionsBase): com.google.mlkit.vision.label.ImageLabeler;
					}
				}
			}
		}
	}
}

declare module com {
	export module google {
		export module mlkit {
			export module vision {
				export module label {
					export module defaults {
						export class ImageLabelerOptions extends com.google.mlkit.vision.label.ImageLabelerOptionsBase {
							public static class: java.lang.Class<com.google.mlkit.vision.label.defaults.ImageLabelerOptions>;
							public static DEFAULT_OPTIONS: com.google.mlkit.vision.label.defaults.ImageLabelerOptions;
						}
						export module ImageLabelerOptions {
							export class Builder extends com.google.mlkit.vision.label.ImageLabelerOptionsBase.Builder<com.google.mlkit.vision.label.defaults.ImageLabelerOptions.Builder> {
								public static class: java.lang.Class<com.google.mlkit.vision.label.defaults.ImageLabelerOptions.Builder>;
								public build(): com.google.mlkit.vision.label.defaults.ImageLabelerOptions;
								public setExecutor(param0: java.util.concurrent.Executor): com.google.mlkit.vision.label.defaults.ImageLabelerOptions.Builder;
								public constructor();
								public build(): com.google.mlkit.vision.label.ImageLabelerOptionsBase;
								public setExecutor(param0: java.util.concurrent.Executor): any;
								public setConfidenceThreshold(param0: number): com.google.mlkit.vision.label.defaults.ImageLabelerOptions.Builder;
								public setConfidenceThreshold(param0: number): any;
							}
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module google {
		export module mlkit {
			export module vision {
				export module label {
					export module defaults {
						export class zza {
							public static class: java.lang.Class<com.google.mlkit.vision.label.defaults.zza>;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module google {
		export module mlkit {
			export module vision {
				export module label {
					export module internal {
						export class ImageLabelerImpl extends com.google.mlkit.vision.label.ImageLabeler {
							public static class: java.lang.Class<com.google.mlkit.vision.label.internal.ImageLabelerImpl>;
							public close(): void;
							public process(param0: com.google.mlkit.vision.common.InputImage): com.google.android.gms.tasks.Task<java.util.List<com.google.mlkit.vision.label.ImageLabel>>;
						}
					}
				}
			}
		}
	}
}

//Generics information:
//com.google.mlkit.vision.label.ImageLabelerOptionsBase.Builder:1

