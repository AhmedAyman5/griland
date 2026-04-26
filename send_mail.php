<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = "info@grilandeg.com";
    
    // Sanitize and read fields
    $name = isset($_POST["name"]) ? strip_tags(trim($_POST["name"])) : "";
    $phone = isset($_POST["phone"]) ? strip_tags(trim($_POST["phone"])) : "";
    $email = isset($_POST["email"]) ? filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL) : "";
    
    // Check for subject or _subject (handling both forms)
    $subject_field = isset($_POST["_subject"]) ? $_POST["_subject"] : (isset($_POST["subject"]) ? $_POST["subject"] : "New Contact Form Submission");
    $subject = strip_tags(trim($subject_field));
    $message = isset($_POST["message"]) ? strip_tags(trim($_POST["message"])) : "";
    $next = isset($_POST["_next"]) ? filter_var(trim($_POST["_next"]), FILTER_SANITIZE_URL) : "/";

    // Validate
    if (empty($name) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Error: Invalid input. Please make sure all required fields are filled and the email is valid.";
        exit;
    }

    // Prevent CRLF injection in headers
    $name = str_replace(array("\r", "\n"), array(" ", " "), $name);
    $email = str_replace(array("\r", "\n"), array(" ", " "), $email);

    // Build the email content
    $email_content = "You have received a new contact form submission from your website.\n\n";
    $email_content .= "Name: $name\n";
    $email_content .= "Email: $email\n";
    if (!empty($phone)) {
        $email_content .= "Phone: $phone\n";
    }
    $email_content .= "Subject: $subject\n\n";
    $email_content .= "Message:\n$message\n";

    // Build the email headers
    $email_headers = "From: Griland Website Contact <info@grilandeg.com>\r\n";
    $email_headers .= "Reply-To: $name <$email>\r\n";
    $email_headers .= "MIME-Version: 1.0\r\n";
    $email_headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $email_headers .= "X-Mailer: PHP/".phpversion();

    // Send the email with the -f parameter (crucial for Hostinger delivery)
    if (mail($to, $subject, $email_content, $email_headers, "-finfo@grilandeg.com")) {
        // Success: Redirect back or to the _next url
        header("Location: $next");
        exit;
    } else {
        echo "Oops! Something went wrong and we couldn't send your message. Please make sure PHP mail() is configured on your Hostinger account.";
    }
} else {
    echo "There was a problem with your submission, please try again.";
}
?>
