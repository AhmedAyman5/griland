<?php
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = strip_tags(trim($_POST["name"] ?? ''));
    $phone = strip_tags(trim($_POST["phone"] ?? ''));
    $email = filter_var(trim($_POST["email"] ?? ''), FILTER_SANITIZE_EMAIL);
    $subject = strip_tags(trim($_POST["Topic"] ?? $_POST["_subject"] ?? $_POST["subject"] ?? 'New Contact Form Submission'));
    $message = trim($_POST["message"] ?? '');

    if (empty($name) || empty($message) || empty($phone) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Please fill all fields properly."]);
        exit;
    }

    $recipient = "info@grilandeg.com";
    $email_subject = "Website Contact: $subject";

    $email_content = "Name: $name\n";
    $email_content .= "Phone: $phone\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Message:\n$message\n";

    $email_headers = "From: Website Contact Form <info@grilandeg.com>\r\n";
    $email_headers .= "Reply-To: $email\r\n";

    if (mail($recipient, $email_subject, $email_content, $email_headers)) {
        http_response_code(200);
        echo json_encode(["success" => true, "status" => "success", "message" => "Message sent successfully."]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error", "success" => false, "message" => "Failed to send email. Server error."]);
    }
} else {
    http_response_code(403);
    echo json_encode(["status" => "error", "success" => false, "message" => "Invalid request method."]);
}
?>
