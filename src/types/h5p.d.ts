
// H5P type declarations
declare global {
  interface Window {
    H5P?: {
      externalDispatcher?: {
        on: (event: string, callback: (event: any) => void) => void;
        off: (event: string, callback: (event: any) => void) => void;
      };
      init?: () => void;
      jQuery?: any;
    };
  }

  namespace H5P {
    interface XAPIEvent {
      getVerb(): string;
      getScore(): {
        scaled: number;
        raw: number;
        min: number;
        max: number;
      } | null;
      getObject(): any;
      getActor(): any;
    }
  }
}

export {};
