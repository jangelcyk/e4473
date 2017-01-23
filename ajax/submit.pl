#!/usr/bin/perl

use strict;
#use warnings;
#use JSON;
use CGI;
use lib qw(/up/app/modules /up/v2/modules);

# Set default environment before loading modules
# because they are passed to DBAccess when loaded

require "./config.pm";

my $q = new CGI;
my $db;

$CGI::POST_MAX=1024 * 10;   # max 10K posts
$CGI::DISABLE_UPLOADS = 1;  # no uploads


print $q->header(
    -expires       => 'Sat, 26 Jul 1997 05:00:00 GMT',
    -Pragma        => 'no-cache',
    # HTTP/1.1 + IE-specific (pre|post)-check
    -Cache_Control => join(', ', qw(
        private
        no-cache
        no-store
        must-revalidate
        max-age=0
        pre-check=0
        post-check=0
    )),
);

print $q->start_html(-title => 'FCFS - e4473');

my $custNum = $q->param('form_cust_num');;
my $custPin = $q->param('form_cust_pin');;

if ($Config::PROD == 0) {
    print "Compiled<BR>$Config::PROD<BR>\n";
}
elsif ($Config::PROD == 1) {
    my $errcode;
    my $errdesc;
    my %custInfo;
    my $rows;
    my $sql;

    $ENV{'V2WEBSERVER'} = $Config::WEBSERVER;
    $ENV{'V2WEBPORT'}   = $Config::WEBPORT;
    $ENV{'V2DBSERVER'}  = $Config::DBSERVER;
    $ENV{'V2DBNAME'}    = $Config::DBNAME;
    $ENV{'V2DBUSER'}    = $Config::DBUSER;
    $ENV{'V2DBPASS'}    = $Config::DBPASS;
    $ENV{'V2DBTIMEOUT'} = $Config::DBTIMEOUT;
    $ENV{'HOSTNAME'}    = $ENV{SERVER_NAME};
    $ENV{'USER'}        = 'web';
    $ENV{"V2TLCSERVER"} = '127.0.0.1';

    use Common;
    use DBAccess;

    $db = new DBAccess(debug => 0,
                   webserver => $Config::WEBSERVER,
                   webport   => $Config::WEBPORT,
                   dbserver  => $Config::DBSERVER,
                   dbname    => $Config::DBNAME,
                   dbuser    => $Config::DBUSER,
                   dbpass    => $Config::DBPASS,
                   dbtimeout => $Config::DBTIMEOUT);

    my $updateSuccess = updateCustInfoDB($custNum, $custPin);

    if ($updateSuccess == 1) {
      print "<center><br><br>Your application has been submitted.<br><br></center>\n";
      print '<center><a href="../form.html">Click here to create a new application.<br><br></center>' . "\n";
      print '<script type="text/javascript">';
      print 'setTimeout(function(){ window.location = "../form.html"; }, 5000);';
      print '</script>'."\n";
    }
    else {
      print "<center><br><br>An error has been detected submitting your application.<br><br></center>\n";
      print '<center><a href="../form.html">Click here to create a new application.<br><br></center>' . "\n";
    }
}

print $q->end_html;

