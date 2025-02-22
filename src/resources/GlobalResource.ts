import BungieResource from './BungieResource';
import HTTPService from '../HttpService';


import { ServerResponse } from '../type-definitions/common';
import { GlobalAlert, DictionaryResponse } from '../type-definitions/additons';

export default class GlobalResource extends BungieResource {
  protected resourcePath: string;

  constructor(httpService: HTTPService) {
    super(httpService);
    this.resourcePath = `${this.basePath}`;
  }

  /**
   * List of available localization cultures
   * @async
   * @return {Promise.ServerResponse<any>} When fulfilled returns a list of available localization cultures
   */
  public getAvailableLocales(): Promise<ServerResponse<DictionaryResponse<string>>> {
    return new Promise<ServerResponse<DictionaryResponse<string>>>((reject) => {
      this.httpService
        .get(`${this.resourcePath}/GetAvailableLocales/`)
        .then(response => response as ServerResponse<DictionaryResponse<string>>)
        .catch(err => {
          reject(err);
        });
    });
  }

  /**
   * Get the common settings used by the Bungie.Net environment.
   * @async
   * @return {Promise.ServerResponse<any>} When fulfilled returns an object containing the common settings
   */
  public getCommonSettings(): Promise<ServerResponse<any>> {
    return new Promise<ServerResponse<any>>((reject) => {
      this.httpService
        .get(`${this.resourcePath}/Settings/`)
        .then(response => response as ServerResponse<any>)
        .catch(err => {
          reject(err);
        });
    });
  }

  /**
   * Gets any active global alert for display in the forum banners, help pages, etc. Usually used for DOC alerts.
   * @async
   * @return {Promise.ServerResponse<IDestinyManifest>} When fulfilled returns an object containing the current Global Alerts
   */
  public getGlobalAlerts(): Promise<ServerResponse<GlobalAlert[]>> {
    return new Promise<ServerResponse<GlobalAlert[]>>((reject) => {
      this.httpService
        .get(`${this.resourcePath}/GlobalAlerts/`)
        .then(response => response as Promise<ServerResponse<GlobalAlert[]>>)
        .catch(err => {
          reject(err);
        });
    });
  }
}