import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
    input: 'js/webvipolyfill.main.js',
    output: {
        file: 'webvipolyfill.gcomp/webvipolyfill.js',
        format: 'umd',
        name: 'webvipolyfill',
        exports: 'default'
    },
    plugins: [
        resolve(),
        commonjs()
    ]
};
