export const LOCAL_STORAGE_CHART_TYPE = 'CHART_TYPE';
export const LOCAL_STORAGE_API_URL = 'API-URL';
export const CHART_TYPE_LINE = 'Line';
export const CHART_TYPE_BAR = 'Bar';
export const LOCAL_STORAGE_THEME = 'THEME';

export const THEMES = [
    {
        label: 'Redfroggy',
        value: 'redfroggy',
        activeClass: 'red darken-4 white-text',
        itemSelected: '#e0e0e0',
        itemTextColor: 'black-text',
        mainClass: 'grey darken-4',
        buttonClass: 'red darken-2',
        button: '#D32F2F',
        'fab-button': 'red darken-4',
        socialMediaClass: 'redfroggy-theme',
        ribbon: '<a href="https://github.com/RedFroggy/swagger2-angular2-materialize" target="_blank">' +
        '<img src="https://camo.githubusercontent.com/365986a132ccd6a44c23a9169022c0b5c890c387/68747470733a2f2f73332e616d617a6f6e' +
        '6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f7265645f6161303030302e706e67" ' +
        'alt="Fork me on GitHub" ' +
        'data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_red_aa0000.png"> </a>'
    },
    {
        label: 'Blue',
        value: 'blue',
        activeClass: 'pink accent-2 white-text',
        itemSelected: '#ff5a92',
        itemTextColor: 'white-text',
        mainClass: 'cyan',
        buttonClass: 'pink accent-2',
        button: '#ff5a92',
        'fab-button': 'teal',
        socialMediaClass: 'blue-theme',
        ribbon: '<a href="https://github.com/RedFroggy/swagger2-angular2-materialize" target="_blank">' +
        '<img src="https://camo.githubusercontent.com/e7bbb0521b397edbd5fe43e7f760759336b5e05f/68747470733a2f2f73332e' +
        '616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f677265656e5f3030373' +
        '230302e706e67" alt="Fork me on GitHub" ' +
        'data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_green_007200.png"></a>'
    }
];
