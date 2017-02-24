<?php
/**
 * Created by PhpStorm.
 * User: jimb55
 * Date: 17/2/20
 * Time: 下午3:39
 */

use Jimb\RestCache\RestCache;

$restCache = new RestCache;

$data = $restCache -> getRouterFromTime($_GET["updated_at"]);

echo json_encode($data);