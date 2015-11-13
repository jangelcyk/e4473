#!/usr/bin/perl

use strict;
#use warnings;
#use JSON;
use lib qw(/up/app/modules /up/v2/modules);

# Set default environment before loading modules
# because they are passed to DBAccess when loaded
$ENV{'V2WEBSERVER'} = '';
$ENV{'V2WEBPORT'}   = '';
$ENV{'V2DBSERVER'}  = '';
$ENV{'V2DBNAME'}    = '';
$ENV{'V2DBUSER'}    = '';
$ENV{'V2DBPASS'}    = '';
$ENV{'V2DBTIMEOUT'} = 30;
$ENV{'HOSTNAME'}    = $ENV{SERVER_NAME};
$ENV{'USER'}        = 'web';
$ENV{"V2TLCSERVER"} = '';

require "config.pm";

use Common;
use DBAccess;

my %FORM;

print "Content-Type: text/html\n\n";

parse_Form();

# Devel/non-db access setting - even cust num - not found, odd found
if ($Config::PROD == 0) {
    if ( $FORM{form_cust_num} % 2 == 0 ) {
        print '{"result": false}';
    }
    else {
        print '{"result": true}';
    }
}
elsif ($Config::PROD == 1) {
    my $errcode;
    my $errdesc;
    my %custInfo;
    my $rows;
    my $sql;
    my $db = new DBAccess(debug => 0,
                          webserver => $Config::WEBSERVER,
                          webport   => $Config::WEBPORT,
                          dbserver  => $Config::DBSERVER,
                          dbname    => $Config::DBNAME,
                          dbuser    => $Config::DBUSER,
                          dbpass    => $Config::DBPASS,
                          dbtimeout => $Config::DBTIMEOUT);

    $sql  = 'SELECT * FROM atf4473 WHERE cust_num = ' . $FORM{form_cust_num} . ' AND atf4473_id = ' . $FORM{form_cust_pin};

    ($errcode, $errdesc, $rows) = $db->query($sql, \%custInfo);
    if ($errcode != ERROR_OK) {
      print '{"result": error}';
    }
    elsif ($rows == 1) {
        print '{"result": true}';
    }
    else {
        print '{"result": false}';
      }
}
else {

    print '{"result": false}';
}

sub parse_Form {
        my @pairs;
        my $buffer;
   # Get the input
        if ($ENV{'REQUEST_METHOD'} eq 'POST') {
                read(STDIN, $buffer, $ENV{'CONTENT_LENGTH'});
                @pairs = split(/&/, $buffer);
                push @pairs, split(/[&;]/, $ENV{'QUERY_STRING'});
        } elsif ($ENV{'REQUEST_METHOD'} eq 'GET') {
                @pairs = split(/[&;]/, $ENV{'QUERY_STRING'});
        } else {
                @pairs = ('name=');
        }
   # Split the name-value pairs

   foreach my $pair (@pairs) {
      my ($name, $value) = split(/=/, $pair);

      $value =~ tr/+/ /;
      $value =~ s/%([a-fA-F0-9][a-fA-F0-9])/pack("C", hex($1))/eg;

      $FORM{$name} = $value;
   }
}

