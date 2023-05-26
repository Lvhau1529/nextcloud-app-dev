// SPDX-FileCopyrightText: haulv <lvhau1529@gmail.com>
// SPDX-License-Identifier: AGPL-3.0-or-later
const path = require("path");

module.exports = {
  extends: ["@nextcloud"],
  resolve: {
    modules: [
      path.resolve(__dirname, "node_modules"),
      path.resolve(__dirname, "../../node_modules"),
    ],
  },
};
