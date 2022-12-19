import {DynamicEnvironment} from './dyn.environment';

class Environment extends DynamicEnvironment {
  public production: boolean;
  constructor() {
    super();
    this.production = true;
  }
}
export const environment = new Environment();
