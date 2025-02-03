import BungieResource from './resources/BungieResource';
import HTTPService from '../src/HttpService';
import ky from 'ky';
import { OAuthResponse, TravelerConfig } from './type-definitions/additons';
import { OAuthError } from '../src/errors';


export default class OAuthResource extends BungieResource {

    protected resourcePath: string;
    private userAgent: string;

    constructor(config: TravelerConfig, httpService: HTTPService) {
        super(httpService);
        this.resourcePath = ``;
        this.userAgent = config.userAgent;
    }

    public generateOAuthURL(oauthClientId: string): string {
        if (oauthClientId !== undefined) {
            return `https://www.bungie.net/en/OAuth/Authorize?client_id=${oauthClientId}&response_type=code`;
        } else {
            throw new OAuthError('You did not specify a OAuth client Id');
        } 
    }


    public getAccessToken(code: string, oauthClientId?: string, oauthClientSecret?: string): Promise<OAuthResponse> {
        let form = new FormData();
        form.append('client_id', import.meta.env.VITE_BUNGIE_API_CLIENT_ID);
        form.append('code', code);
        form.append('grant_type', 'authorization_code');

        let options: object = {
            body: form,
            headers:
                oauthClientId && oauthClientSecret
                    ? {
                        authorization: 'Basic ' + btoa(import.meta.env.VITE_BUNGIE_API_CLIENT_ID + ":" + import.meta.env.VITE_BUNGIE_API_CLIENT_SECRET),
                        'content-type': 'application/x-www-form-urlencoded',
                        'user-agent': this.userAgent
                    }
                    : {
                        'content-type': 'application/x-www-form-urlencoded',
                        'user-agent': this.userAgent
                    },

            json: true
        };
        return new Promise<OAuthResponse>((resolve, reject) => {
            this.httpService
                .post('https://www.bungie.net/platform/app/oauth/token/', options)
                .then(response => Promise.resolve(response))
                .catch(err => {
                    reject(err);
                });
        });
    }


    public refreshToken(refreshToken: string, oauthClientId: string, oauthClientSecret: string): Promise<OAuthResponse> {
        let form = new FormData();
        form.append('refresh_token', refreshToken);
        form.append('grant_type', 'refresh_token');
    
        const options: object = {
          body: form,
          headers: {
            authorization: 'Basic ' + btoa(oauthClientId + ":" + oauthClientSecret),
            'content-type': 'application/x-www-form-urlencoded'
          },
          json: true
        };
    
        return new Promise<OAuthResponse>((resolve, reject) => {
          this.httpService
            .post('https://www.bungie.net/platform/app/oauth/token/', options)
            .then(response => Promise.resolve(response))
            .catch(err => {
              reject(err);
            });
        });
      }
}