<?php

namespace App\Mail;

use App\Models\AccreditationRequest;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class AccreditationRequestReceived extends Mailable
{
    use Queueable, SerializesModels;

    public $accreditationRequest;

    public function __construct(AccreditationRequest $accreditationRequest)
    {
        $this->accreditationRequest = $accreditationRequest;
    }

    public function build()
    {
        return $this->subject('Votre demande d\'accréditation MATA a été reçue')
            ->view('emails.accreditation-request-received')
            ->with([
                'request' => $this->accreditationRequest,
                'actor' => $this->accreditationRequest->tourismActor,
            ]);
    }
}
