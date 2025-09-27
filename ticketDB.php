<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $ticket = [
        "Name" => $_POST["name"],
        "Email" => $_POST["email"],
        "Subject" => $_POST["subject"],
        "Message" => $_POST["message"],
        "Priority" => $_POST["priority"],
        "Timestamp" => date("Y-m-d H:i:s")
    ];

    $entry = implode(" | ", $ticket) . "\n";
    file_put_contents("tickets.txt", $entry, FILE_APPEND);

    echo "<h2>Ticket Submitted Successfully</h2>";
    echo "<pre>" . htmlspecialchars($entry) . "</pre>";
} else {
    echo "Invalid request.";
}
?>
