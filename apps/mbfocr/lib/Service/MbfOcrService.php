<?php
namespace OCA\MbfOcr\Service;

use OC\Files\Filesystem;

class MbfOcrService {

    protected $language;

    public function __construct() {
//        $this->language = \OC::$server->getL10N(Application::APP_NAME);
    }

    protected function t($text, $parameters = array()) {
        return $this->language->t($text, $parameters);
    }
}
