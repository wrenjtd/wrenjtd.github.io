import { Options } from 'ky';
import Logger from './Logger';
import { OAuthResponse } from './type-definitions/additons';



export default class HTTPService {

   
    private debug?: boolean;
    private options: Options;
  
    constructor(options: Options, debug?: boolean) {
      this.debug = debug;
      this.options = options;
    }
 
    

    public get(url: string, authenticationToken?: string): Promise<object>{
        if (this.debug) {
          Logger.debug(`GET - ${url}${authenticationToken ? ' - OAUTH request' : ''}`);
        }
        
        const authOptions = JSON.parse(JSON.stringify(this.options));
        authOptions.headers['Authorization'] = `Bearer ${authenticationToken}`;


        return new Promise<object>((resolve, reject) => {
          fetch(url, authenticationToken ? authOptions : this.options) 
          .then(response => response.json())
          .then(data => {resolve(data); })
          .catch(err => {
            reject(err);
          });
          })
    }


    public post(url: string, data: object ): Promise<OAuthResponse> {
      if (this.debug) {
        Logger.debug(`POST - ${url}`);
      }

  
      return new Promise<OAuthResponse>((resolve, reject) => {
        fetch(url, data)
        .then(response => response.json())
        .then(data => { resolve(data);})
        .catch(err => {
          reject(err);
        });
      });
    }

    


}