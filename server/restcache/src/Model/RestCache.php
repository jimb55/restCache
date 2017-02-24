<?php

namespace Jimb\RestCache\Model;

use Illuminate\Database\Eloquent\Model;
use Jimb\RestCache\ConfigManage;

class RestCache extends Model
{
    use ConfigManage;
    protected $table = "restcache";

    /**
     * 转换时区 为 中国上海
     *
     * @param \DateTime|int $value
     * @return mixed
     */
    public function fromDateTime($value)
    {
        return $value -> timezone($this -> getConfig()["timezone"]);
    }
}
