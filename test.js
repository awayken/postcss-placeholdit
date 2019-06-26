import postcss from 'postcss';
import test    from 'ava';

import plugin from './';

function run(t, input, output, opts = { }) {
    return postcss([ plugin(opts) ]).process(input)
        .then( result => {
            t.deepEqual(result.css, output);
            t.deepEqual(result.warnings().length, 0);
        });
}

test('replace broken local image with placeholder image', t => {
    return run(t,
'div{ background-image: placeholdit("/images/background.jpg", "400x400"); }',
'div{ background-image: url("https://placehold.it/400x400"); }'
    );
});

test('replace broken image with placeholder image', t => {
    return run(t,
'div{ background-image: placeholdit("http://example.com/i.jpg", "400x400"); }',
'div{ background-image: url("https://placehold.it/400x400"); }'
    );
});

test('displays actual image instead of placeholder image', t => {
    return run(t,
'div{ background-image: placeholdit("https://placehold.it/9x9", "400x400"); }',
'div{ background-image: url("https://placehold.it/9x9"); }'
    );
});

test('displays actual image using options', t => {
    return run(t,
'div{ background-image: placeholdit("/200x200", "400x400"); }',
'div{ background-image: url("/200x200"); }',
{ domain: 'https://placehold.it' }
    );
});
