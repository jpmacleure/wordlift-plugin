/**
 * Configuration Scripts: Rollup WordLift Admin.
 *
 * Define the rollup configuration to build WordLift's javascript files for the admin area.
 *
 * Learn more about Rollup here: Learn rollup on https://code.lengstorf.com/learn-rollup-js/
 *
 * @since 3.10.0
 */

// Rollup plugins
import eslint from 'rollup-plugin-eslint';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
	// The input file.
	entry: 'src/admin/js/wordlift-admin.js',
	// The destination file.
	dest: 'src/admin/js/wordlift-admin.min.js',
	// Make a closure around our own code, suitable for in-browser usage, see more options here:
	// https://github.com/rollup/rollup/wiki/JavaScript-API#format
	format: 'iife',
	sourceMap: 'inline',
	plugins: [
		resolve( {
					 jsnext: true,
					 main: true,
					 browser: true,
				 } ),
		commonjs(),
		eslint({
			exclude: [
				'src/css/**',
			]
		}),
		// Use the babel plugin to transpile to old JavaScript.
		babel( {
			exclude: 'node_modules/**',
		} ),
	],
};