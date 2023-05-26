<?php
declare(strict_types=1);
// SPDX-FileCopyrightText: MobiFone It <hung.nduy@mobifone.vn>
// SPDX-License-Identifier: AGPL-3.0-or-later

namespace OCA\MbfArchiveTime\AppInfo;

use OCP\AppFramework\App;

class Application extends App {
	public const APP_ID = 'mbfarchivetime';

	public function __construct() {
		parent::__construct(self::APP_ID);
        $container = $this->getContainer();
        $server = $container->getServer();
        $eventDispatcher = $server->getEventDispatcher();

        $eventDispatcher->addListener('OCA\Files::loadAdditionalScripts', function($legacyEvent) {

            $hiddenFields = $legacyEvent->getArgument('hiddenFields');
            \OCP\Util::addStyle('mbfarchivetime', 'archivetime');
            \OCP\Util::addScript('mbfarchivetime', 'archivetimefileactions');
        });
	}


    public static function getL10N() {
        return \OC::$server->getL10N(Application::APP_ID);
    }
}
