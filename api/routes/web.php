<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {

   $routes = [];
foreach (\Route::getRoutes()->getIterator() as $route){
    if (strpos($route->uri, 'api') !== false){
        $routes[] = ("Rota: ".$route->uri . " - Metodo :" . $route->methods[0]);

       
    }
}

return $routes;
return view('welcome', compact('routes')); 
return view('emails', compact('routes')); 
});
