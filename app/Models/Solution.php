<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Solution extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'value',
        'int',
        'valid'
    ];

    public function enigma() {
        return $this->belongsTo( Enigma::class );
    }

}
