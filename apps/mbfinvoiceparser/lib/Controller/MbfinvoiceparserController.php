<?php
namespace OCA\MbfInvoiceParser\Controller;

use OC\Files\Filesystem;
use OCA\MbfInvoiceParser\AppInfo\Application;
use OCA\MbfInvoiceParser\Service\MbfInvoiceParserService;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\JSONResponse;
use OCP\IRequest;
use OCP\ISession;
// use OCP\Notification\IManager;
use OCP\Activity\IManager;
use OCA\Activity\FilesHooksStatic;
use OCA\Activity\FilesHooks;
// use OCA\Activity\Data;
use OCA\Activity\Extension\Files;

class MbfinvoiceparserController extends Controller {
	protected $mbfInvoiceParserService;

	/** @var ISession $session */
	private $session;
	/** @var IManager */
	private $activityManager;
	// /** @var \OCA\Activity\Data */
	// protected $activityData;
	/** @var FilesHooks */
	private $filesHooks;

	public function __construct($appName, IRequest $request, MbfInvoiceParserService $mbfInvoiceParserService,
									ISession $session,
									IManager $activityManager, FilesHooks $filesHooks,
									// Data $activityData
									) {
		parent::__construct($appName, $request);
		$this->mbfInvoiceParserService = $mbfInvoiceParserService;
		$this->session = $session;
		$this->activityManager = $activityManager;
		$this->filesHooks = $filesHooks;
		// $this->activityData = $activityData;
	}

	/**
	 * @NoAdminRequired
	 */
	public function get($source) {
		try {
			$dataXml = $this->mbfInvoiceParserService->getXmlData($source);

			if (!empty($dataXml)) {
				return new JSONResponse(
					array(
						'response' => 'success',
						'data' => $dataXml
					)
				);

			} else {
				return new JSONResponse(
					array(
						'response' => 'error',
						'msg' => Application::getL10N()->t('No Data Xml found.')
					)
				);
			}

		} catch (\Exception $e) {
			\OC::$server->getLogger()->logException($e, ['app' => 'mbfinvoiceparser']);

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
	public function getInvoiceValidation($source, $fileId) {
		// var_dump(array($this->session->get('loginname'), $this->session->get('password')));
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
			$ch = curl_init('http://10.1.204.16:8003/ecm/v1/xml/check-valid-invoice-by-id');
			// ...
			// more setup things, using params of the function, etc.
			// ...
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			curl_setopt($ch, CURLOPT_HTTPHEADER, array(
			    "Content-Type: application/json",
			    "Accept: application/json",
			    "Authorization: Bear {$token}"
			));
			// $filePathPayload = json_encode(array(
			// 	"ecm_file_path" => $source
			// 	// "ecm_file_id" => $fileId
			// 	)
			// );
			
			// fix fileID for file 'a (6).xml'
			// $fixedFileId = '2529';

			$filePathPayload = json_encode(array(
				// "ecm_file_path" => $source
				// "ecm_file_id" => $fixedFileId
				"ecm_file_id" => $fileId
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

			// $event = $this->activityManager->generateEvent();
			// var_dump($event);
			// die(1);
				
			// $event->setApp('files')
			// 	->setType('files')
			// 	->setAuthor($this->activityManager->getCurrentUserId())
			// 	->setAffectedUser($this->activityManager->getCurrentUserId())
			// 	->setSubject('created_self')
			// 	->setObject('dummy', '23');
			// $this->activityManager->publish($event);
			
			// var_dump($event);
			// var_dump($this->activityManager->getCurrentUserId());
			// die(1);
			// var_dump(array($event));
			// die(1);
	
			// $vars = new StdClass();
			// $vars->path = "bear";
			// $vars = (object)array("path"=>"bear");
			// $this->filesHooks->addNotificationsForFileAction($source, Files::TYPE_SHARE_CREATED, 'created_self', 'created_by');
			

			return new JSONResponse(
				array(
					'response' => 'success',
					'data' => $parsed_res
				)
			);

		} catch (\Exception $e) {
			\OC::$server->getLogger()->logException($e, ['app' => 'mbfinvoiceparser']);

			return new JSONResponse(
				array(
					'response' => 'error',
					'msg' => $e->getMessage()
				)
			);
		}

	}
	
	// it works -> apply the mbfinvoiceparser app

	/**
	 * @NoAdminRequired
	 */
	public function assignFileTag($source, $fileId, $tagLabel) {
		// var_dump(array($this->session->get('loginname'), $this->session->get('password')));
		// die(1);
		// var_dump(array($source, $file, $tagLabel));
		// die(1);
		// var_dump("abc");
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
			$ch = curl_init('http://10.1.204.16:8003/ecm/v1/xml/check-valid-invoice-by-id');
			// ...
			// more setup things, using params of the function, etc.
			// ...
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			curl_setopt($ch, CURLOPT_HTTPHEADER, array(
			    "Content-Type: application/json",
			    "Accept: application/json",
			    "Authorization: Bear {$token}"
			));
			// $filePathPayload = json_encode(array(
			// 	"ecm_file_path" => $source
			// 	// "ecm_file_id" => $fileId
			// 	)
			// );
			

			$filePathPayload = json_encode(array(
				"ecm_path" => $source,
				"tag_label" => $tagLabel
				// "ecm_file_id" => $fixedFileId
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
