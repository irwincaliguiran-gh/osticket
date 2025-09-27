<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $ticket = [
        $_POST["name"],
        $_POST["email"],
        $_POST["subject"],
        $_POST["message"],
        $_POST["priority"],
        date("Y-m-d H:i:s")
    ];

    $entry = implode(" | ", $ticket) . "\n";
    file_put_contents("tickets.txt", $entry, FILE_APPEND);
}

// Read and display tickets as a table
echo "<h2>Submitted Tickets</h2>";
echo "<table border='1' cellpadding='10' style='border-collapse: collapse;'>";
echo "<tr>
        <th>Name</th>
        <th>Email</th>
        <th>Subject</th>
        <th>Message</th>
        <th>Priority</th>
        <th>Timestamp</th>
      </tr>";

$lines = file("tickets.txt", FILE_IGNORE_NEW_LINES);
foreach ($lines as $line) {
    $fields = explode(" | ", $line);
    echo "<tr>";
    foreach ($fields as $field) {
        echo "<td>" . htmlspecialchars($field) . "</td>";
    }
    echo "</tr>";
}
echo "</table>";
?>
