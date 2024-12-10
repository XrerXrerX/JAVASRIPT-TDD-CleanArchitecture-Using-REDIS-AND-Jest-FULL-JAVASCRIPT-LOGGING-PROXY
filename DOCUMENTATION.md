#Register
============================================================
#user 
userid = not Null | unique | varchar
username = not Null | unique | varchar | low case | 12 max | 6 min
bankname = not Null | varchar | 12 char
bankuser = not Null  | varchar | boleh titik | 50
banknumber = not Null | unique | varchar | 20 char
email = not Null  | varchar | @ | test d front dan back 
numbphone = not Null |number | max 14 min 9 
createdat = date time
updatedat = date time

logbase autologin
id_logbase = untuk login binding ke sana double chekcin and simpan id di cache 
userid = not Null | unique | varchar
username = not Null | unique | varchar | low case | 12 max | 6 min
password = not Null | varchar | low case | 12 max | 6 min
lastlogin = date time
is_verified = true

#event
============================================================
eventid = not Null | unique | varchar
userid = not Null | unique | varchar
imlek = []
agustusasn = []
lebaran = []
spinners= []
is deleted = false


#refferal (buat 2 endpoint harus add refferal or no )
============================================================
reffid = not Null | unique | varchar
userid = not Null | unique | varchar
refferal = varchar[] || null 
commision = number 2 desimal terakhir | null 
transaction = varchar

#analytic
userid
is_favorited == varchar //mengacu pada thema table yang kita sediakan
