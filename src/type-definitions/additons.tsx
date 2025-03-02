

/**
 * Enum for the global alert level
 * @enum
 */

/// <reference types="node"/>

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

  export interface DictionaryResponse<S> {
    [key: string]: S;
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

  export enum TypeDefinition {
    DestinyActivityGraphDefinition = 'DestinyActivityGraphDefinition',
    DestinyActivityModeDefinition = 'DestinyActivityModeDefinition',
    DestinyActivityModifierDefinition = 'DestinyActivityModifierDefinition',
    DestinyActivityTypeDefinition = 'DestinyActivityTypeDefinition',
    DestinyBondDefinition = 'DestinyBondDefinition',
    DestinyClassDefinition = 'DestinyClassDefinition',
    DestinyDamageTypeDefinition = 'DestinyDamageTypeDefinition',
    DestinyDestinationDefinition = 'DestinyDestinationDefinition',
    DestinyEnemyRaceDefinition = 'DestinyEnemyRaceDefinition',
    DestinyFactionDefinition = 'DestinyFactionDefinition',
    DestinyGenderDefinition = 'DestinyGenderDefinition',
    DestinyHistoricalStatsDefinition = 'DestinyHistoricalStatsDefinition',
    DestinyInventoryBucketDefinition = 'DestinyInventoryBucketDefinition',
    DestinyInventoryItemDefinition = 'DestinyInventoryItemDefinition',
    DestinyItemCategoryDefinition = 'DestinyItemCategoryDefinition',
    DestinyItemTierTypeDefinition = 'DestinyItemTierTypeDefinition',
    DestinyLocationDefinition = 'DestinyLocationDefinition',
    DestinyLoreDefinition = 'DestinyLoreDefinition',
    DestinyMedalTierDefinition = 'DestinyMedalTierDefinition',
    DestinyMilestoneDefinition = 'DestinyMilestoneDefinition',
    DestinyObjectiveDefinition = 'DestinyObjectiveDefinition',
    DestinyPlaceDefinition = 'DestinyPlaceDefinition',
    DestinyProgressionDefinition = 'DestinyProgressionDefinition',
    DestinyProgressionLevelRequirementDefinition = 'DestinyProgressionLevelRequirementDefinition',
    DestinyRaceDefinition = 'DestinyRaceDefinition',
    DestinyRewardSourceDefinition = 'DestinyRewardSourceDefinition',
    DestinySackRewardItemListDefinition = 'DestinySackRewardItemListDefinition',
    DestinySandboxPerkDefinition = 'DestinySandboxPerkDefinition',
    DestinySocketCategoryDefinition = 'DestinySocketCategoryDefinition',
    DestinySocketTypeDefinition = 'DestinySocketTypeDefinition',
    DestinyStatDefinition = 'DestinyStatDefinition',
    DestinyStatGroupDefinition = 'DestinyStatGroupDefinition',
    DestinyTalentGridDefinition = 'DestinyTalentGridDefinition',
    DestinyUnlockDefinition = 'DestinyUnlockDefinition',
    DestinyVendorCategoryDefinition = 'DestinyVendorCategoryDefinition',
    DestinyVendorDefinition = 'DestinyVendorDefinition'
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


  export interface QueryStringParameters {
    //components?: DestinyComponentType[];
    //modes?: DestinyActivityModeType[];
    //mode?: DestinyActivityModeType;
    maxtop?: number;
    statid?: string;
    page?: number;
    dayend?: string;
    daystart?: string;
    //groups?: DestinyStatsGroupType[];
    //periodType?: PeriodType;
    count?: number;
    [key: string]: any;
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

  export interface Response<B extends Buffer | string | object> {
    body: B;
    url: string;
    requestUrl: string;
    fromCache: boolean;
    redirectUrls?: string[];
}

export interface DestinyMembership {
  LastSeenDisplayName: string;
  LastSeenDisplayNameType: number;
  iconPath: string;
  crossSaveOverride: number;
  applicableMembershipTypes: number[];
  isPublic: boolean;
  membershipType: number;
  membershipId: string;
  displayName: string;
  bungieGlobalDisplayName: string;
  bungieGlobalDisplayNameCode: number;
}

export interface BungieNetUser {
  membershipId: string;
  uniqueName: string;
  displayName: string;
  profilePicture: number;
  profileTheme: number;
  userTitle: number;
  successMessageFlags: string;
  isDeleted: boolean;
  about: string;
  firstAccess: string;
  lastUpdate: string;
  context: {
    isFollowing: boolean;
    ignoreStatus: {
      isIgnored: boolean;
      ignoreFlags: number;
    };
  };
  psnDisplayName: string;
  xboxDisplayName: string;
  showActivity: boolean;
  locale: string;
  localeInheritDefault: boolean;
  showGroupMessaging: boolean;
  profilePicturePath: string;
  profileThemeName: string;
  userTitleDisplay: string;
  statusText: string;
  statusDate: string;
  cachedBungieGlobalDisplayName: string;
  cachedBungieGlobalDisplayNameCode: number;
}

export interface ApiResponse {
  destinyMemberships: DestinyMembership[];
  primaryMembershipId: string;
  bungieNetUser: BungieNetUser;
}



