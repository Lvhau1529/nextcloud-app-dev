<?php
declare(strict_types=1);
// SPDX-FileCopyrightText: TuyNV <tuynv.8889@gmail.com>
// SPDX-License-Identifier: AGPL-3.0-or-later

namespace OCA\FilesXmlViewer\Tests\Unit\Controller;

use OCA\FilesXmlViewer\Controller\NoteApiController;

class NoteApiControllerTest extends NoteControllerTest {
	public function setUp(): void {
		parent::setUp();
		$this->controller = new NoteApiController($this->request, $this->service, $this->userId);
	}
}
