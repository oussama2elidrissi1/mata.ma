<?php

namespace App\Mail;

use App\Models\TourismActor;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ActorAccountCreated extends Mailable
{
    use Queueable, SerializesModels;

    public $actor;
    public $email;
    public $password;

    public function __construct(TourismActor $actor, string $email, string $password)
    {
        $this->actor = $actor;
        $this->email = $email;
        $this->password = $password;
    }

    public function build()
    {
        return $this->subject('Votre compte MATA a été créé - Vos identifiants de connexion')
            ->view('emails.actor-account-created')
            ->with([
                'actor' => $this->actor,
                'email' => $this->email,
                'password' => $this->password,
            ]);
    }
}
