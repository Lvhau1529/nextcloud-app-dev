<?php
declare(strict_types=1);
// SPDX-FileCopyrightText: haulv <lvhau1529@gmail.com>
// SPDX-License-Identifier: AGPL-3.0-or-later

namespace OCA\MbfEcm\AppInfo;

use OCP\AppFramework\App;

class Application extends App {
	public const APP_ID = 'mbfecm';

	public function __construct() {
		parent::__construct(self::APP_ID);
	}
}
