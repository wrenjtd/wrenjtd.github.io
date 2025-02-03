import ky from 'ky';
import Logger from './Logger';

export default class HTTPService {

   
    private debug?: boolean;
    private options: object;
  
    constructor(options: object, debug?: boolean) {
      this.debug = debug;
      this.options = options;
    }
 
    

    public get(url: string, authenticationToken?: string): Promise<object>{
        if (this.debug) {
          Logger.debug(`GET - ${url}${authenticationToken ? ' - OAUTH request' : ''}`);
        }
        
        const authOptions = JSON.parse(JSON.stringify(this.options));
        authOptions.headers['Authorization'] = `Bearer ${authenticationToken}`;


        return new Promise<object>(()  => {
          ky(url, authenticationToken ? authOptions : this.options) 
          .then(response => response.json())
          .catch(err => {
            Promise.reject(err);
          });
          })
    }


    public post(url: string, data: object): Promise<object> {
      if (this.debug) {
        Logger.debug(`POST - ${url}`);
      }

  
      return new Promise<object>((resolve, reject) => {
        ky
        .post(url, data)
        .then(response => {
          Promise.resolve(response.body);
        })
        .catch(err => {
          reject(err);
        });
      });
    }

    


}