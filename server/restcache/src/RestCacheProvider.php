<?php

namespace Jimb\RestCache;

use Jimb\RestCache\Observers\RestCacheDbObserver;
use Illuminate\Support\ServiceProvider;
use Jimb\RestCache\RestCache;

class RestCacheProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        //数据库迁移
        $this->publishes([
            __DIR__.'/../database/migrations/create_restcache_table.php.stub' => database_path('migrations/'.date('Y_m_d_His', time()).'_create_restcache_table.php'),
        ], 'migrations');

        //定义路由
        $router = app("router");
        $config = config('RestCache.route', []);
        $router->group($config, function ($router) {
//            $router->get('/laravel-u-editor-server/server', 'Controller@server');
        });

        //注册观察着
        RestCache::observe(RestCacheDbObserver::class);
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        //定义config
        $configPath = realpath(__DIR__ . '/../config/RestCache.php');
        $this->mergeConfigFrom($configPath, 'RestCache');
        $this->publishes([$configPath => config_path('RestCache.php')], 'config');

        $this->app->singleton('RestCache', function () {
            return new RestCache();
        });
    }
}
