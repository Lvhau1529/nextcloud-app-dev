// SPDX-FileCopyrightText: haulv <lvhau1529@gmail.com>
// SPDX-License-Identifier: AGPL-3.0-or-later

const webpackConfig = require('@nextcloud/webpack-vue-config')
const path = require('path')

module.exports = Object.assign({}, webpackConfig, {
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
})
