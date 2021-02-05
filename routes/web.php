<?php

use App\Http\Controllers\GoogleAuthController;
use Illuminate\Support\Facades\Route;
use Laravel\Socialite\Facades\Socialite;

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

/* Socialite OAuth */
Route::get('/login_google', [ GoogleAuthController::class, 'redirect' ] )->name('login-google');
Route::get('/auth_google', [ GoogleAuthController::class, 'callback' ] )->name('callback-google');
Route::get('/logout_google', [ GoogleAuthController::class, 'logout' ] )->name('logout-google');

/* Login */
Route::redirect('/login', 'login_google' ) -> name('login') ;
Route::redirect('/logout', 'logout_google' ) -> name('logout') ;


Route::middleware(['auth'])->group(function() {
    Route::get('/', function () {
        return view('welcome');
    })->name('home');
});

Route::get('/amilogin', function () {
    return 'No';
});






