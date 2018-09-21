<?php


error_reporting(E_ALL);
ini_set('display_errors', 1);

use Illuminate\Http\Request;
use App\User;
use App\Config;
use App\Apoiador;
use App\Especie;
use App\Arvore;
use App\Fotos;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Intervention\Image\ImageManagerStatic as Image;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/*###############################################
#################################################*/
/* USUARIOS */
/*###############################################
#################################################*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
	$user = $request->user()::with('arvore','comentario')->find($request->user()->id);
    return $user;
});

Route::post('/login', function (Request $request) {
    
    $data = $request->all();
	
	if (Auth::attempt(['email' => $data['email'], 'password' => $data['password']])) {
		$user = Auth()->user();
    	$token = $user->createToken($data['email'])->accessToken;
    	return '{"token":"'.$token.'"}';
	}

    return "";

});


//Route::post('forgot/password', 'ForgotPasswordController')->name('forgot.password');


Route::post('password/email', 'Auth\ForgotPasswordController@getResetToken');
Route::post('password/reset', 'Auth\ResetPasswordController@reset');

Route::post('/loginFacebook', function (Request $request) {
    
    $data = $request->all();
    
    if (Auth::attempt(['email' => $data['email'], 'password' => $data['password']])) {
        $user = Auth()->user();
        $token = $user->createToken($data['email'])->accessToken;
        return '{"token":"'.$token.'"}';
    }
    else{

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'phone' => $data['phone'],
            'picture' => $data['picture'],
            'admin' => $data['admin'],
            'password' => Hash::make($data['password'])
        ]);


    // Creating a token without scopes...
    $user->token = $user->createToken($user->email)->accessToken;
    //$token = $user->createToken($user->email)->accessToken;
    return '{"token":"'.$token.'"}';

    }

    return '{"erro":"Usuário ou senha incorretos"}';

});

Route::post('/user/create', function (Request $request) {
    
    $data = $request->all();

   /* $validar = Validator::make($data, [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'phone' => 'required|string|max:100|unique:users',
            'picture' => 'string|max:255|null',
            'admin' => 'boolean',
            'password' => 'required|string|min:5',
        ]);

    if($validar->fails())
    	return $validar->errors();*/


    $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'phone' => $data['phone'],
            'picture' => $data['picture'],
            'admin' => $data['admin'],
            'active' => true,
            'password' => Hash::make($data['password'])
        ]);


	// Creating a token without scopes...
	$user->token = $user->createToken($user->email)->accessToken;
    
    //$token = $user->createToken($user->email)->accessToken;
    return $user;

});

Route::middleware('auth:api')->put('/user/update', function (Request $request) {
    
    
    $user = $request->user();
    $data = $request->all();


    if($data['password'])
    {
    	$data['password'] = Hash::make($data['password']);
    }

    if($user->admin == 0 && $data['admin'])
    {
    	$data['admin'] = 0;
    }

    $user->update($data);
    $user->token = $user->createToken($user->email)->accessToken;
    	
    return $user;

});

Route::middleware('auth:api')->get('/user/all', function (Request $request) {
    
    $user = $request->user();
    if($user->admin == 1){
    	return User::all();
    }

    return $request->user();
});


Route::get('/exemploApi', function (Request $request) {
    return $request->all();
});

/*###############################################
#################################################*/
/* CONFIG */
/*###############################################
#################################################*/

Route::get('/config', function (Request $request) {
	//dd($request);
    return Config::find(1);
});


Route::middleware('auth:api')->put('/config/update', function (Request $request) {

    $user = $request->user();
    $config = Config::find(1);
    $data = $request->all();

    

    if($user->admin > 0)
    	$config->update($data);

	//return dd($request);

});


/*###############################################
#################################################*/
/* APOIADOR */
/*###############################################
#################################################*/

Route::get('/apoiador', function (Request $request) {
	//dd($request);
    return Apoiador::all();
});

Route::get('/apoiador/{id}', function ($id) {
	//dd($request);
    return Apoiador::find($id);
});

Route::middleware('auth:api')->put('/apoiador/update', function (Request $request) {

    $user = $request->user();
    
    $data = $request->all();
	
    //return dd($data);

	$apoiador = Apoiador::find($data['id_apoiador']);
    

    if($user->admin > 0)
    	$apoiador->update($data);

	//return true;

});

Route::middleware('auth:api')->post('/apoiador/create', function (Request $request) {

    $user = $request->user();
    $data = $request->all();
	//$apoiador = Apoiador::find($data->id_apoiador);
    

    if($user->admin > 0){
    	
	 	//'url_logo', 'nome','contato'
	    $apoiador = Apoiador::create([
	            'url_logo' => $data['url_logo'],
	            'nome' => $data['nome'],
	            'contato' => $data['contato']
	        ]);

	    return $apoiador;
	}

	return false;

});

