
function calcAge(selectedYear, selectedMonth, selectedDay) {
//    window.alert(selectedYear);
    
    var ageInYears;
    var today = new Date();
    var currDay = today.getDate();
    var currMonth = today.getMonth()+1; 
    var currYear = today.getFullYear();

    var yearDiff = currYear - Number(selectedYear);
    
    if ( currMonth > Number(selectedMonth) ) {
        ageInYears = yearDiff;
    }
    else if ( currMonth < Number(selectedMonth) ) {
        ageInYears = yearDiff - 1;
    }
    else {
        if ( currDay >= Number(selectedDay) ) {
            ageInYears = yearDiff;
        }
        else {
            ageInYears = yearDiff - 1;
        }
    }
    console.log(ageInYears);
    if ( ageInYears < 18 ) {
        $('#age-not-18').show();
        $('#age-not-21').hide();
    }
    else if ( ageInYears < 21 ) {
        $('#age-not-18').hide();
        $('#age-not-21').show();       
    }
    else {
        $('#age-not-18').hide();
        $('#age-not-21').hide();
    }
}

function clearForm(form) {
  // iterate over all of the inputs for the form
  // element that was passed in
  $(':input', form).each(function() {
    var type = this.type;
    var tag = this.tagName.toLowerCase(); // normalize case
    // it's ok to reset the value attr of text inputs,
    // password inputs, and textareas
    if (type == 'text' || type == 'password' || tag == 'textarea')
      this.value = "";
      // checkboxes and radios need to have their checked state cleared
      // but should *not* have their 'value' changed
    else if (type == 'checkbox' || type == 'radio')
       this.checked = false;
    // select elements need to have their 'selectedIndex' property set to -1
    // (this works for both single and multiple select elements)
    else if (tag == 'select')
       this.selectedIndex = -1;
  });
};

$.validator.setDefaults({
    submitHandler: function(form) {
        form.submit();
        //        alert("submitted!");
    }
});

