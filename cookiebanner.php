<?php
   $name = "garfield";
   $value = "the beholder";
   $currentTime = time();   

  if($_GET['accept'] == 'true'){
    setcookie($name, $value, time() + (86400 * 30), "/");
  }

?>
<div id="alertbanner">
       <p>This site uses cookies and other tracking technologies to assist with navigation and your ability to provide feedback, analyse your use of our products and services, assist wiht out promotional and marketing efforts, and provide content from third parties</p>
     <a href="https://www.cookielaw.org/how-we-use-cookies/">Cookie Policy</a>
     <br>
     <a href="?accept=true">Accept Cookies</a>
</div>
