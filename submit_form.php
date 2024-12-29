<?php
// Check if the form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize and validate input data
    $name = htmlspecialchars(trim($_POST['name']));
    $email = htmlspecialchars(trim($_POST['email']));
    $subject = htmlspecialchars(trim($_POST['subject']));
    $message = htmlspecialchars(trim($_POST['message']));

    // Initialize an error array
    $errors = [];

    // Validate name
    if (empty($name)) {
        $errors[] = "Name is required.";
    }

    // Validate email
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "A valid email address is required.";
    }

    // Validate subject
    if (empty($subject)) {
        $errors[] = "Subject is required.";
    }

    // Validate message
    if (empty($message)) {
        $errors[] = "Message cannot be empty.";
    }

    // Check for errors
    if (!empty($errors)) {
        // Display errors and stop processing
        echo json_encode([
            "success" => false,
            "errors" => $errors
        ]);
        exit;
    }

    // Send the email
    $to = "drshirsu@gmail.com"; // Replace with your email address
    $email_subject = "New Contact Form Submission: " . $subject;
    $email_body = "You have received a new message from your website contact form.\n\n" .
                  "Here are the details:\n" .
                  "Name: $name\n" .
                  "Email: $email\n\n" .
                  "Message:\n$message";

    // Additional headers
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";

    // Attempt to send the email
    if (mail($to, $email_subject, $email_body, $headers)) {
        // Success response
        echo json_encode([
            "success" => true,
            "message" => "Thank you for reaching out! Your message has been sent."
        ]);
    } else {
        // Error response
        echo json_encode([
            "success" => false,
            "errors" => ["Failed to send your message. Please try again later."]
        ]);
    }
} else {
    // If not a POST request, deny access
    http_response_code(405); // Method Not Allowed
    echo json_encode([
        "success" => false,
        "errors" => ["Invalid request method."]
    ]);
}
// Get request
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Process the form submission
    echo json_encode(["success" => true, "message" => "Form processed successfully."]);
} else {
    // Optional: Provide a default response for GET requests
    echo json_encode([
        "success" => false,
        "errors" => ["This script only accepts POST requests."]
    ]);
}


?>
