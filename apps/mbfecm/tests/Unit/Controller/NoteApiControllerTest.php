<?php
declare(strict_types=1);
// SPDX-FileCopyrightText: haulv <lvhau1529@gmail.com>
// SPDX-License-Identifier: AGPL-3.0-or-later

namespace OCA\MbfEcm\Tests\Unit\Controller;

use OCA\MbfEcm\Controller\NoteApiController;

class NoteApiControllerTest extends NoteControllerTest {
	public function setUp(): void {
		parent::setUp();
		$this->controller = new NoteApiController($this->request, $this->service, $this->userId);
	}
}
