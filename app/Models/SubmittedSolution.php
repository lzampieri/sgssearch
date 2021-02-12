<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SubmittedSolution extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'value',
        'enigma_id',
    ];

    public function enigma() {
        return $this->belongsTo( Enigma::class );
    }

    public function user() {
        return $this->belongsTo( User::class );
    }

}
