<?php
declare(strict_types=1);
// SPDX-FileCopyrightText: MobiFone It <giap.hoangminh10@mobifone.vn>
// SPDX-License-Identifier: AGPL-3.0-or-later

/**
 * Create your routes in here. The name is the lowercase name of the controller
 * without the controller part, the stuff after the hash is the method.
 * e.g. page#index -> OCA\MbfArchiveTime\Controller\PageController->index()
 *
 * The controller class has to be registered in the application.php file since
 * it's instantiated in there
 */

return ['routes' => [
    ['name' => 'mbfarchivetime#index', 'url' => '/', 'verb' => 'GET'],
    ['name' => 'mbfarchivetime#assignFileTag', 'url' => '/assignFileTag', 'verb' => 'GET'],
    ['name' => 'mbfarchivetime#getTimeLeftFile', 'url' => '/getTimeLeftFile', 'verb' => 'GET']
]];

