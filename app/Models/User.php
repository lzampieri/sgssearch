<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'email',
        'name'
    ];

    public function solvedEnigmas() {
        return $this->hasManyThrough( Enigma::class, SolvedEnigma::class );
    }

    public function totalPoints() {
        return array_sum( $this->solvedEnigmas()->pluck('points') );
    }

    public function visibleEnigmas() {
        return Enigma::where( 'accessible_at', '<', $this->totalPoints() + 1 );
    }
}
