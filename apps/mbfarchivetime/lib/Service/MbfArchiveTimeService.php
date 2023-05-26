<?php
namespace OCA\MbfArchiveTime\Service;

use OC\Files\Filesystem;

class MbfArchiveTimeService {

    protected $language;

    public function __construct() {
//        $this->language = \OC::$server->getL10N(Application::APP_NAME);
    }

    protected function t($text, $parameters = array()) {
        return $this->language->t($text, $parameters);
    }
}
