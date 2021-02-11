<?php

use App\Http\Controllers\EditEnigmaController;
use App\Http\Controllers\GoogleAuthController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;

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
    
    // Home Page
    Route::get('/', function () {
        return view('home');
    })->name('home');

    // API-like webapp tools
    Route::prefix('web_api')->group(function() {
        // User details
        Route::get('/details', function () {
            return Auth::user();
        })->name('details');
        
        // User enigma
        Route::get('/enigmas', function () {
            return Auth::user()->visibleEnigmas()->get();
        })->name('enigmas');
    });
});

Route::middleware(['auth.admin'])->group(function() {
    // Admin page
    Route::get('/admin', function () {
        return view('home', ['admin' => true]);
    })->name('admin');

    // API-like webapp tools
    Route::prefix('web_api')->group(function() {
        // All enigmas
        Route::get('/all_enigmas', [ EditEnigmaController::class, 'allEnigmas' ]);
        // Edit enigma
        Route::post('/edit_enigma', [ EditEnigmaController::class, 'editEnigma' ]);
    });
});

Route::get('/react_test', function () {
    return view('react_test');
});