<?php
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    // Deny requests that are not POST
    http_response_code(405); // Method Not Allowed
    echo json_encode([
        "success" => false,
        "errors" => ["Invalid request method. Only POST requests are allowed."]
    ]);
    exit; // Stop script execution
}

// Proceed with handling the form submission
$name = htmlspecialchars(trim($_POST['name']));
$email = htmlspecialchars(trim($_POST['email']));
$subject = htmlspecialchars(trim($_POST['subject']));
$message = htmlspecialchars(trim($_POST['message']));

// Validate the input (you can add more validation here)
if (empty($name) || empty($email) || empty($subject) || empty($message)) {
    echo json_encode([
        "success" => false,
        "errors" => ["All fields are required."]
    ]);
    exit;
}

// Send email (example)
$to = "your-email@example.com";
$email_subject = "Contact Form Submission: $subject";
$email_body = "Name: $name\nEmail: $email\n\nMessage:\n$message";
$headers = "From: $email";

if (mail($to, $email_subject, $email_body, $headers)) {
    echo json_encode([
        "success" => true,
        "message" => "Your message has been sent successfully!"
    ]);
} else {
    echo json_encode([
        "success" => false,
        "errors" => ["Failed to send the message. Please try again later."]
    ]);
}
