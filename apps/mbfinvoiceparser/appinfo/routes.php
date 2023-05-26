<?php
declare(strict_types=1);
// SPDX-FileCopyrightText: MobiFone It <hung.nduy@mobifone.vn>
// SPDX-License-Identifier: AGPL-3.0-or-later

/**
 * Create your routes in here. The name is the lowercase name of the controller
 * without the controller part, the stuff after the hash is the method.
 * e.g. page#index -> OCA\MbfInvoiceParser\Controller\PageController->index()
 *
 * The controller class has to be registered in the application.php file since
 * it's instantiated in there
 */

return ['routes' => [
    ['name' => 'mbfinvoiceparser#get', 'url' => '/get', 'verb' => 'GET'],
    ['name' => 'mbfinvoiceparser#getInvoiceValidation', 'url' => '/getInvoiceValidation', 'verb' => 'GET'],
    ['name' => 'mbfinvoiceparser#assignFileTag', 'url' => '/assignFileTag', 'verb' => 'GET']
]];

