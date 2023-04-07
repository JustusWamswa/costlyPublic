<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WellKey FAQ Form</title>
    <link href="css/styles.css" type="text/css" rel="stylesheet">
    <link rel="icon" type="image/x-icon" href="images/W.ico">
</head>
<body>
			
		<?php
			$display=", \n thank you for your enquiry, you will be contacted within three working days";
			$v_name=$_POST['name'];
		

			echo "<h3>".$v_name.$display."</h3>";

            // database connection code
            // $con = mysqli_connect('localhost', 'database_user', 'database_password','database');

            $con = mysqli_connect('localhost', 'root', '','db_contact');

            // get the post records
            $name = $_POST['name'];
            $email = $_POST['email'];
            $additionalinformation = $_POST['additionalinformation'];

            // database insert SQL code
            $sql = "INSERT INTO `tbl_contact` (`Id`, `Name`, `Email`, `Telephone`, `Message`) VALUES ('0', '$name', '$email', '$additionalinformation')";

            // insert in database 
            $rs = mysqli_query($con, $sql);

            //if($rs)
            //{
                //echo "Contact Records Inserted";
            //}
		?>
		

        </div>

    </div>
    
    <hr>



</body>
</html>
