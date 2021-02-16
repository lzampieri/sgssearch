<?php

namespace App\Http\Controllers;

use App\Models\Enigma;
use App\Models\Solution;
use App\Models\SolvedEnigma;
use App\Models\SubmittedSolution;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;

class UserEnigmaController extends Controller
{
    /*
    | Controller for enigmas
    */
    public function userDetails() {
        return Auth::user();
    }

    public function chart() {
        return User::where('admin',0)->get()->makeHidden(['admin', 'email']);
    }

    public function userEnigmas() {
        $visible = Auth::user()->visibleEnigmas()->get();
        global $solved;
        $solved = Auth::user()->solvedEnigmas()->get();
        $enigmas = $visible->map( function($enigma) {
            global $solved;
            $enigma['solved'] = $solved->contains( $enigma );
            return $enigma;
        });
        return $enigmas;
    }

    public function checkSolution(Request $request) {
        $params = $request->all();
        $enigma_id = $params['enigma_id'];
        $proposal = $params['proposal'];
        Auth::user()->submittedSolutions()->create( [ 'enigma_id' => $enigma_id, 'value' => $proposal ] );
        $response = Enigma::find( $enigma_id )->solutions()->where( [ 'value' => $proposal ] )->first();
        if( !$response )
            return [ 'id' => -1 ];
        if( $response->valid > 0 ) {
            SolvedEnigma::firstOrCreate( [ 'user_id' => Auth::user()->id, 'enigma_id' => $enigma_id ]);
        }
        return $response;
    }
}