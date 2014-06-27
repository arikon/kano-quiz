var tech = {
    // essential
    levels: require('enb/techs/levels'),
    fileProvider: require('enb/techs/file-provider'),
    fileCopy: require('enb/techs/file-copy'),
    bemdeclFromBemjson: require('enb/techs/bemdecl-from-bemjson'),
    deps: require('enb/techs/deps'),
    files: require('enb/techs/files'),
    bemdeclMerge: require('enb/techs/bemdecl-merge'),
    bemdeclFromDepsByTech: require('enb/techs/bemdecl-from-deps-by-tech'),
    fileMerge: require('enb/techs/file-merge'),

    // optimization
    borschik: require('enb-borschik/techs/borschik'),

    // css
    cssRoole: require('enb-roole/techs/css-roole'),
    cssAutoprefixer: require('enb-autoprefixer/techs/css-autoprefixer'),

    // js
    browserJs: require('enb-diverse-js/techs/browser-js'),
    prependYm: require('enb-modules/techs/prepend-modules'),

    // bemhtml
    bemhtml: require('enb-bemxjst/techs/bemhtml-old'),
    htmlFromBemjson: require('enb/techs/html-from-bemjson')
};

module.exports = function(config) {
    config.nodes('*.bundles/*', function(nodeConfig) {
        nodeConfig.addTechs([
            // essential
            [tech.levels, {levels: getLevels(config)}],
            [tech.fileProvider, {target: '?.bemjson.js'}],
            [tech.bemdeclFromBemjson],
            [tech.deps],
            [tech.files],

            // css
            [tech.cssRoole, {target: '?.noprefix.css'}],
            [tech.cssAutoprefixer, {
                sourceTarget: '?.noprefix.css',
                destTarget: '?.css',
                browserSupport: getBrowsers()
            }],

            // bemhtml
            [tech.bemhtml],
            [tech.htmlFromBemjson],

            // client bemhtml
            [tech.bemdeclFromDepsByTech, {
                target: '?.js.bemhtml.bemdecl.js',
                sourceTech: 'js',
                destTech: 'bemhtml'
            }],
            [tech.bemdeclMerge, {
                bemdeclSources: ['?.js.bemhtml.bemdecl.js', '?.bemdecl.js'],
                bemdeclTarget: '?.bemhtml.bemdecl.js'
            }],
            [tech.deps, {
                depsTarget : '?.bemhtml.deps.js',
                bemdeclTarget : '?.bemhtml.bemdecl.js'
            }],
            [tech.files, {
                depsTarget: '?.bemhtml.deps.js',
                filesTarget: '?.bemhtml.files',
                dirsTarget: '?.bemhtml.dirs'
            }],
            [tech.bemhtml, {
                target: '?.browser.bemhtml.js',
                filesTarget: '?.bemhtml.files',
                devMode: false
            }],

            // js
            [tech.browserJs],
            [tech.fileMerge, {
                target : '?.pre.js',
                sources : ['?.browser.bemhtml.js', '?.browser.js']
            }],
            [tech.prependYm, {source: '?.pre.js'}]
        ]);

        nodeConfig.addTargets(['?.html', '?.min.css', '?.min.js']);

        nodeConfig.mode('development', function() {
            nodeConfig.addTechs([
                [tech.fileCopy, {sourceTarget: '?.js', destTarget: '?.min.js'}],
                [tech.fileCopy, {sourceTarget: '?.css', destTarget: '?.min.css'}]
            ]);
        });

        nodeConfig.mode('production', function() {
            nodeConfig.addTechs([
                [tech.borschik, {sourceTarget: '?.js', destTarget: '?.min.js'}],
                [tech.borschik, {sourceTarget: '?.css', destTarget: '?.min.css'}]
            ]);
        });
    });
};

function getLevels(config) {
    return [
            {path: 'libs/bem-core/common.blocks', check: false},
            {path: 'libs/bem-core/desktop.blocks', check: false},
            {path: 'libs/bem-components/common.blocks', check: false},
            {path: 'libs/bem-components/desktop.blocks', check: false},
            {path: 'libs/bem-components/design/common.blocks', check: false},
            {path: 'libs/bem-components/design/desktop.blocks', check: false},
            'common.blocks',
            'desktop.blocks'
        ]
        .map(function(level) {
            return config.resolvePath(level);
        });
}

function getBrowsers() {
    return [
        'last 2 versions',
        'ie 10',
        'ff 24',
        'opera 12.16'
    ];
}
