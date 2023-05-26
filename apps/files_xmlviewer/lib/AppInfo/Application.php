<?php

declare(strict_types=1);
// SPDX-FileCopyrightText: TuyNV <tuynv.8889@gmail.com>
// SPDX-License-Identifier: AGPL-3.0-or-later

namespace OCA\Files_XMLViewer\AppInfo;

use OCA\Files_XMLViewer\Listeners\CSPListener;
use OCA\Files_XMLViewer\Listeners\LoadPublicViewerListener;
use OCA\Files_XMLViewer\Listeners\LoadViewerListener;

use OCA\Viewer\Event\LoadViewer;

use OCP\AppFramework\App;
use OCP\AppFramework\Bootstrap\IBootContext;
use OCP\AppFramework\Bootstrap\IBootstrap;
use OCP\AppFramework\Bootstrap\IRegistrationContext;
use OCP\AppFramework\Http\Events\BeforeTemplateRenderedEvent;
use OCP\Security\CSP\AddContentSecurityPolicyEvent;

class Application extends App implements IBootstrap
{
	public const APP_ID = 'files_xmlviewer';

	public function __construct()
	{
		parent::__construct(self::APP_ID);
	}

	public function register(IRegistrationContext $context): void
	{
		$context->registerEventListener(LoadViewer::class, LoadViewerListener::class);
		$context->registerEventListener(BeforeTemplateRenderedEvent::class, LoadPublicViewerListener::class);
		$context->registerEventListener(AddContentSecurityPolicyEvent::class, CSPListener::class);
	}

	public function boot(IBootContext $context): void
	{
	}
}
