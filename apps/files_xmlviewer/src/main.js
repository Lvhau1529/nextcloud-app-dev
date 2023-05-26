/**
 * SPDX-FileCopyrightText: 2018 John Molakvoæ <skjnldsv@protonmail.com>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import XmlViewer from "./xmlTax/XmlViewer.vue";
console.log('XML viewer init');

OCA.Viewer.registerHandler({
	id: 'files_xmlviewer',
	group: 'xmlviewer',
	mimes: [
		'application/xml',
		'text/xml',
	],

	component: XmlViewer,
});