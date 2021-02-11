<?php

namespace App\Http\Controllers;

use App\Models\Enigma;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class EditEnigmaController extends Controller
{
    /*
    | Controller for edit enigmas
    */
    public function allEnigmas() {
        return Enigma::all();
    }

    public function editEnigma(Request $request) {
        $params = $request->all();
        $id = $params['id'];
        $values = [
            'text' => $params['text'],
            'points' => $params['points'],
            'accessible_at' => $params['accessible_at']
        ];
        if( $id == -1 )
            $enigma = Enigma::create( $values );
        else
            $enigma = Enigma::find($id)->update( $values );
        return $enigma;
    }
}