Route::middleware('auth:api')->delete('/apoiador/delete/{id}', function ($id, Request $request) {

    $user = $request->user();
    
    if($user->admin > 0){
    	
    	$apoiador = Apoiador::find($id)->delete();

    	return response()->json(null, 204);
	}

	return "";

});




/*###############################################
#################################################*/
/* ESPECIE */
/*###############################################
#################################################*/

Route::get('/especie', function (Request $request) {
	//dd($request);
    return Especie::with('arvore')->get();
});

Route::get('/especie/{id}', function ($id) {
	//dd($request);
    return Especie::with('arvore')->find($id);
});


Route::middleware('auth:api')->put('/especie/update', function (Request $request) {

    $user = $request->user();
    
    $data = $request->all();
	
    //return dd($data);

	
    

    if($user->admin > 0)
    	$especie = Especie::find($data['id_especie'])->update($data);

	//return true;

});

Route::middleware('auth:api')->post('/especie/create', function (Request $request) {

    $user = $request->user();
    $data = $request->all();
	//$apoiador = Apoiador::find($data->id_apoiador);

	$validar = Validator::make($data, [
            'nome' => 'required|string|max:100|unique:especie',
            'descricao' => 'string|max:500',
            
        ]);

    if($validar->fails())
    	return $validar->errors();
    

    if($user->admin > 0){
    	
	 	//'url_logo', 'nome','contato'
	    $especie = Especie::create([
	            'nome' => $data['nome'],
	            'descricao' => $data['descricao']
	        ]);

	    return $especie;
	}

	return false;

});

Route::middleware('auth:api')->delete('/especie/delete/{id}', function ($id, Request $request) {

    $user = $request->user();
    
    if($user->admin > 0){
    	
    	$especie = Especie::find($id)->delete();

    	return response()->json(null, 204);
	}

	return false;

});

/*###############################################
#################################################*/
/* ARVORE */
/*###############################################
#################################################*/

Route::get('/arvore', function (Request $request) {
	//dd($request);
    return Arvore::with('fotos','especie')->get();
});

Route::get('/arvore/{id}', function ($id) {
	//dd($request);
    return Arvore::with('fotos','especie')->find($id);
});


Route::middleware('auth:api')->put('/arvore/update', function (Request $request) {

    $user = $request->user();
    
    $data = $request->all();
	
    //return dd($data);

    if($user->admin > 0)
    	$especie = Arvore::find($data['id_arvore'])->update($data);

	//return true;

});

Route::middleware('auth:api')->post('/arvore/create', function (Request $request) {

    $user = $request->user();
    $data = $request->all();

    $data['user_id'] = $user['id'];
  
    	
 	//'url_logo', 'nome','contato'
    $arvore = Arvore::create($data);

    return $arvore;
	

});

Route::middleware('auth:api')->delete('/arvore/delete/{id}', function ($id, Request $request) {

    $user = $request->user();
    
    if($user->admin > 0){
    	
    	$especie = Arvore::find($id)->delete();

    	return response()->json(null, 204);
	}

	return false;

});

/*###############################################
#################################################*/
/* FOTO */
/*###############################################
#################################################*/

Route::middleware('auth:api')->post('/arvore/foto/add/{id}', function ($id, Request $request) {

    $user = $request->user();
    
    //return dd($request->file('image'));
    // do we have an image to process?
        if($request->image){

        	$files = $request->file('image');
		       
		       if(!empty($files)) {

		       		$path = public_path('images/arvores/'.$user->id );
		            File::exists($path) or File::makeDirectory($path);
		            $path = public_path('images/arvores/'.$user->id .'/'.$id);
		            File::exists($path) or File::makeDirectory($path);



		           foreach($files as $file) {

		           		$filename = substr( md5( $id . '-' . time() ), 0, 15) . '.' . $file->getClientOriginalExtension();

						//$img = Image::make($file)->resize(500);
				        //$files->move($path, $filename);

			            
						Image::make($file)->orientate()->
											resize(null,500,function ($constraint) {
					    						$constraint->aspectRatio();
					    						$constraint->upsize();
											})->
											insert('images/watermark.png', 'bottom-right', 0, 0)->
											save('images/arvores/'.$user->id .'/'.$id.'/' .$filename);
						$data['user_id'] = $user['id'];
						$data['arvore_id'] = $id;
						$data['urlfoto'] = $filename;

						$arvore = Fotos::create($data);
						//return dd($request->file('image'));

		        }

	            return 'success';
		    }

        }

        return 'success';


});

