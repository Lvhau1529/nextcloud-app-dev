<?php
declare(strict_types=1);
// SPDX-FileCopyrightText: MobiFone It <hung.nduy@mobifone.vn>
// SPDX-License-Identifier: AGPL-3.0-or-later

namespace OCA\MbfInvoiceParser\AppInfo;

use OCP\AppFramework\App;

class Application extends App {
    const APP_NAME = 'mbfinvoiceparser';
    /**
     * Application constructor.
     *
     * @param array $params
     * @throws \OCP\AppFramework\QueryException
     */
    public function __construct(array $params = []) {
        parent::__construct(self::APP_NAME, $params);

        $container = $this->getContainer();
        $server = $container->getServer();
        $eventDispatcher = $server->getEventDispatcher();

        $eventDispatcher->addListener('OCA\Files::loadAdditionalScripts', function($legacyEvent) {

            $hiddenFields = $legacyEvent->getArgument('hiddenFields');
            \OCP\Util::addStyle('mbfinvoiceparser', 'tabview' );
            \OCP\Util::addScript('mbfinvoiceparser', 'tabview' );
            \OCP\Util::addScript('mbfinvoiceparser', 'plugin' );
        });
	}


    public static function getL10N() {
        return \OC::$server->getL10N(Application::APP_NAME);
    }
}
