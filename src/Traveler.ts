import HTTPService from './HttpService';
import GlobalResource from './resources/GlobalResource';
import Destiny2Resource from './resources/Destiny2Resource';
import UserResource from './resources/UserResource';
import { TravelerConfig } from './type-definitions/additons';
import OAuthResource from './resources/OAuthResource';

/**
 * Entry class for accessing the Destiny 2 API
 */
export default class Traveler {
  private apikey: string;
  private userAgent: string;
  private httpService: HTTPService;

  public oauth: OAuthResource;
  public global: GlobalResource;
  public user: UserResource;
  public destiny2: Destiny2Resource;

  constructor(config: TravelerConfig) {
    this.apikey = config.apikey;
    this.userAgent = config.userAgent;
    this.httpService = new HTTPService(
      {
        headers: {
          'User-Agent': this.userAgent,
          'X-API-Key': this.apikey
        },
        json: true
      },
      config.debug
    );
    this.oauth = new OAuthResource(config, this.httpService);
    this.global = new GlobalResource(this.httpService);
    this.destiny2 = new Destiny2Resource(this.httpService);
    this.user = new UserResource(this.httpService);
  }
      

}




