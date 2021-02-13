<?php

namespace App\Http\Controllers;

use App\Models\Enigma;
use App\Models\SubmittedSolution;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class EditEnigmaController extends Controller
{
    /*
    | Controller for edit enigmas
    */
    public function allEnigmas() {
        $enigmas = Enigma::all()->map( function($enigma) {
            $enigma['solutions'] = $enigma->solutions()->get();
            return $enigma;
        });
        return $enigmas;
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

    public function editSolution(Request $request) {
        $params = $request->all();
        $enigma_id = $params['enigma_id'];
        $enigma = Enigma::find($enigma_id);
        $id = $params['id'];
        $values = [
            'value' => $params['value'],
            'hint' => $params['hint'],
            'valid' => $params['valid']
        ];
        if( $id == -1 )
            $solution = $enigma->solutions()->create( $values );
        else
            $solution = $enigma->solutions()->find( $id )->update( $values );
        return $solution;
    }

    public function allResponses() {
        return SubmittedSolution::all()->load( [ 'user' ] );
    }
}