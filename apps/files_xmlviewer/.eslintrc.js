// SPDX-FileCopyrightText: TuyNV <tuynv.8889@gmail.com>
// SPDX-License-Identifier: AGPL-3.0-or-later
module.exports = {
	extends: ["@nextcloud"],
  resolve: {
    modules: [
      path.resolve(__dirname, "node_modules"),
      path.resolve(__dirname, "../../node_modules"),
    ],
  },
}
