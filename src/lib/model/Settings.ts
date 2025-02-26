import { HalResource } from '../hal/models/HalResource';

/**
 * Device
 */
export interface Device {
  name: string;
  width: number;
  height: number;
  orientate: boolean;
}

/**
 * VSE
 */
export interface VSE {
  hostname: string;
}

/**
 * Application
 */
export interface Application {
  name: string;
  templatedUri: string;
}

/**
 * Locales
 */
export interface Locale {
  locales: string[];
}

/**
 * validation
 */
export interface ContentItems {
  contentItems: {
    validation: {
      ignoreSchemaValidation: boolean;
    };
  };
}

/**
 * Hub settings
 */
export class Settings extends HalResource {
  public virtualStagingEnvironment?: VSE;
  public previewVirtualStagingEnvironment?: VSE;
  public applications?: Application[];
  public devices?: Device[];
  public localization?: Locale;
  public ContentItems?: ContentItems;
}
