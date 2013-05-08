Live version of page: https://moosecloud.net/dunno/
Users: 
username: user@user.user
password: user

To set up web page on localhost:
Unzip files into webserver root.
Create dunno database with the user gfs having "all priviliges", also ability to lock tables.
import dunno-DB-Dump.sql into database.

You also need to change the database host in /path/of/unzipped/src/folder/db.php.