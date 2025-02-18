import ky, { Options } from 'ky';
import Logger from './Logger';



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


        return new Promise<object>(()  => {
          ky(url, authenticationToken ? authOptions : this.options) 
          .then(response => response.json())
          .catch(err => {
            Promise.reject(err);
          });
          })
    }


    public post(url: string, data: Options): Promise<object> {
      if (this.debug) {
        Logger.debug(`POST - ${url}`);
      }

  
      return new Promise<object>((reject) => {
        ky
        .post(url, data)
        .then(response => {
          console.log(response);
        }).then(function(data) {
               console.log(data);
             })
        .catch(err => {
          reject(err);
        });
      });
    }

    


}