$().ready(function() {

    $("div.picker").birthdaypicker(options={
    });
    
    clearForm("#atfForm");
    
    // validate ssn in proper format 123-12-1234
    $.validator.addMethod("ssn", function(value, element) {
        return this.optional(element) || /^\d{3}\-\d{2}\-\d{4}$/.test(value);
    }, "The SSN Entered is an invalid format.");
    
    // validate inches between 0 and 11
    $.validator.addMethod("inches", function(value, element) {
        return this.optional(element) || ( Number(value) >= 0 && Number(value) < 12);
    }, "Valid inches are between 0 and 11.");

    // validate cust is >= 18
    $.validator.addMethod("tooyoung", function(value, element) {
        return this.optional(element) || !($("#age-not-18").is(":visible")) ;
    }, "You can not continue with this application, please verify birth date.");
    
    // validate numerical value > 0
    $.validator.addMethod("nonzero", function(value, element) {
        return this.optional(element) || value > 0 ;
    }, "Please enter a valid birth date.");
    
    // validate non-whitespace is entered
    $.validator.addMethod("nonblank", function(value, element) {
        return this.optional(element) || !(/^\s+$/.test(value));
    }, "This field is required.");
    
    $(".next").click(function(){
        var form = $("#atfForm");
        form.validate({
            
            rules: {
                form_cust_num: {
                    required: true,
                    minlength: 6
                },
                form_cust_pin: {
                    required: true,
                    minlength: 3
                },
                form_cust_last_name: {
                    required: true,
                    minlength: 2,
                    nonblank: true
                },
                form_cust_first_name: {
                    required: true,
                    minlength: 2,
                    nonblank: true
                },
                form_cust_middle_name: {
                    required: true,
                    minlength: 2,
                    nonblank: true
                },
                form_cust_street_address: {
                    required: true,
                    minlength: 2,
                    nonblank: true
                },
                form_cust_city: {
                    required: true,
                    minlength: 2,
                    nonblank: true
                },
                form_cust_county: {
                    required: true,
                    minlength: 2,
                    nonblank: true
                },
                form_cust_state: "required",
                form_cust_zip: {
                    required: true,
                    minlength: 5
                },
                form_cust_place_of_birth: {
                    required: "#form_cust_foreign_country:blank",
                    nonblank: "#form_cust_foreign_country:blank",
                    minlength: 2
                },
                form_cust_state_of_birth: {
                    required: "#form_cust_place_of_birth:filled"
                },
                form_cust_foreign_country: {
                    required: "#form_cust_place_of_birth:blank",
                    nonblank: "#form_cust_place_of_birth:blank",
                    minlength: 2
                },
                form_cust_height_ft: {
                    required: true,
                    min: 4,
                    max: 8
                },
                form_cust_height_in: {
                    required: true,
                    min: 0,
                    max: 11
//                    inches: true
                },
                form_cust_weight: {
                    required: true,
                    min: 60,
                    max: 700,
                    minlength: 2
                },
                form_cust_sex: "required",
                birthdate: "required",
                "birth[day]": {
                    required: true,
                    nonzero: true
                },
                "birth[year]": {
                    required: true,
                    nonzero: true,
                    tooyoung: true
                },
                "birth[month]": {
                    required: true,
                    nonzero: true
                },
                form_cust_ssn: {
                    ssn: true
                },
//                form_cust_upin: "required", 
                form_cust_ethnicity: "required",
                form_cust_race: "required",
                form_cust_question_11a: "required",
                form_cust_question_11b: "required",
                form_cust_question_11c: "required",
                form_cust_question_11d: "required",
                form_cust_question_11e: "required",
                form_cust_question_11f: "required",
                form_cust_question_11g: "required",
                form_cust_question_11h: "required",
                form_cust_question_11i: "required",
                form_cust_question_12b: "required",
                form_cust_question_12c: "required",
                form_cust_question_12d1: "required",
                form_cust_question_12d2: "required",
                form_cust_question_12: "required",
                form_cust_citizenship: "required",
                form_cust_citizenship_other_desc: {
                    required: "#form_cust_citizenship_other:checked",
                    nonblank: "#form_cust_citizenship_other:checked",
                    minlength: 2,
                    nonblank: true
                },
                form_cust_alien_num: {
                    required: "#form_cust_citizenship_us:unchecked",
                    nonblank: "#form_cust_citizenship_us:unchecked",
                    minlength: 8,
                    maxlength: 15,
                    nonblank: true
                }
            },
            messages: {
                form_cust_middle_name: "This field is required. NMN if no middle name.",
                form_cust_race: "Select one or more races.",
                form_cust_place_of_birth: "Select only one of either U.S. city and state or foreign country code.",
                form_cust_zip: "Enter a valid 5 digit ZIP Code.",
                "birth[month]": "You must supply a month.",
//                "birth[year]": "You must supply a year.",
                "birth[day]": "You must supply a day."
            },
            errorPlacement: function(error, element) {
                if (element.attr('name') == "birth[month]") {
                    error.appendTo('#invalid-birthday');            
                }
                else if (element.attr('name') == "birth[day]") {
                    error.appendTo('#invalid-birthday');
                }
                else if (element.attr('name') == "birth[year]") {
                    error.appendTo('#invalid-birthday');
                }
                else {
                    error.appendTo('#invalid-' + element.attr('name').replace(/[\[\]]/g, '' ));
                }
            }
        });
        
        if (form.valid() == true){

            if ($('#loginpage').is(":visible")){
                // validate log in credentials
                var ts = (new Date).getTime();
                $.ajax({
                    url: 'ajax/verifypin.pl',
                    method: "GET",
                    dataType: "json",
                    data: { form_cust_num: $("#form_cust_num").val(), 
                            form_cust_pin: $("#form_cust_pin").val(),
                            ts: ts
                            },
                    
                    success: function(data) {
                        if (data.result == true) {
                            console.log('Found');
                            current_fs = $('#loginpage');
                            next_fs = $('#page1');
                            next_fs.show(); 
                            current_fs.hide();
                        }
                        else if (data.result == false) {
                            window.alert('Failed to find Customer Number or Pin.  Please verify and try again.');
                        }
                    },
                    error: function(xhr, textStatus, errorThrown) {
                        window.alert(textStatus);
                    }
                });
            }
            else {
                // Verify customer is content with their answers before proceeding.
                var verified = confirm("Are you sure you have answered the questions correctly");
                
                if (verified) {

                    if ($('#page1').is(":visible")){
                        current_fs = $('#page1');
                        next_fs = $('#page2');
                    }
                    else if ($('#page2').is(":visible")){
                        current_fs = $('#page2');
                        next_fs = $('#page3');
                    }
                    else if ($('#page3').is(":visible")){
                        current_fs = $('#page3');
                        next_fs = $('#page4');
                    }
                    else if ($('#page4').is(":visible")){
                        current_fs = $('#page4');
                        next_fs = $('#page5');
                    }
                    else if ($('#page5').is(":visible")){
                        current_fs = $('#page5');
                        next_fs = $('#page6');
                    }
                    else if ($('#page6').is(":visible")){
                        current_fs = $('#page6');
                        next_fs = $('#page6');
                        $('#formsubmit').show();
                    }
                }
                next_fs.show(); 
                current_fs.hide();
                window.scrollTo(0,0);
            }
        }
    });            
    
    $('#form_cust_zip').on('input', function() {
        var input = $( this );
        var regex = /^\d{5}$/;
        input.val( input.val().replace(/[^0-9]/g, '' ) );
        var isZip = regex.test(input.val());
        if (isZip) {
            input.removeClass("invalidx").addClass("validx");
        }
        else {
            input.removeClass("validx").addClass("invalidx");
        }
    });
    
    $('#form_cust_num').on('input', function() {
        var input = $( this );
        input.val( input.val().replace(/[^0-9]/g, '' ) );
    });

    $('#form_cust_pin').on('input', function() {
        var input = $( this );
        input.val( input.val().replace(/[^0-9]/g, '' ) );
    });

    
    $('#form_cust_height_in').on('input', function() {
        var input = $( this );
        input.val( input.val().replace(/[^0-9]/g, '' ) );  
        if ( Number(input.val()) >= 0 && Number(input.val()) < 12) {
            input.removeClass("invalidx").addClass("validx");
        }                    
        else {
            input.removeClass("validx").addClass("invalidx");
        }
    });
    
    $('#form_cust_height_ft').on('input', function() {
        var input = $( this );
        input.val( input.val().replace(/[^0-9]/g, '' ) );                 
    });

    $('#form_cust_weight').on('input', function() {
        var input = $( this );
        input.val( input.val().replace(/[^0-9]/g, '' ) );  
        if ( input.val() >= 40 && input.val() < 900 ) {
            input.removeClass("invalidx").addClass("validx");
        }                    
        else {
            input.removeClass("validx").addClass("invalidx");
        }
    });

    $('#form_cust_ssn').on('input', function() {
        var input = $( this );
        input.val( input.val().replace(/[^0-9\-]/g, '' ) );

        if (/^\d{4}$/.test(input.val())) {
            input.val(input.val().substring(0, 3) + '-' + input.val().substring(3, 4) );
        }
        else if (/^\d{3}\-\d{3}$/.test(input.val())) {
            input.val(input.val().substring(0, 6) + '-' + input.val().substring(6, 7) );
        }
        
        var regex = /^\d{3}\-\d{2}\-\d{4}$/;
        var isSSN = regex.test(input.val());
        if ( isSSN ) {
            input.removeClass("invalidx").addClass("validx");
        }                    
        else {
            input.removeClass("validx").addClass("invalidx");
        }
    });

    $('#form_cust_question_11l_n').change( function() {
       $('#question_12').hide();
    });
    
    $('#form_cust_question_11l_y').change( function() {
       $('#question_12').show();
    });
    
    $('#form_cust_citizenship_us').change( function() {
        if ($(this).is(":checked")) {
            $('#form_cust_alien_num').val('');
            $('#question_15').hide();
        }
        else {
            $('#question_15').show();
        }
    });

    $('#form_cust_question_12d1_y').change( function() {
        if ($(this).is(":checked")) {
            $('#question_12d2').show();
        }
        else {
            $('#question_12d2').hide();
            $('#form_cust_question_12d2_y').prop('checked', false);;
            $('#form_cust_question_12d2_n').prop('checked', false);;
        }
    });

    $('#form_cust_question_12d1_n').change( function() {
        if ($(this).is(":checked")) {
            $('#question_12d2').hide();
            $('#form_cust_question_12d2_y').prop('checked', false);;
            $('#form_cust_question_12d2_n').prop('checked', false);;
        }
        else {
            $('#question_12d2').show();
        }
    });
    
    
    $('#form_cust_citizenship_other').change( function() {
        if ($(this).is(":checked")) {
            $('#question_12a2').show();
        }
        else {
            $('#question_12a2').hide();
            $('#form_cust_citizenship_other_desc').val('');

        }
    });

    
    $('#form_cust_place_of_birth').on('input', function() {
        var input = $( this );
        if ( /^\s*$/.test(input.val())) {
           $('#form_cust_foreign_country').removeAttr("disabled");
           $('#form_cust_state_of_birth').attr("disabled", "disabled");
        }
        else {
            $('#form_cust_foreign_country').attr("disabled", "disabled");
           $('#form_cust_state_of_birth').removeAttr("disabled");
        }
    });

    $('#form_cust_foreign_country').on('input', function() {
        var input = $( this );
        if ( /^\s*$/.test(input.val())) {
           $('#form_cust_place_of_birth').removeAttr("disabled");
           $('#form_cust_state_of_birth').removeAttr("disabled");
        }
        else {
            $('#form_cust_place_of_birth').attr("disabled", "disabled");
           $('#form_cust_state_of_birth').attr("disabled", "disabled");
        }
    });
    
    $('#atfForm').on('keyup keypress', function(e) {
        var code = e.keyCode || e.which;
        if (code == 13) { 
            e.preventDefault();
            return false;
        }
    });

//    $("#birthdate").change( function() {
//        var input = $( this );
//        window.alert("birthday");
//    });

    
//    $('#tt-template').tooltipster({
//        trigger: 'click',
//        content: $('')
//    });

    $('#tt-sectiona').tooltipster({
        trigger: 'click',
        maxWidth: 700,
        content: $("<p>The transferee/buyer must personally complete Section A of this form and certify <i>(sign)</i> that the answers are true, correct, and complete. However, if the transferee/ buyer is unable to read and/or write, the answers <i>(other than the signature)</i> may be completed by another person, excluding the transferor/seller. Two persons <i>(other than the transferor/seller)</i> must then sign as witnesses to the transferee's/buyer's answers and signature/certification in question 14.</p><p>When the transferee/buyer of a firearm is a corporation, company, association, partnership, or other such business entity, an officer authorized to act on behalf of the business must complete Section A of the form with his/her personal information, sign Section A, and attach a written statement, executed under penalties of perjury, stating: (A) the firearm is being acquired for the use of and will be the property of that business entity; and (B) the name and address of that business entity.</p>")
    });

    $('#tt-name').tooltipster({
        trigger: 'click',
        maxWidth: 700,
        content: $("<p>If the transferee's/buyer's name in question 1 is illegible, the transferor/seller must print the transferee's/buyer's name above the name written by the transferee/buyer.</p>")
    });

    $('#tt-address').tooltipster({
        trigger: 'click',
        maxWidth: 700,
        content: $('<p>A rural route (RR) may be accepted provided the transferee/buyer lives in a State or locality where it is considered a legal residence address. County and Parish are one and the same.</p><p>If the transferee/buyer is a member of the Armed Forces on active duty, his/her State of residence is the State in which his/her permanent duty station is located. If the service member is acquiring a firearm in a State where his/her permanent duty station is located, but resides in a different State, the transferee/buyer must list both his/her permanent duty station address and his/her residence address in response to question 2. If the transferee/buyer has two States of residence, the transferee/ buyer should list his/her current residence address in response to question 2 <i>(e.g., if the transferee/buyer is purchasing a firearm while staying at his/her weekend home in State X, he/she should list the address in State X in response to question 2)</i>.</p>')
    });
    

    $('#tt-9').tooltipster({
        trigger: 'click',
        maxWidth: 700,
        content: $('<p>For transferees/ buyers approved to have information maintained about them in the FBI NICS Voluntary Appeal File, NICS will provide them with a UPIN, which the transferee/ buyer should record in question 9. The licensee should provide the UPIN when conducting background checks through the NICS or the State POC.</p>')
    });

    $('#tt-10a').tooltipster({
        trigger: 'click',
        maxWidth: 700,
        content: $("<p>Federal regulations (27 CFR 478.124(c)(1)) require licensees to obtain the race of the transferee/buyer. This information helps the FBI and/or State POC make or rule out potential matches during the background check process and can assist with criminal investigations. Pursuant to Office of Management and Budget (OMB), effective January 1, 2003, all Federal agencies requiring collection of race and ethnicity information on administrative forms and records, were required to collect this information in a standard format. (See 62 FR 58782) The standard OMB format consists of two categories for data on ethnicity: &quot;Hispanic or Latino,&quot; and &quot;Not Hispanic or Latino&quot; and five categories for data on race: American Indian or Alaska Native, Asian, Black or African American, Native Hawaiian or Other Pacific Islander, and White. Ethnicity refers to a person's heritage. Persons of Cuban, Mexican, Puerto Rican, South or Central American, or other Spanish culture or origin, regardless of race, are considered Hispanic or Latino.</p>")
    });

    $('#tt-10b').tooltipster({
        trigger: 'click',
        maxWidth: 700,
        content: $("<p>Race - one or more of the following responses must be selected: (1) American Indian or Alaska Native - A person having origins in any of the original peoples of North and South America (including Central America), and who maintains a tribal affiliation or community attachment; (2) Asian - A person having origins in any of the original peoples of the Far East, Southeast Asia, or the Indian subcontinent including, for example, Cambodia, China, India, Japan, Korea, Malaysia, Pakistan, the Philippine Islands, Thailand, and Vietnam; (3) Black or African American - A person having origins in any of the Black racial groups of Africa; (4) Native Hawaiian or Other Pacific Islander - A person having origins in any of the original peoples of Hawaii, Guam, Samoa, or other Pacific Islands; and (5) White - A person having origins in any of the original peoples of Europe, the Middle East, or North Africa. Any other race or ethnicity that does not fall within those indicated, please select the closest representation.</p>")
    });


    $('#tt-11a').tooltipster({
        trigger: 'click',
        maxWidth: 700,
        content: $("<p>For purposes of this form, a person is the actual transferee/buyer if he/she is purchasing the firearm for him/herself or otherwise acquiring the firearm for him/herself. <i>(e.g., redeeming the firearm from pawn, retrieving it from consignment, firearm raffle winner)</i>. A person is also the actual transferee/buyer if he/she is legitimately purchasing the firearm as a bona fide gift for a third party. A gift is not bona fide if another person offered or gave the person completing this form money, service(s), or item(s) of value to acquire the firearm for him/her, or if the other person is prohibited by law from receiving or possessing the firearm.</p><p><b>Actual TRANSFEREE/buyer examples:</b> Mr. Smith asks Mr. Jones to purchase a firearm for Mr. Smith <i>(who may or may not be prohibited)</i>. Mr. Smith gives Mr. Jones the money for the firearm. Mr. Jones is <b>NOT THE ACTUAL TRANSFEREE/BUYER</b> of the firearm and must answer <b>&quot;NO&quot;</b> to question 11.a. The licensee may not transfer the firearm to Mr. Jones. However, if Mr. Brown buys the firearm with his own money to give to Mr. Black as a gift <i>(with no service or tangible thing of value provided by Mr. Black)</i>, Mr. Brown is the actual transferee/buyer of the firearm and should answer <b>&quot;YES&quot;</b> to question 11.a. However, the transferor/seller may not transfer a firearm to any person he/she knows or has reasonable cause to believe is prohibited under 18 U.S.C. 922(g), (n) or (x). <b>EXCEPTION:</b> If a person is picking up a repaired firearm(s) for another person, he/she is not required to answer 11.a. and may proceed to question 11.b.</p>")
    });
    
    $('#tt-11b').tooltipster({
        trigger: 'click',
        maxWidth: 700,
        content: $("<p><b>Question 11.b. - 12.</b>Generally, 18 U.S.C. 922(g) prohibits the shipment, transportation, receipt, or possession in or affecting interstate commerce of a firearm by one who: has been convicted of a felony in any Federal, State or local court, or any other crime, punishable by imprisonment for a term exceeding one year <b><i>(this does not include State misdemeanors punishable by imprisonment of two years or less)</i>;</b> is a fugitive from justice; is an unlawful user of, or addicted to, marijuana or any depressant, stimulant, or narcotic drug, or any other controlled substance; has been adjudicated as a mental defective or has been committed to a mental institution; has been discharged from the Armed Forces under dishonorable conditions; is subject to certain restraining orders; convicted of a misdemeanor crime of domestic violence under Federal, State or Tribal law; has renounced his/her U.S. citizenship; is an alien illegally in the United States or an alien admitted to the United States under a nonimmigrant visa. Furthermore, section 922(n) prohibits the shipment, transportation, or receipt in or affecting interstate commerce of a firearm by one who is under indictment or information for a felony in any Federal, State or local court, or any other crime, punishable by imprisonment for a term exceeding one year. An information is a formal accusation of a crime verified by a prosecutor.</p><p>A member of the Armed Forces must answer &quot;yes&quot; to 11.b. or 11.c. if charged with an offense that was either referred to a General Court Martial, or at which the member was convicted. Discharged &quot;under dishonorable conditions&quot; means separation from the Armed Forces resulting from a dishonorable discharge or dismissal adjudged by a General Court-Martial. That term does not include any other discharge or separation from the Armed Forces.</p><p><b><i>EXCEPTION</i>:</b> A person who has been convicted of a felony, or any other crime, for which the judge could have imprisoned the person for more than one year, or who has been convicted of a misdemeanor crime of domestic violence, is not prohibited from purchasing, receiving, or possessing a firearm if: (1) under the law of the jurisdiction where the conviction occurred, the person has been pardoned, the conviction has been expunged or set aside, or the person has had their civil rights <i>(the right to vote, sit on a jury, and hold public office)</i> taken away and later restored, AND (2) the person is not prohibited by the law of the jurisdiction where the conviction occurred from receiving or possessing firearms. Persons subject to this exception, or who receive relief from disabilities under 18 U.S.C. 925(c), should answer &quot;no&quot; to the applicable question.</p>")
    });
    
    $('#tt-11c').tooltipster({
        trigger: 'click',
        maxWidth: 700,
        content: $("<p><b>Question 11.b. - 12.</b>Generally, 18 U.S.C. 922(g) prohibits the shipment, transportation, receipt, or possession in or affecting interstate commerce of a firearm by one who: has been convicted of a felony in any Federal, State or local court, or any other crime, punishable by imprisonment for a term exceeding one year <b><i>(this does not include State misdemeanors punishable by imprisonment of two years or less)</i>;</b> is a fugitive from justice; is an unlawful user of, or addicted to, marijuana or any depressant, stimulant, or narcotic drug, or any other controlled substance; has been adjudicated as a mental defective or has been committed to a mental institution; has been discharged from the Armed Forces under dishonorable conditions; is subject to certain restraining orders; convicted of a misdemeanor crime of domestic violence under Federal, State or Tribal law; has renounced his/her U.S. citizenship; is an alien illegally in the United States or an alien admitted to the United States under a nonimmigrant visa. Furthermore, section 922(n) prohibits the shipment, transportation, or receipt in or affecting interstate commerce of a firearm by one who is under indictment or information for a felony in any Federal, State or local court, or any other crime, punishable by imprisonment for a term exceeding one year. An information is a formal accusation of a crime verified by a prosecutor.</p><p>A member of the Armed Forces must answer &quot;yes&quot; to 11.b. or 11.c. if charged with an offense that was either referred to a General Court Martial, or at which the member was convicted. Discharged &quot;under dishonorable conditions&quot; means separation from the Armed Forces resulting from a dishonorable discharge or dismissal adjudged by a General Court-Martial. That term does not include any other discharge or separation from the Armed Forces.</p><p><b><i>EXCEPTION</i>:</b> A person who has been convicted of a felony, or any other crime, for which the judge could have imprisoned the person for more than one year, or who has been convicted of a misdemeanor crime of domestic violence, is not prohibited from purchasing, receiving, or possessing a firearm if: (1) under the law of the jurisdiction where the conviction occurred, the person has been pardoned, the conviction has been expunged or set aside, or the person has had their civil rights <i>(the right to vote, sit on a jury, and hold public office)</i> taken away and later restored, AND (2) the person is not prohibited by the law of the jurisdiction where the conviction occurred from receiving or possessing firearms. Persons subject to this exception, or who receive relief from disabilities under 18 U.S.C. 925(c), should answer &quot;no&quot; to the applicable question.</p>")
    });

        $('#tt-11d').tooltipster({
        trigger: 'click',
        maxWidth: 700,
        content: $("<p><b>Fugitive from Justice:</b> Any person who has fled from any State to avoid prosecution for a felony or a misdemeanor; or any person who leaves the State to avoid giving testimony in any criminal proceeding. The term also includes any person who knows that misdemeanor or felony charges are pending against such person and who leaves the State of prosecution.</p>")
    });
    
    $('#tt-11f').tooltipster({
        trigger: 'click',
        maxWidth: 700,
        content: $("<p><b>Adjudicated as a Mental Defective:</b> A determination by a court, board, commission, or other lawful authority that a person, as a result of marked subnormal intelligence, or mental illness, incompetency, condition, or disease: (1) is a danger to himself or to others; or (2) lacks the mental capacity to contract or manage his own affairs. This term shall include: (1) a finding of insanity by a court in a criminal case; and (2) those persons found incompetent to stand trial or found not guilty by reason of lack of mental responsibility.</p><p><b>Committed to a Mental Institution:</b> A formal commitment of a person to a mental institution by a court, board, commission, or other lawful authority. The term includes a commitment to a mental institution involuntarily. The term includes commitment for mental defectiveness or mental illness. It also includes commitments for other reasons, such as for drug use. The term does not include a person in a mental institution for observation or a voluntary admission to a mental institution.</p><p><b>EXCEPTION:</b> Under the NICS Improvement Amendments Act of 2007, a person who has been adjudicated as a mental defective or committed to a mental institution in a State proceeding is not prohibited by the adjudication or commitment if the person has been granted relief by the adjudicating/committing State pursuant to a qualifying mental health relief from disabilities program. Also, a person who has been adjudicated as a mental defective or committed to a mental institution by a department or agency of Federal Government is not prohibited by the adjudication or commitment if either: (a) the person's adjudication or commitment was set-aside or expunged by the adjudicating/committing agency; (b) the person has been fully released or discharged from all mandatory treatment, supervision, or monitoring by the agency; (c) the person was found by the agency to no longer suffer from the mental health condition that served as the basis of the initial adjudication/ commitment; or (d) the adjudication or commitment, respectively, is based solely on a medical finding of disability, without an opportunity for a hearing by a court, board, commission, or other lawful authority, and the person has not been adjudicated as a mental defective consistent with section 922(g)(4) of title 18, United States Code; (e) the person was granted relief from the adjudicating/ committing agency pursuant to a qualified mental health relief from disabilities program. <b>Persons who fall within one of the above exceptions should answer &quot;no&quot; to question 11.f.</b> This exception to an adjudication or commitment by a Federal department or agency does not apply to any person who was adjudicated to be not guilty by reason of insanity, or based on lack of mental responsibility, or found incompetent to stand trial, in any criminal case or under the Uniform Code of Military Justice.</p>")
    });
    
    $('#tt-11h').tooltipster({
        trigger: 'click',
        maxWidth: 700,
        content: $("<p><b>Qualifying Restraining Orders:</b> Under 18 U.S.C. 922, firearms may not be sold to or received by persons subject to a court order that: (A) was issued after a hearing which the person received actual notice of and had an opportunity to participate in; (B) restrains such person from harassing, stalking, or threatening an intimate partner or child of such intimate partner or person, or engaging in other conduct that would place an intimate partner in reasonable fear of bodily injury to the partner or child; and (C)(i) includes a finding that such person represents a credible threat to the physical safety of such intimate partner or child; or (ii) by its terms explicitly prohibits the use, attempted use, or threatened use of physical force against such intimate partner or child that would reasonably be expected to cause bodily injury. An &quot;intimate partner&quot; of a person is: the spouse or former spouse of the person, the parent of a child of the person, or an individual who cohabitates or has cohabitated with the person.</p>")
    });
    
    $('#tt-11i').tooltipster({
        trigger: 'click',
        maxWidth: 700,
        content: $("<p><b>Misdemeanor Crime of Domestic Violence:</b> A Federal, State, local, or tribal offense that is a misdemeanor under Federal, State, or tribal law and has, as an element, the use or attempted use of physical force, or the threatened use of a deadly weapon, committed by a current or former spouse, parent, or guardian of the victim, by a person with whom the victim shares a child in common, by a person who is cohabitating with, or has cohabited with the victim as a spouse, parent, or guardian, or by a person similarly situated to a spouse, parent, or guardian of the victim. The term includes all misdemeanors that have as an element the use or attempted use of physical force or the threatened use of a deadly weapon <i>(e.g., assault and battery)</i>, if the offense is committed by one of the defined parties. <i>(See Exception to 11.b. - 12.)</i> A person who has been convicted of a misdemeanor crime of domestic violence also is not prohibited unless: (1) the person was represented by a lawyer or gave up the right to a lawyer; or (2) if the person was entitled to a jury, was tried by a jury, or gave up the right to a jury trial. Persons subject to this exception should answer <b>&quot;no&quot;</b> to 11.i.</p>")
    });
    
    $('#tt-12').tooltipster({
        trigger: 'click',
        maxWidth: 700,
        content: $("<p><b>Immigration Status:</b> An alien admitted to the United States under a nonimmigrant visa includes, among others, persons visiting the United States temporarily for business or pleasure, persons studying in the United States who maintain a residence abroad, and certain temporary foreign workers. These aliens must answer &quot;yes&quot; to this question and provide the additional documentation required under question 18.c. Permanent resident aliens and aliens legally admitted to the United States pursuant to either the Visa Waiver Program or to regulations otherwise exempting them from visa requirements may answer &quot;no&quot; to this question and are not required to submit the additional documentation under question 18.c.</p>")
    });
    
    $('#tt-13').tooltipster({
        trigger: 'click',
        maxWidth: 700,
        content: $('<p><b>U.S.-issued Alien Number or Admission Number:</b> U.S.-issued alien and admission numbers may be found on the following U.S. Department of Homeland Security documents: Legal Resident Card or Employment Authorization Card (AR# or USCIS#); Arrival/Departure Record, Form I94, or Form 797A (I94#). Additional information can be obtained from www.cbp.gov. If you are a U.S. citizen or U.S. national then this question should be left blank.</p>')
    });

    $('#tt-14').tooltipster({
        trigger: 'click',
        maxWidth: 700,
        content: $('<p>Under 18 U.S.C. 922(a)(1), it is unlawful for a person to engage in the business of dealing in firearms without a license. A person is engaged in the business of dealing in firearms if he/she devotes time, attention, and labor to dealing in firearms as a regular course of trade or business with the principal objective of livelihood and profit through the repetitive purchase and resale of firearms. A license is not required of a person who only makes occasional sales, exchanges, or purchases of firearms for the enhancement of a personal collection or for a hobby, or who sells all or part of his/her personal collection of firearms.</p>')
    });
    
//    $(window).keypress(function() {
//        $('.tooltip').tooltipster('hide');
//    });

});


