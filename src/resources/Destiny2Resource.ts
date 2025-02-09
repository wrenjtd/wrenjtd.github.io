import HTTPService from '../HttpService';
import BungieResource from './BungieResource';

import { ServerResponse } from '../type-definitions/common';

import {
    BungieMembershipType,
    // DestinyCharacterResponse,
    // DestinyActivityHistoryResults,
    DestinyManifest,
    // DestinyDefinition,
    // DestinyLinkedProfilesResponse,
    DestinyProfileResponse,
    // DestinyMilestone,
    // DestinyItemResponse,
    // DestinyVendorsResponse,
    // DestinyVendorResponse,
    // DestinyCollectibleNodeDetailResponse,
    // DestinyPostGameCarnageReportData,
    DestinyHistoricalStatsDefinition,
    // DestinyClanAggregateStat,
    DestinyEntitySearchResult,
    // DestinyHistoricalStatsByPeriod,
    // DestinyHistoricalStatsAccountResult,
    // DestinyActivity,
    // DestinyHistoricalWeaponStatsData,
    // DestinyAggregateActivityResults,
    // DestinyMilestoneContent,
    // DestinyPublicMilestone
  } from '../type-definitions/destiny2';

import { UserInfoCard } from '../type-definitions/user';
import { QueryStringParameters, DictionaryResponse, TypeDefinition } from '../type-definitions/additons';

import { resolveQueryStringParameters } from '../util';


export default class Destiny2Resource extends BungieResource {

    protected resourcePath: string;

    constructor(httpService: HTTPService) {
      super(httpService);
      this.resourcePath = `${this.basePath}/Destiny2`;
    }

    /**
   * Returns the current version of the manifest as a json object.
   *
   * ```js
   * import Traveler from './Traveler';
   *
   * let traveler = new Traveler({
   *  apikey: 'apikey',
   *  userAgent: 'useragent', //used to identify your request to the API
   * });
   *
   * traveler.destiny2
   * .getDestinyManifest()
   * .then(response => {
   *   console.log(response);
   * })
   * .catch(err => {
   *  console.log(err);
   * });
   * ```
   *
   * @returns {Promise<ServerResponse<DestinyManifest>>}  When fulfilled returns an object containing the current Destiny 2 manifest
   * @memberof Destiny2Resource
   */
  public getDestinyManifest(): Promise<ServerResponse<DestinyManifest>> {
    return new Promise<ServerResponse<DestinyManifest>>((reject) => {
      this.httpService
        .get(`${this.resourcePath}/Manifest/`)
        .then( response => response as ServerResponse<DestinyManifest>)
        .catch(err => {
          reject(err);
        });
    });
  }


  /**
   * Search for a Destiny 2 player by name
   *
   * ```js
   * import Traveler from './Traveler';
   * import { BungieMembershipType } from 'the-traveler/type-definitions/app';
   *
   * let traveler = new Traveler({
   *  apikey: 'apikey',
   *  userAgent: 'useragent', //used to identify your request to the API
   * });
   *
   * traveler.destiny2
   * .searchDestinyPlayer(
   *    BungieMembershipType.All,
   *    'displayName'
   * )
   * .then(response => {
   *    console.log(response);
   * })
   * .catch(err => {
   *    console.log(err);
   * });
   * ```
   *
   * @param {BungieMembershipType} membershipType A valid non-BungieNet membership type. It has to match the type which the `destinyMembershipId` is belonging to. <br />
   * Keep in mind that `-1 / MembershipType.All` is <strong> not applicable here </strong> <br/>
   * Ex: If the `destinyMembershipId` is a PSN account then use `'2'` or `MembershipType.TigerPSN` for this endpoint.
   * @param {string} displayName  The full gamertag or PSN id of the player. Spaces and case are ignored
   * @returns {Promise<ServerResponse<UserInfoCard[]>>}
   * @memberof Destiny2Resource
   */
  public searchDestinyPlayer(
    membershipType: BungieMembershipType,
    displayName: string
  ): Promise<ServerResponse<UserInfoCard[]>> {
    return new Promise<ServerResponse<UserInfoCard[]>>((reject) => {
      this.httpService
        .get(`${this.resourcePath}/SearchDestinyPlayer/${membershipType}/${displayName}/`)
        .then(response => response as ServerResponse<UserInfoCard[]>)
        .catch(err => {
          reject(err);
        });
    });
  }


