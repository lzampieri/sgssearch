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
    protected $appends = [
        'total_points'
    ];

    public function solvedEnigmas() {
        return $this->belongsToMany( Enigma::class, 'solved_enigmas' );
    }

    public function submittedSolutions() {
        return $this->hasMany( SubmittedSolution::class );
    }

    public function getTotalPointsAttribute() {
        return $this->solvedEnigmas()->pluck('points')->sum();
    }

    public function visibleEnigmas() {
        return Enigma::where( 'accessible_at', '<', $this->total_points + 1 );
    }
}