sub updateCustInfoDB {

  my $custNum = shift;            # customer number
  my $custPin = shift;            # customer pin
  my $errcode;                    # Error code returned from database operation.
  my $errdesc;                    # Text description of error code.
  my $rows;                       # Number of rows of data returned by database operation.
  my $sql;                        # SQL used for database operation.
  my %custInfo;
  my %queryVars;                  # hash for unsafe variable replacement in query
  
  $custInfo{custNum} = $custNum;
  $custInfo{custPin} = $custPin;
  
  if ( not ( hasvalue($custInfo{custNum}) and hasvalue($custInfo{custPin}) ) ) {
    return 0;
  }
  
  # Set straight assignments
  
  $custInfo{cust_last_name}           = $q->param('form_cust_last_name');
  $custInfo{cust_first_name}          = $q->param('form_cust_first_name');
  $custInfo{cust_middle_name}         = $q->param('form_cust_middle_name');    
  $custInfo{cust_street_address}      = $q->param('form_cust_street_address'); 
  $custInfo{cust_city}                = $q->param('form_cust_city');           
  $custInfo{cust_county}              = $q->param('form_cust_county');         
  $custInfo{cust_state}               = $q->param('form_cust_state');          
  $custInfo{cust_zip}                 = $q->param('form_cust_zip');            
  $custInfo{cust_place_of_birth}      = $q->param('form_cust_place_of_birth') . ', ' . 
                                        $q->param('form_cust_state_of_birth'); 
  $custInfo{cust_foreign_country}     = $q->param('form_cust_foreign_country');
  $custInfo{cust_height_ft}           = $q->param('form_cust_height_ft');      
  $custInfo{cust_height_in}           = $q->param('form_cust_height_in');      
  $custInfo{cust_weight}              = $q->param('form_cust_weight');         
  $custInfo{cust_ssn}                 = $q->param('form_cust_ssn');            
  $custInfo{cust_upin}                = $q->param('form_cust_upin');           
  $custInfo{cust_state_residence}     = $q->param('form_cust_state_residence');     
  $custInfo{cust_non_cit_alien_num}   = $q->param('form_cust_alien_num');           

  $custInfo{cust_dob_month}           = $q->param('form_cust_dob_month');      
  $custInfo{cust_dob_day}             = $q->param('form_cust_dob_day');        
  $custInfo{cust_dob_year}            = $q->param('form_cust_dob_year');       


  if ($q->param('form_cust_sex') eq 'Male') {
    $custInfo{cust_gender} = 'M';
  }
  elsif ($q->param('form_cust_sex') eq 'Female') {
    $custInfo{cust_gender} = 'F';
  }
  else {
    $custInfo{cust_gender} = '';
  }


  if ($q->param('form_cust_ethnicity') eq 'Hispanic or Latino') {
    $custInfo{cust_ethnicity} = 'H';
  }
  elsif ($q->param('form_cust_ethnicity') eq 'Not Hispanic or Latino') {
    $custInfo{cust_ethnicity} = 'N';
  }
  else {
    $custInfo{cust_ethnicity} = '';
  }
  
  if (hasvalue($q->param('birth[month]')) and 
      hasvalue($q->param('birth[day]')) and 
      hasvalue($q->param('birth[year]'))) {
    $custInfo{cust_dob} = $q->param('birth[month]') .'/'. $q->param('birth[day]') .'/'. $q->param('birth[year]');
  }
  else {
    $custInfo{cust_dob} = ''
  };
  
  if ($q->param('form_cust_question_11a') eq 'Yes') {
    $custInfo{cust_question_11a_yn} = 'Y';
  }
  elsif ($q->param('form_cust_question_11a') eq 'No') {
    $custInfo{cust_question_11a_yn} = 'N';
  }
  else {
    $custInfo{cust_question_11a_yn} = '';
  }
  
  if ($q->param('form_cust_question_11b') eq 'Yes') {
    $custInfo{cust_question_11b_yn} = 'Y';
  }
  elsif ($q->param('form_cust_question_11b') eq 'No') {
    $custInfo{cust_question_11b_yn} = 'N';
  }
  else {
    $custInfo{cust_question_11b_yn} = '';
  }
  
  if ($q->param('form_cust_question_11c') eq 'Yes') {
    $custInfo{cust_question_11c_yn} = 'Y';
  }
  elsif ($q->param('form_cust_question_11c') eq 'No') {
    $custInfo{cust_question_11c_yn} = 'N';
  }
  else {
    $custInfo{cust_question_11c_yn} = '';
  }
  
  if ($q->param('form_cust_question_11d') eq 'Yes') {
    $custInfo{cust_question_11d_yn} = 'Y';
  }
  elsif ($q->param('form_cust_question_11d') eq 'No') {
    $custInfo{cust_question_11d_yn} = 'N';
  }
  else {
    $custInfo{cust_question_11d_yn} = '';
  }
  
  if ($q->param('form_cust_question_11e') eq 'Yes') {
    $custInfo{cust_question_11e_yn} = 'Y';
  }
  elsif ($q->param('form_cust_question_11e') eq 'No') {
    $custInfo{cust_question_11e_yn} = 'N';
  }
  else {
    $custInfo{cust_question_11e_yn} = '';
  }
  
  if ($q->param('form_cust_question_11f') eq 'Yes') {
    $custInfo{cust_question_11f_yn} = 'Y';
  }
  elsif ($q->param('form_cust_question_11f') eq 'No') {
    $custInfo{cust_question_11f_yn} = 'N';
  }
  else {
    $custInfo{cust_question_11f_yn} = '';
  }
  
  if ($q->param('form_cust_question_11g') eq 'Yes') {
    $custInfo{cust_question_11g_yn} = 'Y';
  }
  elsif ($q->param('form_cust_question_11g') eq 'No') {
    $custInfo{cust_question_11g_yn} = 'N';
  }
  else {
    $custInfo{cust_question_11g_yn} = '';
  }
  
  if ($q->param('form_cust_question_11h') eq 'Yes') {
    $custInfo{cust_question_11h_yn} = 'Y';
  }
  elsif ($q->param('form_cust_question_11h') eq 'No') {
    $custInfo{cust_question_11h_yn} = 'N';
  }
  else {
    $custInfo{cust_question_11h_yn} = '';
  }
  
  if ($q->param('form_cust_question_11i') eq 'Yes') {
    $custInfo{cust_question_11i_yn} = 'Y';
  }
  elsif ($q->param('form_cust_question_11i') eq 'No') {
    $custInfo{cust_question_11i_yn} = 'N';
  }
  else {
    $custInfo{cust_question_11i_yn} = '';
  }
  
#   if ($q->param('form_cust_question_11j') eq 'Yes') {
#     $custInfo{cust_question_11j_yn} = 'Y';
#   }
#   elsif ($q->param('form_cust_question_11j') eq 'No') {
#     $custInfo{cust_question_11j_yn} = 'N';
#   }
#   else {
#     $custInfo{cust_question_11j_yn} = '';
#   }
#   
#   if ($q->param('form_cust_question_11k') eq 'Yes') {
#     $custInfo{cust_question_11k_yn} = 'Y';
#   }
#   elsif ($q->param('form_cust_question_11k') eq 'No') {
#     $custInfo{cust_question_11k_yn} = 'N';
#   }
#   else {
#     $custInfo{cust_question_11k_yn} = '';
#   }
#   
#   if ($q->param('form_cust_question_11l') eq 'Yes') {
#     $custInfo{cust_question_11l_yn} = 'Y';
#   }
#   elsif ($q->param('form_cust_question_11l') eq 'No') {
#     $custInfo{cust_question_11l_yn} = 'N';
#   }
#   else {
#     $custInfo{cust_question_11l_yn} = '';
#   }
#  
#   if ($q->param('form_cust_question_12') eq 'Yes') {
#     $custInfo{cust_question_12_yn} = 'Y';
#   }
#   elsif ($q->param('form_cust_question_12') eq 'No') {
#     $custInfo{cust_question_12_yn} = 'N';
#   }
#   else {
#     $custInfo{cust_question_12_yn} = '';
#   }

  if ($q->param('form_cust_question_12b') eq 'Yes') {
    $custInfo{cust_question_12b_yn} = 'Y';
  }
  elsif ($q->param('form_cust_question_12b') eq 'No') {
    $custInfo{cust_question_12b_yn} = 'N';
  }
  else {
    $custInfo{cust_question_12b_yn} = '';
  }

  if ($q->param('form_cust_question_12c') eq 'Yes') {
    $custInfo{cust_question_12c_yn} = 'Y';
  }
  elsif ($q->param('form_cust_question_12c') eq 'No') {
    $custInfo{cust_question_12c_yn} = 'N';
  }
  else {
    $custInfo{cust_question_12c_yn} = '';
  }

  if ($q->param('form_cust_question_12d1') eq 'Yes') {
    $custInfo{cust_question_12d1_yn} = 'Y';
  }
  elsif ($q->param('form_cust_question_12d1') eq 'No') {
    $custInfo{cust_question_12d1_yn} = 'N';
  }
  else {
    $custInfo{cust_question_12d1_yn} = '';
  }

  if ($q->param('form_cust_question_12d2') eq 'Yes') {
    $custInfo{cust_question_12d2_yn} = 'Y';
  }
  elsif ($q->param('form_cust_question_12d2') eq 'No') {
    $custInfo{cust_question_12d2_yn} = 'N';
  }
  else {
    $custInfo{cust_question_12d2_yn} = '';
  }
  
  foreach my $i ($q->param('form_cust_race')) {
    if ($i eq 'American Indian or Alaska Native') {
      $custInfo{cust_race_native} = 'Y';
    }
    if ($i eq 'Asian') {
      $custInfo{cust_race_asian} = 'Y';
    }
    if ($i eq 'Black or African American') {
      $custInfo{cust_race_black} = 'Y';
      
    }
    if ($i eq 'Native Hawaiian or Other Pacific Islander') {
      $custInfo{cust_race_hawaiian} = 'Y';
    }
    if ($i eq 'White') {
      $custInfo{cust_race_white} = 'Y';
    }
  }

  foreach my $i ($q->param('form_cust_citizenship')) {
    if ($i eq 'United States of America') {
      $custInfo{cust_citizenship_usa_yn} = 'Y';
    }
    if ($i eq 'Other') {
      $custInfo{cust_citizenship_other_desc} = $q->param('form_cust_citizenship_other_desc');
    }
  }
  
  $sql  = 'UPDATE atf4473 SET ';
  $sql .= "cust_last_name = [cust_last_name], ";      
  $sql .= "cust_first_name = [cust_first_name], ";
  $sql .= "cust_middle_name = [cust_middle_name], ";
  $sql .= "cust_street_address = [cust_street_address], ";
  $sql .= "cust_city = [cust_city], ";
  $sql .= "cust_county = [cust_county], ";
  $sql .= "cust_state = [cust_state], ";
  $sql .= "cust_zip = [cust_zip], ";
  $sql .= "cust_place_of_birth = [cust_place_of_birth], ";
  $sql .= "cust_foreign_country = [cust_foreign_country], ";
  $sql .= "cust_height_ft = [cust_height_ft], ";
  $sql .= "cust_height_in = [cust_height_in], ";
  $sql .= "cust_weight = [cust_weight], ";
  $sql .= "cust_ssn = [cust_ssn], ";
  $sql .= "cust_upin = [cust_upin], ";
  $sql .= "cust_ethnicity = [cust_ethnicity], ";
  $sql .= "cust_state_residence = [cust_state_residence], ";
  $sql .= "cust_non_cit_alien_num = [cust_non_cit_alien_num], ";
  $sql .= "cust_gender = [cust_gender], ";
  $sql .= "cust_dob = [cust_dob], ";
  $sql .= "question_11a_yn = [cust_question_11a_yn], ";
  $sql .= "question_11b_yn = [cust_question_11b_yn], ";
  $sql .= "question_11c_yn = [cust_question_11c_yn], ";
  $sql .= "question_11d_yn = [cust_question_11d_yn], ";
  $sql .= "question_11e_yn = [cust_question_11e_yn], ";
  $sql .= "question_11f_yn = [cust_question_11f_yn], ";
  $sql .= "question_11g_yn = [cust_question_11g_yn], ";
  $sql .= "question_11h_yn = [cust_question_11h_yn], ";
  $sql .= "question_11i_yn = [cust_question_11i_yn], ";
#  $sql .= "question_11j_yn = [cust_question_11j_yn], ";
#  $sql .= "question_11k_yn = [cust_question_11k_yn], ";
#  $sql .= "question_11l_yn = [cust_question_11l_yn], ";
#  $sql .= "question_12_yn  = [cust_question_12_yn], ";
  $sql .= "question_12b_yn  = [cust_question_12b_yn], ";
  $sql .= "question_12c_yn  = [cust_question_12c_yn], ";
  $sql .= "question_12d1_yn  = [cust_question_12d1_yn], ";
  $sql .= "question_12d2_yn  = [cust_question_12d2_yn], ";
  $sql .= "cust_race_native  = [cust_race_native], ";
  $sql .= "cust_race_asian  = [cust_race_asian], ";
  $sql .= "cust_race_black  = [cust_race_black], ";
  $sql .= "cust_race_hawaiian  = [cust_race_hawaiian], ";
  $sql .= "cust_race_white  = [cust_race_white], ";
  $sql .= "cust_citizenship_usa_yn = [cust_citizenship_usa_yn], ";
  $sql .= "cust_citizenship_other_desc = [cust_citizenship_other_desc], ";
  $sql .= "form_revision = 'Oct-2016' ";

  $sql .= '  WHERE cust_num = #custNum# AND atf4473_id = #custPin# ';

  $sql  = $db->replace($sql, \%custInfo);

#  print $sql . "<BR>\n";

  ($errcode, $errdesc, $rows) = $db->execute($sql);
  if ($errcode != ERROR_OK) {
    # $db->error_fatal($sm, $errcode, $errdesc, $sql);
    return $errcode;
  }

  if ($rows > 0) {
    return 1;
  }

  return 0;
}


