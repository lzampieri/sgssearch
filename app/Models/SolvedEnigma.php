<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SolvedEnigma extends Model
{
    protected $fillable = [
        'enigma_id',
        'user_id'
    ];
}
