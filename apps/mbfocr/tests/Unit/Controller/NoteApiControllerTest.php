<?php
declare(strict_types=1);
// SPDX-FileCopyrightText: Hoang Minh Giap <giap.hoangminh10@mobifone.vn>
// SPDX-License-Identifier: AGPL-3.0-or-later

namespace OCA\MbfOcr\Tests\Unit\Controller;

use OCA\MbfOcr\Controller\NoteApiController;

class NoteApiControllerTest extends NoteControllerTest {
	public function setUp(): void {
		parent::setUp();
		$this->controller = new NoteApiController($this->request, $this->service, $this->userId);
	}
}
