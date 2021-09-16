import {Appearance} from 'react-native';
import {remove, xor, isEmpty} from 'lodash';

type Schemes = {light: {[key: string]: string}; dark: {[key: string]: string}};
type SchemeType = 'default' | 'light' | 'dark';
type SchemeChangeListener = (schemeType?: 'light' | 'dark') => void;

class Scheme {
  currentScheme: SchemeType = 'default';
  schemes: Schemes = {light: {}, dark: {}};
  changeListeners: SchemeChangeListener[] = [];

  constructor() {
    Appearance.addChangeListener(() => {
      if (this.currentScheme === 'default') {
        Object.assign(this, this.schemes[Appearance.getColorScheme() ?? 'light']);
      }
    });
  }

  /**
   * Get app's current color scheme
   */
  getSchemeType(): 'light' | 'dark' {
    const scheme = this.currentScheme === 'default' ? Appearance.getColorScheme() : this.currentScheme;
    return scheme ?? 'light';
  }

  /**
   * Set color scheme for app
   * arguments:
   * scheme - color scheme e.g light/dark/default
   */
  setScheme(scheme: SchemeType) {
    const prevSchemeType = this.getSchemeType();
    if (!['light', 'dark', 'default'].includes(scheme)) {
      throw new Error(`${scheme} is invalid colorScheme, please use 'light' | 'dark' | 'default'`);
    }
    this.currentScheme = scheme;

    if (prevSchemeType !== this.getSchemeType()) {
      this.changeListeners.forEach(listener => listener(this.getSchemeType()));
    }
  }

  /**
   * Load set of schemes for light/dark mode
   * arguments:
   * schemes - two sets of map of colors e.g {light: {screen: 'white'}, dark: {screen: 'black'}}
   */
  loadSchemes(schemes: Schemes) {
    const lightSchemeKeys = Object.keys(schemes.light);
    const darkSchemeKeys = Object.keys(schemes.dark);

    const missingKeys = xor(lightSchemeKeys, darkSchemeKeys);
    if (!isEmpty(missingKeys)) {
      console.error(`There is a mismatch in scheme keys: ${missingKeys.join(', ')}`);
    }

    this.schemes = schemes;
  }

  /**
   * Retrieve scheme by current scheme type
   */
  getScheme() {
    return this.schemes[this.getSchemeType()];
  }

  /**
   * Add a change scheme event listener
   */
  addSchemeChangeListener(listener: SchemeChangeListener) {
    this.changeListeners.push(listener);
  }

  /**
   * Remove a change scheme event listener
   * arguments:
   * listener - listener reference to remove
   */
  removeSchemeChangeListener(listener: SchemeChangeListener) {
    remove(this.changeListeners, changeListener => changeListener === listener);
  }
}

export default new Scheme();
