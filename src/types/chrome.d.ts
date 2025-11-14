declare namespace chrome {
  export namespace storage {
    export namespace local {
      export function get(
        keys: string | string[] | { [key: string]: any },
        callback: (items: { [key: string]: any }) => void
      ): void;
      export function set(items: { [key: string]: any }, callback?: () => void): void;
      export function clear(callback?: () => void): void;
    }
  }

  export namespace runtime {
    export function sendMessage(
      message: any,
      callback?: (response: any) => void
    ): void;
    export const lastError: { message: string } | undefined;
  }

  export namespace identity {
    export function getRedirectURL(): string;
    export function launchWebAuthFlow(
      options: { url: string; interactive: boolean },
      callback: (responseUrl?: string) => void
    ): void;
  }

  export namespace action {
    export const onClicked: {
      addListener(callback: (tab: any) => void): void;
    };
  }

  export namespace windows {
    export function create(
      options: {
        url: string;
        type: string;
        width: number;
        height: number;
      },
      callback?: (window: any) => void
    ): void;
  }
}
