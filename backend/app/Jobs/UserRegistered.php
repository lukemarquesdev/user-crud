<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use App\Mail\UserRegisteredMail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use App\Models\User;

class UserRegistered implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct(public string $name, public string $email)
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        Log::debug($this->name);
        Log::debug($this->email);
        Mail::to($this->email)->send(new UserRegisteredMail($this->name));
    }
}
