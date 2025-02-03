/**
 * Enum for the global alert level
 * @enum
 */
export enum GlobalAlertLevel {
    Unkown = 0,
    Blue = 1,
    Yellow = 2,
    Red = 3
  }
  
  /**
   * Enum for the global alert type
   * @enum
   */
  export enum GlobalAlertType {
    GlobalAlert = 0,
    StreamingAlert = 1
  }

  /**
 * Interface for defining an object for the Traveler class
 * @interface
 */
export interface TravelerConfig {
    apikey: string;
    userAgent: string;
    oauthClientId?: string;
    oauthClientSecret?: string;
    debug?: boolean;
  }

  export interface StreamInfo {
    ChannelName: string;
  }

  export interface GlobalAlert {
    AlertKey: string;
    AlertHtml: string;
    AlerTimestamp: Date;
    AlertLink: string;
    AlertLevel: GlobalAlertLevel;
    AlertType: GlobalAlertType;
    StreamInfo: StreamInfo;
  }

  /**
 * Interface for defining an object for the OAuth response
 * @interface
 */
export interface OAuthResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
    refresh_token?: string;
    refresh_expires_in?: number;
    membership_id: string;
  }