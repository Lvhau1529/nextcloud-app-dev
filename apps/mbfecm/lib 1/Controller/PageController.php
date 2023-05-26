<?php

declare(strict_types=1);
// SPDX-FileCopyrightText: haulv <lvhau1529@gmail.com>
// SPDX-License-Identifier: AGPL-3.0-or-later

namespace OCA\MbfEcm\Controller;

use OCA\MbfEcm\AppInfo\Application;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\TemplateResponse;
use OCP\IRequest;
use OCP\ISession;
use OCP\Util;

class PageController extends Controller
{
	private $session;
	const COOKIE_NAME_TOKEN = 'MbfEcmAccessToken';
	public function __construct(IRequest $request, ISession $session)
	{
		parent::__construct(Application::APP_ID, $request);
		$this->session = $session;
	}

	private function _getAccessToken(): string
	{
		try {
			$cookie_token = $this->request->getCookie(self::COOKIE_NAME_TOKEN);
			if ($cookie_token) {
				// TODO: check expired
				return $cookie_token;
			}
			$username = $this->session->get('loginname');
			$password = $this->session->get('password');
			$payload = json_encode(
				[
					"username" => 'mobifone',
					"password" => 'mobifoneecm'
				]
			);
			$ch = curl_init('http://10.1.204.16:8003/ecm/v1/auth/signin');
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type:application/json']);
			curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);

			// execute!
			$response = curl_exec($ch);

			// close the connection, release resources used
			curl_close($ch);
			$parsed_response = json_decode($response);
			$token = $parsed_response->token;
			return $token;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 */
	public function index(): TemplateResponse
	{
		Util::addScript(Application::APP_ID, 'mbfecm-main');
		$tempalte_response = new TemplateResponse(Application::APP_ID, 'main');
		setcookie('MbfEcmAccessToken', $this->_getAccessToken());
		return $tempalte_response;
	}
}