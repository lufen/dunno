Live version of page: https://moosecloud.net/dunno/
Users: 
username: user@user.user
password: user

Note for the live version: the site is set to use ssl, but has no valid certificate, chrome and maybe other browsers therefore disable
javascripts. On firefox this is not a problem.

To set up web page on localhost:
Unzip files into webserver root.
Create dunno database with the user 'dunno' having "all privileges", also ability to lock tables.
import dunno-DB-Dump.sql into database.

You also need to change the database host in /path/of/unzipped/src/folder/db.php.
