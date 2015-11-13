#!/usr/bin/perl

use strict;
#use warnings;
#use JSON;

require "config.pm";

my %FORM;

print "Content-Type: text/html\n\n";

parse_Form();

if ($Config::PROD == 0) {
    if ( $FORM{form_cust_num} % 2 == 0 ) {
        print '{"result": false}';
    }
    else {
        print '{"result": true}';
    }
        
}
elsif ($Config::PROD == 1) {
    print '{"result": true}';
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

