<?php
/**
 * @var \OC_Defaults $theme
 * @var array $_
 */

$getUserAvatar = static function (int $size) use ($_): string {
	return \OC::$server->getURLGenerator()->linkToRoute('core.avatar.getAvatar', [
		'userId' => $_['user_uid'],
		'size' => $size,
		'v' => $_['userAvatarVersion']
	]);
};
$initAndUpdateOcrFileList = static function($user_uid) {
	// $ownerView = new \OC\Files\View('/'. $user_uid . '/files');
	// $path = $ownerView->getPath(1368);
	// $fileInfo = $ownerView->getFileInfo($path);
	// $owner = $ownerView->getOwner($path);
	// var_dump($path);
	// var_dump($owner);
	// echo($fileInfo);
	// die(1);
	
	// {
	//	'giap.hoangminh10': {
	//		'107977': 'Bang_tieng_Duc_Nguyen.pdf',
	// 		'107978': 'ABC.pdf'
	// 	},
	//	'lanh.hoangthi': {
	//		'107979': 'Bang_tieng_Duc_Nguyen.pdf',
	// 		'107980': 'ABC.pdf'
	// 	}
	// }
	// echo 'abccccccc ';
	// echo($user_uid);
	// echo `<script>console.log("aplscpaslcaspcl");</script>`;
	// echo "<script>localStorage.setItem('keyy', 'valuee');</script>";
	// echo(file_exists("./ocrfilelist.txt"));
	// echo(filesize("./ocrfilelist.txt"));

	// var_dump($user_uid);
	$filename = "./ocrfilelist.txt";
	$jsonObject = null;
	if (file_exists($filename)) {
		// echo "The file $filename exists";
		$fileContent = file_get_contents($filename, true);
		// echo($fileContent);
		
		$existedObjectFile = json_decode($fileContent);
		// var_dump($existedObjectFile);
		// var_dump($existedObjectFile->{$user_uid});
		
		if(property_exists($existedObjectFile, $user_uid)) {
			// echo("The property $user_uid exists");
			// $currentUserFileOcrKeyValue = $existedObjectFile->{$user_uid};
		} else {
			// echo("The property $user_uid not exists");
			// $arr = array();
			$newObjectFileValue = new StdClass();
			$existedObjectFile->{$user_uid} = $newObjectFileValue;
			$jsonObject = json_encode($existedObjectFile);
		}
		
		foreach($existedObjectFile as $userFileOcrUserUid => $userFileOcrFileIdKeyFileNameValue) {

			// var_dump($userFileOcrUserUid);
			// var_dump($userFileOcrFileIdKeyFileNameValue);
	
			// $app = new \OCP\AppFramework\App('mbfocr');
			
			// $mbfOcrController = $app->getContainer()->get('OCA\MbfOcr\Controller\MbfOcrController');
			// $checkStatusOcrFileJsonResponse = $mbfOcrController->checkStatusOcrFile("Bang_tieng_Duc_Nguyen.pdf", 107977);
			// var_dump("---------------");
			// var_dump($checkStatusOcrFileJsonResponse->getData());
			// $checkStatusOcrFileResponse = $checkStatusOcrFileJsonResponse->getData();
			// var_dump($checkStatusOcrFileResponse['data']->code);
			// $checkStatusOcrFileResponseCode = intval($checkStatusOcrFileResponse['data']->code);
			// var_dump($checkStatusOcrFileResponseCode);
			// if($checkStatusOcrFileResponseCode === 47) {
			// 	var_dump("addNotificationsForFileAction");
			// 	$app = new \OCP\AppFramework\App('activity');
				
			// 	$filesHooks = $app->getContainer()->get('OCA\Activity\FilesHooks');
			// 	$filesHooks->fileCreate("Bang_tieng_Duc_Nguyen.pdf");
			// 	// echo($filesHooks);
			// 	// $filesHooks->addNotificationsForFileAction("Bang_tieng_Duc_Nguyen.pdf", Files::TYPE_SHARE_CREATED, 'created_self', 'created_by');
			// 	// var_dump(FilesHooksStatic);
			// 	// unset($currentUserFileOcr[$currentUserFileOcrListIndex]);
			// }

			if($user_uid == $userFileOcrUserUid) {
				foreach($userFileOcrFileIdKeyFileNameValue as $userFileOcrFileId => $userFileOcrFileName) {
					// $userFileOcrFileId = $currentUserFileOcr->fileId;
					// $userFileOcrFileName = $currentUserFileOcr->fileName;
					// echo($userFileOcrFileId);
					// echo($userFileOcrFileName);
	
					$app = new \OCP\AppFramework\App('mbfocr');
					$mbfOcrController = $app->getContainer()->get('OCA\MbfOcr\Controller\MbfOcrController');
					$checkStatusOcrFileJsonResponse = $mbfOcrController->checkStatusOcrFile($userFileOcrFileName, $userFileOcrFileId);
	
					// var_dump("---------------");
					// var_dump($checkStatusOcrFileJsonResponse->getData());
					$checkStatusOcrFileResponse = $checkStatusOcrFileJsonResponse->getData();
					// var_dump($checkStatusOcrFileResponse['data']->code);
					$checkStatusOcrFileResponseCode = intval($checkStatusOcrFileResponse['data']->code);
					// var_dump($checkStatusOcrFileResponseCode);
					if($checkStatusOcrFileResponseCode === 47) {
						// var_dump("addNotificationsForFileAction");
	
						$activityApp = new \OCP\AppFramework\App('activity');
						$filesHooks = $activityApp->getContainer()->get('OCA\Activity\FilesHooks');
						// $filesHooks->fileCreate($userFileOcrFileName);
						$filesHooks->fileOcr($userFileOcrFileName);
						// echo($filesHooks);
						// $filesHooks->addNotificationsForFileAction($userFileOcrFileName, Files::TYPE_SHARE_CREATED, 'created_self', 'created_by');
						// var_dump(FilesHooksStatic);
						unset($userFileOcrFileIdKeyFileNameValue->$userFileOcrFileId);
					}
				}
			}

			$jsonObject = json_encode($existedObjectFile);
		}


	} else {
		// echo "The file $filename does not exist";
		// $arr = array();
		$newObjectFileValue = new StdClass();
		$newObjectFile = new StdClass();
		$newObjectFile->{$user_uid} = $newObjectFileValue;
		$jsonObject = json_encode($newObjectFile);
	}

	$ocrFile = fopen("./ocrfilelist.txt", "w");
	// echo($ocrFile);
	fwrite($ocrFile, $jsonObject);
	fclose($ocrFile);
}

