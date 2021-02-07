<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class GoogleAuthController extends Controller
{
    /*
    | Controller for login via Socialite/Google
    */

    public function redirect() {
        return Socialite::driver('google')->redirect();
    }

    public static function extractName($themail) {
        $thename = substr( $themail, 0, strpos( $themail, '@' ) );
        $thename = preg_replace( [ '/\d/' , '/\./' ] , [ '' , ' ' ] , $thename );
        $thename = ucwords($thename);
        $thename = trim($thename);
        return $thename;
    }

    public function callback() {
        $user = Socialite::driver('google')->user();
        // TODO: insert checks on mail domain
        $theUser = User::firstOrCreate( ['email' => $user->getEmail() ], ['name' => GoogleAuthController::extractName( $user->getEmail() )]);
        Auth::login($theUser);
        return redirect( route( 'home' ) );
    }

    public function logout(Request $request) {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/');
    }
}