  /**
   * Returns Destiny Profile information for the supplied membership.
   *
   * ```js
   * import Traveler from './Traveler';
   * import { BungieMembershipType } from 'the-traveler/type-definitions/app';
   * import { DestinyComponentType } from 'the-traveler/type-definitions/destiny2';
   *
   * let traveler = new Traveler({
   *  apikey: 'apikey',
   *  userAgent: 'useragent', //used to identify your request to the API
   * });
   *
   * traveler.destiny2
   * .getProfile(
   *    BungieMembershipType.TigerPsn,
   *    'membershipId',
   *    {components: [DestinyComponentType.Profiles]}
   * )
   * .then(response => {
   *  console.log(response);
   * })
   * .catch(err => {
   *  console.log(err);
   * });
   * ```
   *
   * @param {BungieMembershipType} membershipType  A valid non-BungieNet membership type. It has to match the type which the `destinyMembershipId` is belonging to. <br />
   * Keep in mind that `-1 / MembershipType.All` is <strong> not applicable here </strong> <br/>
   * Ex: If the `destinyMembershipId` is a PSN account then use `'2'` or `MembershipType.TigerPSN` for this endpoint.
   * @param {string} destinyMembershipId The Destiny ID (Account ID)
   * @param {QueryStringParameters} queryStringParameters An object containing key/value query parameters for this endpoint. Following keys are valid:
   * <ul>
   * <li>components {string[]}: See {@link https://bungie-net.github.io/multi/schema_Destiny-DestinyComponentType.html#schema_Destiny-DestinyComponentType|DestinyComponentType} for the different enum types.</li>
   * </ul> You must request at least one component to receive results.
   * @param {string} [oauthAccesstoken] Optional access token to request data with an oauth scopes
   * @returns {Promise<ServerResponse<DestinyProfileResponse>>}
   * @memberof Destiny2Resource
   *
   */
  public getProfile(
    membershipType: BungieMembershipType,
    destinyMembershipId: string,
    queryStringParameters: QueryStringParameters,
    oauthAccesstoken?: string
  ): Promise<ServerResponse<DestinyProfileResponse>> {
    return new Promise<ServerResponse<DestinyProfileResponse>>((reject) => {
      this.httpService
        .get(
          `${this.resourcePath}/${membershipType}/Profile/${destinyMembershipId}/${resolveQueryStringParameters(
            queryStringParameters
          )}`,
          oauthAccesstoken
        )
        .then(response => response as ServerResponse<DestinyProfileResponse>)
        .catch(err => {
          reject(err);
        });
    });
  }


  /**
   * Gets a page list of Destiny items.
   *
   * ```js
   * import Traveler from './Traveler';
   * import { TypeDefinition } from 'the-traveler/type-definitions/additions';
   *
   * let traveler = new Traveler({
   *  apikey: 'apikey',
   *  userAgent: 'useragent', //used to identify your request to the API
   * });
   *
   * traveler.destiny2
   * .searchDestinyEntities(
   *    'moon',
   *    TypeDefinition.DestinyInventoryItemDefinition,
   *    { page: 0 })
   * .then(response => {
   *  console.log(response);
   * })
   * .catch(err => {
   *  console.log(err);
   * });
   * ```
   *
   * @param {string} searchTerm The string to use when searching for Destiny entities.
   * @param {TypeDefinition} typeDefinition The type of entity for whom you would like results. These correspond to the entity's definition contract name. For instance, if you are looking for items, this property should be 'DestinyInventoryItemDefinition'.
   * @param {QueryStringParameters} queryStringParameters An object containing key/value query parameters for this endpoint. Following keys are valid:
   * <ul>
   * <li>page {number} Page number to return, starting with 0</li>
   * </ul>
   * @returns {Promise<ServerResponse<DestinyEntitySearchResult>>} The entities search result
   * @memberof Destiny2Resource
   */
  public searchDestinyEntities(
    searchTerm: string,
    typeDefinition: TypeDefinition,
    queryStringParameters: QueryStringParameters
  ): Promise<ServerResponse<DestinyEntitySearchResult>> {
    return new Promise<ServerResponse<DestinyEntitySearchResult>>((reject) => {
      this.httpService
        .get(
          `${this.resourcePath}/Armory/Search/${typeDefinition}/${searchTerm}/${resolveQueryStringParameters(
            queryStringParameters
          )}`
        )
        .then(response => response as ServerResponse<DestinyEntitySearchResult>)
        .catch(err => {
          reject(err);
        });
    });
  }


   /**
   * Gets historical stats definitions.
   *
   * ```js
   * import Traveler from './Traveler';
   *
   * let traveler = new Traveler({
   *  apikey: 'apikey',
   *  userAgent: 'useragent', //used to identify your request to the API
   * });
   *
   *  traveler.destiny2.getHistoricalStatsDefinition()
   *  .then(response => {
   *    console.log(response);
   *  })
   *  .catch(err => {
   *    console.log(err);
   *  });
   * ```
   *
   * @returns {Promise<ServerResponse<{ [key: string]: DestinyHistoricalStatsDefinition }>>}
   * @memberof Destiny2Resource
   */
   public getHistoricalStatsDefinition(): Promise<ServerResponse<DictionaryResponse<DestinyHistoricalStatsDefinition>>> {
    return new Promise<ServerResponse<{ [key: string]: DestinyHistoricalStatsDefinition }>>((reject) => {
      this.httpService
        .get(`${this.resourcePath}/Stats/Definition/`)
        .then(response => response as ServerResponse<DictionaryResponse<DestinyHistoricalStatsDefinition>>)
        .catch(err => {
          reject(err);
        });
    });
  }
  

}