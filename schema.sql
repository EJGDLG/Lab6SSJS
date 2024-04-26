CREATE USER IF NOT EXISTS 'matiu'@'%' IDENTIFIED BY '36L8W7Nm';
GRANT ALL PRIVILEGES ON GuatemalaDepot.* TO 'matiu'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;

CREATE TABLE IF NOT EXISTS GuatemalaDepot (
    id INT AUTO_INCREMENT PRIMARY KEY,
    Pearson VARCHAR(255) NOT NULL,
    Few_Description TEXT NOT NULL,
    History TEXT NOT NULL,
    Crucial_Events TEXT NOT NULL,
    Curiosities TEXT NOT NULL,
    AlternativeText VARCHAR(255),
    AlternativeDescription TEXT NOT NULL,
    Text_References TEXT NOT NULL,
    images TEXT NOT NULL
);
