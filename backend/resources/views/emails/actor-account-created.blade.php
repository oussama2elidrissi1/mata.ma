<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Compte MATA créé</title>
</head>
<body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
    <div style="background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">MATA</h1>
        <p style="color: #e0e7ff; margin: 5px 0 0 0; font-size: 14px;">Moroccan Accredited Tourism Actors</p>
    </div>
    
    <div style="background: #ffffff; padding: 40px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <h2 style="color: #1e3a8a; margin-top: 0; font-size: 24px; border-bottom: 2px solid #1e3a8a; padding-bottom: 10px;">
            ✅ Félicitations ! Votre demande a été validée
        </h2>
        
        <p style="font-size: 16px; margin: 20px 0;">Bonjour <strong style="color: #1e3a8a;">{{ $actor->name }}</strong>,</p>
        
        <p style="font-size: 16px; color: #4b5563; margin: 20px 0;">
            Votre demande d'accréditation a été <strong style="color: #059669;">approuvée avec succès</strong>. Votre compte utilisateur a été créé pour vous permettre de gérer vos informations sur la plateforme MATA.
        </p>
        
        @if($actor->accreditation_number)
        <div style="background: #f0fdf4; border-left: 4px solid #10b981; padding: 20px; margin: 25px 0; border-radius: 4px;">
            <h3 style="color: #065f46; margin-top: 0; font-size: 18px;">🎖️ Votre numéro d'accréditation :</h3>
            <p style="margin: 10px 0; font-size: 20px; font-weight: bold; color: #059669; font-family: 'Courier New', monospace;">
                {{ $actor->accreditation_number }}
            </p>
        </div>
        @endif
        
        <div style="background: #f3f4f6; padding: 25px; border-radius: 8px; margin: 25px 0; border: 2px solid #1e3a8a;">
            <h3 style="color: #1e3a8a; margin-top: 0; font-size: 20px; text-align: center; margin-bottom: 20px;">
                🔐 Vos identifiants de connexion
            </h3>
            <div style="background: white; padding: 20px; border-radius: 6px; margin-bottom: 15px;">
                <div style="margin-bottom: 15px;">
                    <p style="margin: 0 0 5px 0; color: #6b7280; font-size: 14px; font-weight: 600;">Login :</p>
                    <p style="margin: 0; color: #111827; font-size: 18px; font-weight: bold; font-family: 'Courier New', monospace; background: #f9fafb; padding: 12px; border-radius: 4px; border: 1px solid #e5e7eb;">
                        {{ $email }}
                    </p>
                </div>
                <div>
                    <p style="margin: 0 0 5px 0; color: #6b7280; font-size: 14px; font-weight: 600;">Mot de passe :</p>
                    <p style="margin: 0; color: #111827; font-size: 18px; font-weight: bold; font-family: 'Courier New', monospace; background: #f9fafb; padding: 12px; border-radius: 4px; border: 1px solid #e5e7eb; letter-spacing: 2px;">
                        {{ $password }}
                    </p>
                </div>
            </div>
        </div>
        
        <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 25px 0; border-radius: 4px;">
            <p style="margin: 0; color: #92400e; font-size: 14px;">
                <strong>⚠️ Important :</strong> Veuillez changer votre mot de passe après votre première connexion pour des raisons de sécurité.
            </p>
        </div>
        
        <div style="background: #eff6ff; padding: 20px; margin: 25px 0; border-radius: 6px;">
            <h3 style="color: #1e40af; margin-top: 0; font-size: 18px;">🚀 Vous pouvez maintenant :</h3>
            <ul style="line-height: 2.2; color: #4b5563; padding-left: 20px;">
                <li>Accéder à votre espace personnel</li>
                <li>Modifier vos informations</li>
                <li>Ajouter des images à votre profil</li>
                <li>Gérer vos services et descriptions</li>
                <li>Mettre à jour vos horaires d'ouverture</li>
            </ul>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
            <a href="{{ config('app.frontend_url', 'http://localhost:3001') }}/actor/login" 
               style="display: inline-block; background: #1e3a8a; color: white; padding: 14px 35px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">
                🔐 Se connecter à mon compte
            </a>
        </div>
        
        <p style="color: #6b7280; font-size: 14px; margin-top: 30px; border-top: 1px solid #e5e7eb; padding-top: 20px;">
            Si vous avez des questions, n'hésitez pas à nous contacter.<br><br>
            Cordialement,<br>
            <strong style="color: #1e3a8a;">L'équipe MATA</strong>
        </p>
    </div>
    
    <div style="text-align: center; margin-top: 20px; color: #9ca3af; font-size: 12px;">
        <p>© {{ date('Y') }} MATA - Moroccan Accredited Tourism Actors</p>
    </div>
</body>
</html>
