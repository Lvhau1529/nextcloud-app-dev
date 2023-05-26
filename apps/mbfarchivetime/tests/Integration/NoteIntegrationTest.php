<?php
declare(strict_types=1);
// SPDX-FileCopyrightText: Giap <giap.hoangminh10@mobifone.vn>
// SPDX-License-Identifier: AGPL-3.0-or-later

namespace OCA\MbfArchiveTime\Tests\Integration\Controller;

use OCP\AppFramework\App;
use OCP\IRequest;
use PHPUnit\Framework\TestCase;

use OCA\MbfArchiveTime\Db\Note;
use OCA\MbfArchiveTime\Db\NoteMapper;
use OCA\MbfArchiveTime\Controller\NoteController;

class NoteIntegrationTest extends TestCase {
	private NoteController $controller;
	private QBMapper $mapper;
	private string $userId = 'john';

	public function setUp(): void {
		$app = new App('mbfarchivetime');
		$container = $app->getContainer();

		// only replace the user id
		$container->registerService('userId', function () {
			return $this->userId;
		});

		// we do not care about the request but the controller needs it
		$container->registerService(IRequest::class, function () {
			return $this->createMock(IRequest::class);
		});

		$this->controller = $container->get(NoteController::class);
		$this->mapper = $container->get(NoteMapper::class);
	}

	public function testUpdate(): void {
		// create a new note that should be updated
		$note = new Note();
		$note->setTitle('old_title');
		$note->setContent('old_content');
		$note->setUserId($this->userId);

		$id = $this->mapper->insert($note)->getId();

		// fromRow does not set the fields as updated
		$updatedNote = Note::fromRow([
			'id' => $id,
			'user_id' => $this->userId
		]);
		$updatedNote->setContent('content');
		$updatedNote->setTitle('title');

		$result = $this->controller->update($id, 'title', 'content');

		$this->assertEquals($updatedNote, $result->getData());

		// clean up
		$this->mapper->delete($result->getData());
	}
}
