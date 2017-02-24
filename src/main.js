import {rc_cache as Cache} from './Cache';
import {rc_helper as Helper} from './code/Helper';

//保存打开网页的时间
window.CACHE_SAVE_TIME = Helper.getNowFormatDate();
window.cache = new Cache();
