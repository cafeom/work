<?php 

$con = mysqli_connect("localhost","root","","gfriend");

if($_POST["action"] === "post") {
  
  if(isset($_POST["name"])) {
    
    $name   = $_POST["name"];
    $type   = $_POST["type"];
    $noona  = $_POST["noona"];
    $doc    = $_POST["doc"];
    $data   = $_POST["data"];
    $ingredients = $_POST["ingredients"];
    $image       = $_POST["image"];

    $query = mysqli_query($con, "INSERT INTO omg (name, type, noona, doc, data, ingredients, image) VALUES ('$name', '$type', '$noona', '$doc', '$data', '$ingredients', '$image')");
    
    echo mysqli_error($con);
  }  
}
elseif ( $_POST["action"] === "load" ) {
  
    $results = mysqli_query($con, "SELECT * FROM omg ORDER by id ASC");
    $obj = array();
    
    while($extract = mysqli_fetch_array($results)) {
      $zone = array( $extract["id"], $extract["name"], $extract["type"], $extract["noona"], $extract["doc"], $extract["data"], $extract["ingredients"], $extract["image"] );
      array_push($obj, $zone);
    }
    
    echo json_encode($obj);
}
elseif ( $_POST["action"] === "delete" ) {
  
  $delete_id = $_POST["id"];
  
  $query = mysqli_query($con, "DELETE FROM omg WHERE id = '$delete_id'");
  
  if ($query === false) {
    echo mysqli_error($con);
  }
  
}

elseif($_POST["action"] === "addplaylist") {
  
  if(isset($_POST["name"])) {
    
    $name   = $_POST["name"];

    $query = mysqli_query($con, "INSERT INTO playlists (name) VALUES ('$name')");
    
    echo mysqli_error($con);
  }  
}
elseif ( $_POST["action"] === "loadplaylist" ) {
  
    $results = mysqli_query($con, "SELECT * FROM playlists ORDER by id ASC");
    $obj = array();
    
    while($extract = mysqli_fetch_array($results)) {
      $zone = array( $extract["id"], $extract["name"] );
      array_push($obj, $zone);
    }
    
    echo json_encode($obj);
}
elseif ( $_POST["action"] === "removeplaylist" ) {
  
  $delete_id = $_POST["id"];
  
  $query = mysqli_query($con, "DELETE FROM playlists WHERE id = '$delete_id'");
  
  if ($query === false) {
    echo mysqli_error($con);
  }
  
}

elseif($_POST["action"] === "quickdrawadd") {
  
  $myid  = $_POST["myid"];
  $mykey = $_POST["mykey"];
  
  $query = mysqli_query($con, "INSERT INTO leggo (myid, mykey) VALUES ('$myid', '$mykey')");
  
  echo mysqli_error($con);
}
elseif ( $_POST["action"] === "quickdrawdelete" ) {
  
  $delete_key = $_POST["mykey"];

  $query = mysqli_query($con, "DELETE FROM leggo WHERE mykey = '$delete_key'");
  
  if ($query === false) {
    echo mysqli_error($con);
  }
  
}
elseif ( $_POST["action"] === "quickdrawload" ) {
  
    $results = mysqli_query($con, "SELECT * FROM leggo ORDER by mykey ASC");
    $obj = array();
    
    while($extract = mysqli_fetch_array($results)) {
      $zone = array( $extract["mykey"], $extract["myid"] );
      array_push($obj, $zone);
    }
    
    echo json_encode($obj);
}

elseif($_POST["action"] === "testing") {
  
  $val = $_POST["val"];
  
  mysqli_query($con, "UPDATE omg
         SET type = '$val'
         WHERE id='125'");
  
  echo mysqli_error($con);
}

?>