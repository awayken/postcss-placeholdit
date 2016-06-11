var postcss = require('postcss');
var request = require('request');

module.exports = postcss.plugin('postcss-placeholdit', function ( opts ) {
    opts = opts || {
        domain: 'http://localhost'
    };

    return function ( css ) {

        return new Promise(function ( resolve ) {
            css.walkDecls(function ( decl ) {
                var REplaceholder = /placeholdit\((.+),(.+)\)/;
                var valueMatch = decl.value.match( REplaceholder );

                if ( valueMatch ) {
                    var intendedImage = valueMatch[1];
                    var placeholder = intendedImage;
                    var backgroundImage = intendedImage;

                    var placeholderMatch = valueMatch[2].match(/\d+x\d+/);
                    if ( placeholderMatch ) {
                        placeholder = '"https://placehold.it/' +
                            placeholderMatch[0] + '"';
                    }

                    intendedImage = intendedImage.replace(/'|"/g, '');
                    if ( intendedImage.indexOf('http') === -1 ) {
                        intendedImage = opts.domain + intendedImage;
                    }

                    var requestImage = function ( error, response ) {
                        if ( !error && response.statusCode === 200 ) {
                            decl.value = 'url(' + backgroundImage + ')';
                        } else {
                            decl.value = 'url(' + placeholder + ')';
                        }

                        resolve();
                    };

                    request.get( intendedImage, requestImage );

                } else {
                    resolve();
                }
            });
        });

    };

});
