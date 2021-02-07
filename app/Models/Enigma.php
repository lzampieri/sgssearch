<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Enigma extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'text',
        'points',
        'accessible_at'
    ];

    public function solvedBy() {
        return $this->hasManyThrough( User::class, SolvedEnigma::class );
    }

    public function solutions() {
        return $this->hasMany( Solution::class );
    }

}
