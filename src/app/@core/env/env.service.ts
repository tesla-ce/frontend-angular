import { environment } from '../../../environments/environment';

export class EnvService {

  // The values that are defined here are the default values that can
  // be overridden by env.js

  // API url
  public apiUrl = environment.apiUrl;

  // Whether or not to enable debug mode
  public enableDebug = !environment.production;

  constructor() {
  }
}
