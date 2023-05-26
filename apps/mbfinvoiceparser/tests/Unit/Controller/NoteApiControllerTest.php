<?php
declare(strict_types=1);
// SPDX-FileCopyrightText: MobiFone It <hung.nduy@mobifone.vn>
// SPDX-License-Identifier: AGPL-3.0-or-later

namespace OCA\MbfInvoiceParser\Tests\Unit\Controller;

use OCA\MbfInvoiceParser\Controller\NoteApiController;

class NoteApiControllerTest extends NoteControllerTest {
	public function setUp(): void {
		parent::setUp();
		$this->controller = new NoteApiController($this->request, $this->service, $this->userId);
	}
}
