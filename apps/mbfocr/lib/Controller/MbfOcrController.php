<?php
namespace OCA\MbfOcr\Controller;

use OC\Files\Filesystem;
use OCA\MbfOcr\AppInfo\Application;
use OCA\MbfOcr\Service\MbfOcrService;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\JSONResponse;
use OCP\IRequest;
use OCP\ISession;
use OCP\Notification\IManager;
use OCP\AppFramework\Utility\ITimeFactory;

class MbfOcrController extends Controller {
	protected $mbfOcrService;

	/** @var ITimeFactory */
	protected $timeFactory;
	/** @var ISession $session */
	private $session;
	// /** @var IManager */
	private $notificationManager;

	public function __construct($appName, IRequest $request, 
		MbfOcrService $mbfOcrService,
									ISession $session,
									ITimeFactory $timeFactory,
									IManager $notificationManager
									) {
		parent::__construct($appName, $request);
		$this->mbfOcrService = $mbfOcrService;
		$this->session = $session;
		$this->notificationManager = $notificationManager;
		$this->timeFactory = $timeFactory;
	}

	public function index() {
		var_dump("alo");
		die(1);
	}

	
	
	/**
	 * @NoAdminRequired
	 */
	public function checkStatusOcrFile($source, $fileId) {
		// var_dump(array($this->session->get('loginname'), $this->session->get('password')));
		// die(1);
		// var_dump(array($source, $fileId));
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
			$ch = curl_init('http://10.1.204.16:8003/ecm/v1/xml/check_status_ocr');
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
				"ecm_file_path" => $source,
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

			return new JSONResponse(
				array(
					'response' => 'success',
					'data' => $parsed_res
				)
			);

		} catch (\Exception $e) {
			\OC::$server->getLogger()->logException($e, ['app' => 'mbfocr']);

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
	public function ocrFile($source, $fileId) {
		// var_dump(array($this->session->get('loginname'), $this->session->get('password')));
		// die(1);
		// var_dump(array($source, $fileId));
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
			$ch = curl_init('http://10.1.204.16:8003/ecm/v1/ocr/ocr-ecm-celery-pdf');
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
				"ecm_file_path" => $source,
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

			// Done pushing notification
			// Now pushing through API so not using yet
			// $notification = $this->notificationManager->createNotification();
			// $datetime = $this->timeFactory->getDateTime();

			// $notification->setApp('admin_notifications')
			// 	->setUser($username)
			// 	->setDateTime($datetime)
			// 	->setObject('admin_notifications', 'dechex($datetime->getTimestamp())')
			// 	->setSubject("ocs", ["123"]);
			// var_dump($notification);
			// die(1);

			// $notification->setApp('admin_notifications')
			// 	->setUser($username)
			// 	->setDateTime($datetime)
			// 	->setObject('admin_notifications', 'dechex($datetime->getTimestamp())')
			// 	->setSubject('ocs', ["Tài liệu Chức năng báo cáo Bảng kê hoá đơn, chứng từ hàng hoá, dịch vụ mua vàoChức năng báo cáo Bảng kê hoá đơn, chứng từ hàng hoá, dịch vụ mua vào.pdf đã OCR thành công. Tài liệu Chức năng báo cáo Bảng kê hoá đơn, chứng từ hàng hoá, dịch vụ mua vàoChức năng báo cáo Bảng kê hoá đơn, chứng từ hàng hoá, dịch vụ mua vào.pdf đã OCR thành công"])
			// 	->setMessage('ocs', ["Tài liệu Chức năng báo cáo Bảng kê hoá đơn, chứng từ hàng hoá, dịch vụ mua vàoChức năng báo cáo Bảng kê hoá đơn, chứng từ hàng hoá, dịch vụ mua vào.pdf đã OCR thành công. Bạn có thể tìm kiếm tài liệu này."]);
				
			// var_dump($notification);
			// die(1);

			// $this->notificationManager->notify($notification);

			$filename = "./ocrfilelist.txt";
			if (file_exists($filename)) {
				//Open ./ocrfilelist.txt
				$fileContent = file_get_contents('./ocrfilelist.txt', true);
				// {
				//	'giap.hoangminh10': {
				//		'107977': 'Bang_tieng_Duc_Nguyen.pdf',
				// 		'107978': 'ABC.pdf'
				// 	},
				//	'lanh.hoangthi': {
				//		'107977': 'Bang_tieng_Duc_Nguyen.pdf',
				// 		'107978': 'ABC.pdf'
				// 	}
				// }
				$existedObjectFileList = json_decode($fileContent);
				if(property_exists($existedObjectFileList, $username)) {
					$currentUserFileOcrKeyValue = $existedObjectFileList->{$username};
					// var_dump($currentUserFileOcrKeyValue);
					// die(1);
					// var_dump(property_exists($currentUserFileOcrKeyValue, $fileId));
					// die(1);
					if(property_exists($currentUserFileOcrKeyValue, strval($fileId))) {
						// do nothing
						// var_dump("1");
						// die(1);
					}
					else {
						
						$ownerView = new \OC\Files\View('/'. $username . '/files');
						// $path = $ownerView->getPath($fileId);
						// var_dump($path);
						// die(1);
						$fileInfo = $ownerView->getFileInfo($source);
						// var_dump($fileInfo);
						// die(1);
						$owner = $ownerView->getOwner($path);
						// var_dump($owner);
						// die(1);
						
						if($username == $owner) {
							$currentUserFileOcrKeyValue->{$fileId} = $source;
						}
						
						// var_dump("2");
						// die(1);
					}
				}
				$jsonObject = json_encode($existedObjectFileList);
				$ocrFile = fopen("./ocrfilelist.txt", "w");
				// echo($ocrFile);
				fwrite($ocrFile, $jsonObject);
				fclose($ocrFile);
			}

			return new JSONResponse(
				array(
					'response' => 'success',
					'data' => $parsed_res
				)
			);

		} catch (\Exception $e) {
			\OC::$server->getLogger()->logException($e, ['app' => 'mbfocr']);

			return new JSONResponse(
				array(
					'response' => 'error',
					'msg' => $e->getMessage()
				)
			);
		}

	}

}
