import * as fs from 'fs';
import * as sqlite from 'sqlite3';
import got from 'got';

/**
 * Class for accessing the manifest file
 */
export default class Manifest {
  private filepath: string;
  private db: sqlite.Database;

  constructor(filepath: string) {
    if (fs.existsSync(filepath)) {
      this.filepath = filepath;
      this.db = new sqlite.Database(filepath);
    } else {
      throw new Error(
        'The manifest file you want to refer to does not exist. Consider downloading it at first with Traveler#downloadManifest.'
      );
    }
  }

  /**
   * Query the manifest file with a valid SQlite query
   * @async
   * @param sqlLiteQuery SQlite valid query
   * @return {Promise<object>} When fulfilled returns an object containing the result of the query
   */
  public queryManifest(sqlLiteQuery: string): Promise<object> {
    return new Promise<object>((resolve, reject) => {
      this.db.serialize(() => {
        this.db.all(sqlLiteQuery, (err, row) => {
          if (err) {
            reject(err);
          } else {
            console.log(this.filepath)
            resolve(row);
          }
        });
      });
    });
  }

   /**
   * Download the specified json manifest file
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
   *  traveler.destiny2
   *    .downloadManifestJSON(response.Response.jsonWorldContentPaths['en'])
   *    .then(response => {
   *      console.log(response);
   *     })
   *     .catch(err => {
   *       console.log(err);
   *     });
   *  })
   *  .catch(err => {
   *   console.log(err);
   *  });
   * ```
   *
   * @param {string} manifestUrl The url of the manifest you want to download
   * @param {string} [filename] The filename of the final .json file downloaded
   * @returns {Promise<string>} When fulfilled returns the path of the saved manifest file
   * @memberof Destiny2Resource
   */
   public downloadManifestJSON(manifestUrl: string, filename: string): Promise<string> {
    const outStream = fs.createWriteStream(
      `${filename ? filename : manifestUrl.substring(manifestUrl.lastIndexOf('/') + 1)}`
    );
    console.log("Downloading Bungie manifest...");
    return new Promise<string>((resolve, reject) => {
      got
        .stream(`https://www.bungie.net/${manifestUrl}`)
        .pipe(outStream)
        .on('finish', () => {
          resolve(filename);
        });
    });
  }

}
