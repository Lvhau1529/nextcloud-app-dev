<?php

declare(strict_types=1);


/**
 * Files_FullTextSearch - Index the content of your files
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later. See the COPYING file.
 *
 * @author Maxence Lange <maxence@artificial-owl.com>
 * @copyright 2018
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */


namespace OCA\Files_FullTextSearch\Db;

use Exception;
use OCP\Files\Node;

class SharesRequest extends SharesRequestBuilder {


	/**
	 * @param Node $file
	 *
	 * @return array
	 */
	public function getFromFile(Node $file): array {
		$shares = [];
		try {
			$qb = $this->getSharesSelectSql();
			$qb->limitToFileSource($file->getId());

			$cursor = $qb->execute();
			while ($data = $cursor->fetch()) {
				$shares[] = $data;
			}
			$cursor->closeCursor();
		} catch (Exception $e) {
			/** issue while doing some DB request */
		}

		return $shares;
	}
}
