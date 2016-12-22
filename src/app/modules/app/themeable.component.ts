/**
 * Abstract themeable component
 * Created by mdesigaud on 23/11/2016.
 */

import * as Config from '../../utils/env.config';
import * as _ from 'lodash';

export abstract class ThemeableComponent {
    constructor() {
        if (!localStorage.getItem(Config.LOCAL_STORAGE_THEME)) {
            localStorage.setItem(Config.LOCAL_STORAGE_THEME, Config.THEMES[0].value);
        }
    }
    getThemeOption(option: any): string {
        let theme = this.getCurrentTheme();
        return theme[option];
    }
    getCurrentTheme(): any {
        let themeName = localStorage.getItem(Config.LOCAL_STORAGE_THEME);
        return _.find(Config.THEMES, {value: themeName});
    }
}
