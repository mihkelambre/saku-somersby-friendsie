<?php

    $name = $_GET["f"];
    $hash = explode('/', $name)[1];
    $hash = explode('.', $hash)[0];

    $service_url = 'https://www.interactive.ee/demo/dia/saku/somersby-selfie/api/gallery.php?hash=' . $hash;
    $curl = curl_init($service_url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    $curl_response = curl_exec($curl);
    curl_close($curl);
    $decoded = json_decode($curl_response);
    $friendsie = $decoded->friendsies[0];
    
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">
  <head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Somersby #friendsie</title>
    <link type="text/css" rel="stylesheet" href="//fast.fonts.net/cssapi/7da1ff30-a409-41e5-a22e-303220379ecf.css"/>
    <link rel="stylesheet" type="text/css" href="styles/style.css"/>
    <script type="text/javascript" src="script.js"></script>
  </head>
  <body>
    <div id="fb-root"></div>
    <script>(function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&appId=1469057436688946&version=v2.0";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));</script>
    <div class="bg"></div>
    <div class="title">
      Astu Lord Somersby
      õukonda. Tee oma
      selfiest #friendsie!
    </div>
    <div class="friendsie">
      <div class="name"><?php echo $friendsie->name; ?></div>
      <div class="imageHolder">
        <img class="photo" src="<?php echo $friendsie->photo; ?>"></img>
        <img class="frame" src="images/user_photo_frame.png"></img>
      </div>
      <div class="like">
        <div class="fb-like" data-href="<?php echo $friendsie->url; ?>" data-layout="button_count" data-action="like" data-show-faces="false" data-share="true"></div>
      </div>
      <div class="desc">
        Oma #friendsie tegemiseks külasta Lord Somersby
        #friendsie aktsiooni oma arvutiga. Mobiilis ja tabis
        saad #friendsiedele küll LIKE anda, aga kahjuks
        mitte enda #friendsiet teha.
      </div>
    </div>
    <div class="disc">
      Tähelepanu! Tegemist on alkoholiga. Alkohol võib kahjustada teie tervist!
    </div>
  </body>
</html>