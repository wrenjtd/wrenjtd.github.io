import BungieResource from './BungieResource';
import HTTPService from '../HttpService';
import { OAuthResponse, TravelerConfig, TravelerOptions } from '../type-definitions/additons';
import { OAuthError } from '../errors';


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


    public getAccessToken(code: string, oauthClientId: string, oauthClientSecret: string): Promise<OAuthResponse> {
        let form = new FormData();
        form.append('client_id', oauthClientId);
        form.append('code', code);
        form.append('grant_type', 'authorization_code');
        form.append('client_secret', oauthClientSecret);

        let options: TravelerOptions = {
            body: new URLSearchParams({
                      'client_id': import.meta.env.VITE_BUNGIE_CLIENT_ID,
                      'client_secret': import.meta.env.VITE_BUNGIE_CLIENT_SECRET,
                      'grant_type': "authorization_code",
                      'code': code
                    }).toString()
                  ,
            headers:
                oauthClientId && oauthClientSecret
                    ? {
                        authorization: 'Basic ' + btoa(`${oauthClientId}:${oauthClientSecret}`).toString(),
                        'content-type': 'application/x-www-form-urlencoded',
                        'X-API-Key': import.meta.env.VITE_BUNGIE_API_KEY,
                    }
                    : {
                        'content-type': 'application/x-www-form-urlencoded',
                        'user-agent': this.userAgent
                    },

            json: true
        };
        console.log("attempting to retrieve access token");
        return new Promise<OAuthResponse>((reject) => {
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
    
        const options: TravelerOptions = {
            body: new URLSearchParams({
                'client_id': import.meta.env.VITE_BUNGIE_CLIENT_ID,
                      'client_secret': import.meta.env.VITE_BUNGIE_CLIENT_SECRET,
                      'grant_type': "refresh_token",
                      'refresh_token': refreshToken
            }).toString(),
          headers: {
            authorization: 'Basic ' + btoa(oauthClientId + ":" + oauthClientSecret),
            'content-type': 'application/x-www-form-urlencoded'
          },
          json: true
        };
    
        return new Promise<OAuthResponse>((reject) => {
          this.httpService
            .post('https://www.bungie.net/platform/app/oauth/token/', options)
            .then(response => Promise.resolve(response))
            .catch(err => {
              reject(err);
            });
        });
      }
}