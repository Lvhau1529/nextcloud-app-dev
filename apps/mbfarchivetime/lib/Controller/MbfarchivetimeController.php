<?php
namespace OCA\MbfArchiveTime\Controller;

use OC\Files\Filesystem;
use OCA\MbfArchiveTime\AppInfo\Application;
use OCA\MbfArchiveTime\Service\MbfArchiveTimeService;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\JSONResponse;
use OCP\IRequest;
use OCP\ISession;
// use OCP\Notification\IManager;

class MbfarchivetimeController extends Controller {
	protected $mbfArchiveTimeService;

	/** @var ISession $session */
	private $session;
	// /** @var IManager */
	// private $notificationManager;

	public function __construct($appName, IRequest $request, 
		MbfArchiveTimeService $mbfArchiveTimeService,
									ISession $session
									// IManager $notificationManager
									) {
		parent::__construct($appName, $request);
		$this->mbfArchiveTimeService = $mbfArchiveTimeService;
		$this->session = $session;
		// $this->notificationManager = $notificationManager;
	}

	public function index() {
		var_dump("alo");
		die(1);
	}
	
	// it works -> apply the mbfinvoiceparser app to the new app: now

	/**
	 * @NoAdminRequired
	 */
	public function assignFileTag($source, $fileId, $tagLabel) {
		// var_dump(array($this->session->get('loginname'), $this->session->get('password')));
		// die(1);
		// var_dump(array($source, $fileId, $tagLabel));
		// die(1);
		try {
			
			$username = $this->session->get('loginname');
			$password = $this->session->get('password');

			// $post = json_encode([
			// 	"username" => $username,
			// 	"password" => $password
			// ]);
			$payload = json_encode(array(
				"username" => $username,
				"password" => $password)
			);
	
			$ch = curl_init('http://10.1.204.16:8003/ecm/v1/auth/signin');
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
			curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
	
			// execute!
			$response = curl_exec($ch);
	
			// close the connection, release resources used
			curl_close($ch);
	
			$parsed_response = json_decode($response);
			$typeToken = $parsed_response->typeToken;
			$token = $parsed_response->token;

			// var_dump("123");
			// do anything you want with your response
			// var_dump(json_decode($response));
			// var_dump($parsed_response->token);
			// die(1);
			// the request will be a POST
	
			// // get invoice validation
			$retry = false;
			// $ch = curl_init('http://10.1.204.16:8003/ecm/v1/xml/check-valid-invoice');
			$ch = curl_init('http://10.1.204.16:8003/ecm/v1/assign-tag-for-file');
			// ...
			// more setup things, using params of the function, etc.
			// ...
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			curl_setopt($ch, CURLOPT_HTTPHEADER, array(
			    "Content-Type: application/json",
			    "Accept: application/json",
			    "Authorization: Bearer {$token}"
			));			

			$filePathPayload = json_encode(array(
				"ecm_path" => $source,
				"tag_label" => $tagLabel,
				"file_id" => $fileId
				)
			);

			curl_setopt($ch, CURLOPT_POSTFIELDS, $filePathPayload);
	
			$res = curl_exec($ch);
			$parsed_res = json_decode($res);
			// var_dump($parsed_res);
			// die(1);
			$info = curl_getinfo($ch);
			if ($info['http_code'] === 401) { // unauthorized
				return new JSONResponse(
					array(
						'response' => 'error',
						'msg' => 'Unauthorized'
					)
				);
			}

			
			// $notification = $this->notificationManager->createNotification();
			// $notification->setApp(Application::APP_ID)
			// 	->setSubject("abc", "123")
			// 	->setUser($username)
			// 	->setObject('xyz', '0')
			// 	->setDateTime(new DateTime());
				
			// var_dump($notification);
			// die(1);

			// $this->notificationManager->notify($notification);

			return new JSONResponse(
				array(
					'response' => 'success',
					'data' => $parsed_res
				)
			);

		} catch (\Exception $e) {
			\OC::$server->getLogger()->logException($e, ['app' => 'mbfarchivetime']);

			return new JSONResponse(
				array(
					'response' => 'error',
					'msg' => $e->getMessage()
				)
			);
		}

	}

	/**
	 * @NoAdminRequired
	 */
	public function getTimeLeftFile($source, $fileId) {
		// var_dump(array($this->session->get('loginname'), $this->session->get('password')));
		// die(1);
		// var_dump(array($source, $fileId, $tagLabel));
		// die(1);
		try {
			
			$username = $this->session->get('loginname');
			$password = $this->session->get('password');

			// $post = json_encode([
			// 	"username" => $username,
			// 	"password" => $password
			// ]);
			$payload = json_encode(array(
				"username" => $username,
				"password" => $password)
			);
	
			$ch = curl_init('http://10.1.204.16:8003/ecm/v1/auth/signin');
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
			curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
	
			// execute!
			$response = curl_exec($ch);
	
			// close the connection, release resources used
			curl_close($ch);
	
			$parsed_response = json_decode($response);
			$typeToken = $parsed_response->typeToken;
			$token = $parsed_response->token;

			// var_dump("123");
			// do anything you want with your response
			// var_dump(json_decode($response));
			// var_dump($parsed_response->token);
			// die(1);
			// the request will be a POST
	
			// // get invoice validation
			$retry = false;
			// $ch = curl_init('http://10.1.204.16:8003/ecm/v1/xml/check-valid-invoice');
			$ch = curl_init('http://10.1.204.16:8003/ecm/v1/time-left-document');
			// ...
			// more setup things, using params of the function, etc.
			// ...
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			curl_setopt($ch, CURLOPT_HTTPHEADER, array(
			    "Content-Type: application/json",
			    "Accept: application/json",
			    "Authorization: Bearer {$token}"
			));			

			$filePathPayload = json_encode(array(
				"ecm_path" => $source,
				"file_id" => $fileId
				)
			);

			curl_setopt($ch, CURLOPT_POSTFIELDS, $filePathPayload);
	
			$res = curl_exec($ch);
			$parsed_res = json_decode($res);
			// var_dump($parsed_res);
			// die(1);
			$info = curl_getinfo($ch);
			if ($info['http_code'] === 401) { // unauthorized
				return new JSONResponse(
					array(
						'response' => 'error',
						'msg' => 'Unauthorized'
					)
				);
			}

			
			// $notification = $this->notificationManager->createNotification();
			// $notification->setApp(Application::APP_ID)
			// 	->setSubject("abc", "123")
			// 	->setUser($username)
			// 	->setObject('xyz', '0')
			// 	->setDateTime(new DateTime());
				
			// var_dump($notification);
			// die(1);

			// $this->notificationManager->notify($notification);

			return new JSONResponse(
				array(
					'response' => 'success',
					'data' => $parsed_res
				)
			);

		} catch (\Exception $e) {
			\OC::$server->getLogger()->logException($e, ['app' => 'mbfarchivetime']);

			return new JSONResponse(
				array(
					'response' => 'error',
					'msg' => $e->getMessage()
				)
			);
		}

	}

}
