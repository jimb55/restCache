<?php

namespace Jimb\RestCache\Observers;

use Jimb\RestCache\RestCache;

class RestCacheDbObserver
{
    /**
     * Listen to the User RestCache event.
     *
     * @param  RestCache  $restCache
     * @return void
     */
    public function saved(RestCache $restCache)
    {
        echo "xxx";
    }
}