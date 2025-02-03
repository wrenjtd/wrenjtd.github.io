import HTTPService from '../HttpService';

export default abstract class BungieResource {
  protected httpService: HTTPService;
  protected basePath: string;
  

  constructor(httpService: HTTPService) {
    this.httpService = httpService;
    this.basePath = 'https://www.bungie.net/Platform';
  }
}