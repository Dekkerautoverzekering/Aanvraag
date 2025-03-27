<?php
header('Content-Type: application/json');

// Controleer of het een POST-verzoek is
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Verzamel alle formuliergegevens
    $emailBody = "Aanvraagformulier Dekkerautoverzekering\n\n";
    foreach ($_POST as $key => $value) {
        if (!empty($value) && $key !== 'signature') {
            $emailBody .= ucfirst($key) . ": " . $value . "\n";
        }
    }

    // Handtekening verwerken (als base64)
    if (isset($_POST['signature']) && !empty($_POST['signature'])) {
        $emailBody .= "\nDigitale handtekening (base64): " . $_POST['signature'] . "\n";
    }

    // E-mailinstellingen
    $to = 'rbuijs@klaasvis.nl'; // Ontvanger
    $subject = 'Aanvraagformulier Dekkerautoverzekering';
    $from = 'rbuijs@klaasvis.nl'; // Afzender
    $headers = "From: $from\r\n";
    $headers .= "Reply-To: $from\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // Verstuur de e-mail
    $mailSent = mail($to, $subject, $emailBody, $headers);

    // Geef een JSON-respons terug
    if ($mailSent) {
        echo json_encode([
            'message' => "<strong>Uw aanvraag is verzonden!</strong><br><br>Wij danken u voor het in ons gestelde vertrouwen.<br><br>Uw aanvraag is succesvol verzonden vanaf rbuijs@klaasvis.nl."
        ]);
    } else {
        echo json_encode([
            'message' => "Er is een fout opgetreden bij het verzenden van de e-mail. Neem contact op met de beheerder."
        ]);
    }
} else {
    echo json_encode([
        'message' => "Ongeldig verzoek. Gebruik het formulier om een aanvraag in te dienen."
    ]);
}
?>