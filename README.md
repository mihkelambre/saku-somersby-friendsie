saku-somersby-friendsie
=======================

## Install ##

* git clone git@github.com:mihkelambre/saku-somersby-friendsie.git
* bower install
* grunt serve

## Deploy ##
* grunt build
* kopeeri failid > https://www.interactive.ee/demo/dia/saku/somersby-selfie/tab/ kataloogi
* NB! ära nii sama näpi katalooge api/ ja Facebook/ - need on serveripoolsed teenused

> Faile serverisse kopeerides muuda index.html > index.php. Html on vajalik lokaalis testimiseks kasutades 'grunt serve'.

## Tabi konfigureerimine peale Somersby Facebook tabiks lisamist ##
Kui app läheb live, siis on vaja teha järgmised muudatused:

* ava fail api/url.php. seal sees on redirect (rida 16), mille aadress pead uuendama uue tabi aadressiga.

> $redirect_url = 'https://www.facebook.com/pages/DIA-Demo-2/121534394588856?sk=app_1469057436688946&app_data=' . $hash;

muuda see nii:

> $redirect_url = '[UUS_AADRESS]&app_data=' . $hash;

## Good luck! ##
