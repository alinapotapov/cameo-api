
import { VueLoaderPlugin } from 'vue-loader';
export const devtool = "inline-source-map";
export const entry = "./src/index.ts";
export const output = {
    filename: "bundle1.js"
};
export const resolve = {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: [".ts", ".tsx", '.js'],
    // Add support for TypeScripts fully qualified ESM imports.
    extensionAlias: {
        ".js": [".js", ".ts"],
        ".cjs": [".cjs", ".cts"],
        ".mjs": [".mjs", ".mts"]
    }
};
export const module = {

    rules: [
        // all files with a `.ts`, `.cts`, `.mts` or `.tsx` extension will be handled by `ts-loader`
        {

            test: /\.ts$/,
            loader: 'ts-loader',
            options: { appendTsSuffixTo: [/\.vue$/] }


        },
        {
            test: /\.vue$/,
            loader: 'vue-loader'
        },
        {
            test: /\.css$/,
            use: [
                'vue-style-loader',
                'css-loader',
            ]
        },
        {
            test: /\.js$/,
            loader: 'babel-loader'
        },
        {
            // You can use `regexp`
            // test: /vendor\.js/$
            test: require.resolve("./path/to/vendor.js"),
            loader: "exports-loader",
            options: {
                exports: "myFunction",
            },
        }
    ]
};
export const plugins = [
    // make sure to include the plugin!
    new VueLoaderPlugin()
];