?><!DOCTYPE html>
<html class="ng-csp" data-placeholder-focus="false" lang="<?php p($_['language']); ?>" data-locale="<?php p($_['locale']); ?>" >
	<head data-user="<?php p($_['user_uid']); ?>" data-user-displayname="<?php p($_['user_displayname']); ?>" data-requesttoken="<?php p($_['requesttoken']); ?>">
		<meta charset="utf-8">
		<title>
			<?php
				p(!empty($_['pageTitle'])?$_['pageTitle'].' - ':'');
				p(!empty($_['application'])?$_['application'].' - ':'');
				p($theme->getTitle());
			?>
		</title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />

		<?php if ($theme->getiTunesAppId() !== '') { ?>
		<meta name="apple-itunes-app" content="app-id=<?php p($theme->getiTunesAppId()); ?>">
		<?php } ?>
		<meta name="apple-mobile-web-app-capable" content="yes">
		<meta name="apple-mobile-web-app-status-bar-style" content="black">
		<meta name="apple-mobile-web-app-title" content="<?php p((!empty($_['application']) && $_['appid'] != 'files')? $_['application']:$theme->getTitle()); ?>">
		<meta name="mobile-web-app-capable" content="yes">
		<meta name="theme-color" content="<?php p($theme->getColorPrimary()); ?>">
		<link rel="icon" href="<?php print_unescaped(image_path($_['appid'], 'favicon.ico')); /* IE11+ supports png */ ?>">
		<link rel="apple-touch-icon" href="<?php print_unescaped(image_path($_['appid'], 'favicon-touch.png')); ?>">
		<link rel="apple-touch-icon-precomposed" href="<?php print_unescaped(image_path($_['appid'], 'favicon-touch.png')); ?>">
		<link rel="mask-icon" sizes="any" href="<?php print_unescaped(image_path($_['appid'], 'favicon-mask.svg')); ?>" color="<?php p($theme->getColorPrimary()); ?>">
		<link rel="manifest" href="<?php print_unescaped(image_path($_['appid'], 'manifest.json')); ?>">
		<?php emit_css_loading_tags($_); ?>
		<?php emit_script_loading_tags($_); ?>
		<?php print_unescaped($_['headers']); ?>
	</head>
	<body id="<?php p($_['bodyid']);?>" <?php foreach ($_['enabledThemes'] as $themeId) {
				p("data-theme-$themeId ");
			}?> data-themes=<?php p(join(',', $_['enabledThemes'])) ?>>
			<?php $initAndUpdateOcrFileList($_['user_uid']); ?>
	<?php include 'layout.noscript.warning.php'; ?>

		<?php foreach ($_['initialStates'] as $app => $initialState) { ?>
			<input type="hidden" id="initial-state-<?php p($app); ?>" value="<?php p(base64_encode($initialState)); ?>">
		<?php }?>

		<div id="skip-actions">
			<?php if ($_['id-app-content'] !== null) { ?><a href="<?php p($_['id-app-content']); ?>" class="button primary skip-navigation skip-content"><?php p($l->t('Skip to main content')); ?></a><?php } ?>
			<?php if ($_['id-app-navigation'] !== null) { ?><a href="<?php p($_['id-app-navigation']); ?>" class="button primary skip-navigation"><?php p($l->t('Skip to navigation of app')); ?></a><?php } ?>
		</div>

		<header role="banner" id="header">
			<div class="header-left">
				<a href="<?php print_unescaped($_['logoUrl'] ?: link_to('', 'index.php')); ?>"
					id="nextcloud">
					<div class="logo logo-icon"></div>
				</a>

				<nav id="header-left__appmenu"></nav>
			</div>

			<div class="header-right">
				<div id="unified-search"></div>
				<div id="notifications"></div>
				<div id="contactsmenu">
					<div class="menutoggle" tabindex="0" role="button"
					aria-haspopup="true" aria-controls="contactsmenu-menu" aria-expanded="false">
						<span class="hidden-visually"><?php p($l->t('Contacts'));?></span>
					</div>
					<div id="contactsmenu-menu" class="menu"
						aria-label="<?php p($l->t('Contacts menu'));?>"></div>
				</div>
				<div id="settings">
					<div id="expand" tabindex="0" role="button" class="menutoggle"
						aria-label="<?php p($l->t('Open settings menu'));?>"
						aria-haspopup="true" aria-controls="expanddiv" aria-expanded="false">
						<div id="avatardiv-menu" class="avatardiv<?php if ($_['userAvatarSet']) {
				print_unescaped(' avatardiv-shown');
			} else {
				print_unescaped('" style="display: none');
			} ?>"
							 data-user="<?php p($_['user_uid']); ?>"
							 data-displayname="<?php p($_['user_displayname']); ?>"
			<?php
			if ($_['userAvatarSet']) {
				$avatar32 = $getUserAvatar(32); ?> data-avatar="<?php p($avatar32); ?>"
			<?php
			} ?>>
							<?php
							if ($_['userAvatarSet']) {?>
								<img alt="" width="32" height="32"
								src="<?php p($avatar32);?>"
								srcset="<?php p($getUserAvatar(64));?> 2x, <?php p($getUserAvatar(128));?> 4x"
								>
							<?php } ?>
						</div>
					</div>
					<nav class="settings-menu" id="expanddiv" style="display:none;">
					<ul>
					<?php foreach ($_['settingsnavigation'] as $entry):?>
						<li data-id="<?php p($entry['id']); ?>">
							<a href="<?php print_unescaped($entry['href'] !== '' ? $entry['href'] : '#'); ?>"
								<?php if ($entry["active"]): ?> class="active"<?php endif; ?>>
								<img alt="" src="<?php print_unescaped($entry['icon'] . '?v=' . $_['versionHash']); ?>">
								<?php p($entry['name']) ?>
							</a>
						</li>
					<?php endforeach; ?>
					</ul>
					</nav>
				</div>
			</div>
		</header>

		<div id="sudo-login-background" class="hidden"></div>
		<form id="sudo-login-form" class="hidden" method="POST">
			<label>
				<?php p($l->t('This action requires you to confirm your password')); ?><br/>
				<input type="password" class="question" autocomplete="new-password" name="question" value=" <?php /* Hack against browsers ignoring autocomplete="off" */ ?>"
				placeholder="<?php p($l->t('Confirm your password')); ?>" />
			</label>
			<input class="confirm" value="<?php p($l->t('Confirm')); ?>" type="submit">
		</form>

		<main id="content" class="app-<?php p($_['appid']) ?>">
			<h1 class="hidden-visually">
				<?php p($l->t('%s\'s homepage', [$theme->getName()])); ?>
			</h1>
			<?php print_unescaped($_['content']); ?>
		</main>
		<div id="profiler-toolbar"></div>
	</body>
</html>
