<?php
declare(strict_types=1);
// SPDX-FileCopyrightText: Hoang Minh Giap <giap.hoangminh10@mobifone.vn>
// SPDX-License-Identifier: AGPL-3.0-or-later

namespace OCA\MbfOcr\AppInfo;

use OCP\AppFramework\App;

class Application extends App {
	public const APP_ID = 'mbfocr';

	public function __construct() {
		parent::__construct(self::APP_ID);
        $container = $this->getContainer();
        $server = $container->getServer();
        $eventDispatcher = $server->getEventDispatcher();

        $eventDispatcher->addListener('OCA\Files::loadAdditionalScripts', function($legacyEvent) {

            $hiddenFields = $legacyEvent->getArgument('hiddenFields');
            \OCP\Util::addStyle('mbfocr', 'ocr');
            \OCP\Util::addScript('mbfocr', 'ocrfileactions');
        });
	}

    public static function getL10N() {
        return \OC::$server->getL10N(Application::APP_ID);
    }
}
