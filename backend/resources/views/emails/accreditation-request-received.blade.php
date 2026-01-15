<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Demande d'accréditation reçue</title>
</head>
<body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
    <div style="background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">MATA</h1>
        <p style="color: #e0e7ff; margin: 5px 0 0 0; font-size: 14px;">Moroccan Accredited Tourism Actors</p>
    </div>
    
    <div style="background: #ffffff; padding: 40px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <h2 style="color: #1e3a8a; margin-top: 0; font-size: 24px; border-bottom: 2px solid #1e3a8a; padding-bottom: 10px;">
            Demande d'accréditation reçue
        </h2>
        
        <p style="font-size: 16px; margin: 20px 0;">Bonjour <strong style="color: #1e3a8a;">{{ $request->full_name }}</strong>,</p>
        
        <p style="font-size: 16px; color: #4b5563; margin: 20px 0;">
            Nous avons bien reçu votre demande d'accréditation pour <strong>{{ $actor->name }}</strong>.
        </p>
        
        <div style="background: #eff6ff; border-left: 4px solid #3b82f6; padding: 20px; margin: 25px 0; border-radius: 4px;">
            <h3 style="color: #1e40af; margin-top: 0; font-size: 18px;">📋 Détails de votre demande :</h3>
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="padding: 8px 0; color: #6b7280; font-weight: 600; width: 40%;">Acteur :</td>
                    <td style="padding: 8px 0; color: #111827; font-weight: 500;">{{ $actor->name }}</td>
                </tr>
                <tr>
                    <td style="padding: 8px 0; color: #6b7280; font-weight: 600;">Email :</td>
                    <td style="padding: 8px 0; color: #111827; font-weight: 500;">{{ $request->email }}</td>
                </tr>
                @if($request->phone)
                <tr>
                    <td style="padding: 8px 0; color: #6b7280; font-weight: 600;">Téléphone :</td>
                    <td style="padding: 8px 0; color: #111827; font-weight: 500;">{{ $request->phone }}</td>
                </tr>
                @endif
                @if($request->position)
                <tr>
                    <td style="padding: 8px 0; color: #6b7280; font-weight: 600;">Poste :</td>
                    <td style="padding: 8px 0; color: #111827; font-weight: 500;">{{ $request->position }}</td>
                </tr>
                @endif
                <tr>
                    <td style="padding: 8px 0; color: #6b7280; font-weight: 600;">Date de demande :</td>
                    <td style="padding: 8px 0; color: #111827; font-weight: 500;">{{ $request->created_at->format('d/m/Y à H:i') }}</td>
                </tr>
                <tr>
                    <td style="padding: 8px 0; color: #6b7280; font-weight: 600;">Statut :</td>
                    <td style="padding: 8px 0;">
                        <span style="background: #fef3c7; color: #92400e; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 600;">
                            En attente de validation
                        </span>
                    </td>
                </tr>
            </table>
        </div>
        
        <div style="background: #f0fdf4; border-left: 4px solid #10b981; padding: 20px; margin: 25px 0; border-radius: 4px;">
            <h3 style="color: #065f46; margin-top: 0; font-size: 18px;">✅ Prochaines étapes :</h3>
            <p style="color: #047857; margin: 10px 0; font-size: 15px;">
                Notre équipe va examiner votre demande dans les plus brefs délais. Vous recevrez un email de confirmation une fois votre demande validée.
            </p>
        </div>
        
        <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 25px 0; border-radius: 4px;">
            <p style="margin: 0; color: #92400e; font-size: 14px;">
                <strong>⏱️ Délai de traitement :</strong> Nous traiterons votre demande dans un délai de 2 à 5 jours ouvrés.
            </p>
        </div>
        
        <p style="color: #6b7280; font-size: 14px; margin-top: 30px; border-top: 1px solid #e5e7eb; padding-top: 20px;">
            Si vous avez des questions concernant votre demande, n'hésitez pas à nous contacter.<br><br>
            Cordialement,<br>
            <strong style="color: #1e3a8a;">L'équipe MATA</strong>
        </p>
    </div>
    
    <div style="text-align: center; margin-top: 20px; color: #9ca3af; font-size: 12px;">
        <p>© {{ date('Y') }} MATA - Moroccan Accredited Tourism Actors</p>
    </div>
</body>
</html>
