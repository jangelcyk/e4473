
$.validator.setDefaults({
    submitHandler: function() {
        alert("submitted!");
    }
});

$().ready(function() {

    $(".next").click(function(){
        var form = $("#atfForm");
        form.validate({
            rules: {
                form_cust_last_name: "required",
                form_cust_first_name: "required",
                form_cust_middle_name: "required",
                form_cust_street_address: "required",
                form_cust_city: "required", 
                form_cust_county: "required",
                form_cust_state: "required",
                form_cust_zip: "required",
                form_cust_place_of_birth: {
                    required: "#form_cust_foreign_country:blank"   
                },
                form_cust_state_of_birth: {
                    required: "#form_cust_place_of_birth:filled"
                },
                form_cust_foreign_country: {
                    required: "#form_cust_place_of_birth:blank"   
                },
                form_cust_height_ft: "required",
                form_cust_height_in: "required",
                form_cust_weight: "required",
                form_cust_sex: "required",
                birthdate: "required",
//                form_cust_ssn: "requrired",
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
                form_cust_question_11j: "required",
                form_cust_question_11k: "required",
                form_cust_question_11l: "required",
                form_cust_question_12: "required",
                form_cust_citizenship: "required",
                form_cust_citizenship_other_desc: {
                    required: "#form_cust_citizenship_other:checked"
                },
                form_cust_alien_num: {
                    required: "#form_cust_citizenship_us:unchecked"
                }
            },
            messages: {
                form_cust_middle_name: "This field is required. NMN if no middle name.",
                form_cust_race: "Select one or more races.",
                form_cust_place_of_birth: "Select only one of either U.S. city and state or foreign country code."
            }
        });

        if (form.valid() == true){
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
                next_fs = $('#page7');
                $('#formsubmit').show();
            }
            else if ($('#page7').is(":visible")){
                current_fs = $('#page7');
                next_fs = $('#page7');
                $('#formsubmit').show();
            }

            next_fs.show(); 
            current_fs.hide();
        }
    });            
    
    $('#form_cust_zip').on('input', function() {
        var input = $( this );
        var regex = /^\d{5}$/;
        input.val( input.val().replace(/[^0-9]/g, '' ) );
        var isZip = regex.test(input.val());
        if (isZip) {
            input.removeClass("invalid").addClass("valid");
        }
        else {
            input.removeClass("valid").addClass("invalid");
        }
    });
    
    $('#form_cust_height_in').on('input', function() {
        var input = $( this );
        input.val( input.val().replace(/[^0-9]/g, '' ) );  
        if ( input.val() >= 0 && input.val() < 12) {
            input.removeClass("invalid").addClass("valid");
        }                    
        else {
            input.removeClass("valid").addClass("invalid");
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
            input.removeClass("invalid").addClass("valid");
        }                    
        else {
            input.removeClass("valid").addClass("invalid");
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
            input.removeClass("invalid").addClass("valid");
        }                    
        else {
            input.removeClass("valid").addClass("invalid");
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

    $('#form_cust_citizenship_other').change( function() {
        if ($(this).is(":checked")) {
            $('#question_14b').show();
        }
        else {
            $('#question_14b').hide();
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

    
//    $('#tt-template').tooltipster({
//        trigger: 'click',
//        content: $('')
//    });

    $('#tt-name').tooltipster({
        trigger: 'click',
        content: $("<p>The buyer must personally complete Section A of this form and certify <i>(sign)</i> that the answers are true, correct, and complete. However, if the buyer is unable to read and/or write, the answers <i>(other than the signature)</i> may be completed by another person, excluding the seller. Two persons <i>(other than the seller)</i> must then sign as witnesses to the buyerís answers and signature.</p><p>When the buyer of a firearm is a corporation, company, association, partnership, or other such business entity, an officer authorized to act on behalf of the business must complete Section A of the form with his or her personal information, sign Section A, and attach a written statement, executed under penalties of perjury, stating: (A) the firearm is being acquired for the use of and will be the property of that business entity and (B) the name and address of that business entity. If the buyer's name in question 1. is illegible, the seller must print the buyer's name above the name written by the buyer.</p>")
    });

    $('#tt-address').tooltipster({
        trigger: 'click',
        content: $('<p>U.S. Postal abbreviations are acceptable. <i>(e.g., St., Rd., Dr., PA, NC, etc.)</i>. Address cannot be a post office box. County and Parish are one and the same.</p><p>If the buyer is a member of the Armed Forces on active duty acquiring a firearm in the State where his or her permanent duty station is located, but does not reside at his or her permanent duty station, the buyer must list both his or her permanent duty station address and his or her residence address in response to question 2. If you are a U.S. citizen with two States of residence, you should list your current residence address in response to question 2 <i>(e.g., if you are buying a firearm while staying at your weekend home in State X, you should list your address in State X in response to question 2).</i></p>')
    });
    

    $('#tt-9').tooltipster({
        trigger: 'click',
        content: $('<p>For purchasers approved to have information maintained about them in the FBI NICS Voluntary Appeal File, NICS will provide them with a Unique Personal Identification Number, which the buyer should record in question 9. The licensee may be asked to provide the UPIN to NICS or the State.</p>')
    });
    
    $('#tt-11a').tooltipster({
        trigger: 'click',
        content: $('<p>For purposes of this form, you are the actual transferee/buyer if you are purchasing the firearm for yourself or otherwise acquiring the firearm for yourself <i>(e.g., redeeming the firearm from pawn/retrieving it from consignment, firearm raffle winner).</i> You are also the actual transferee/buyer if you are legitimately purchasing the firearm as a gift for a third party. <b>ACTUAL TRANSFEREE/BUYER EXAMPLES:</b> Mr. Smith asks Mr. Jones to purchase a firearm for Mr. Smith. Mr. Smith gives Mr. Jones the money for the firearm. Mr. Jones is <b>NOT THE ACTUAL TRANSFEREE/BUYER</b> of the firearm and must answer <b>&quot;NO&quot;</b> to question 11.a. The licensee may not transfer the firearm to Mr. Jones. However, if Mr. Brown goes to buy a firearm with his own money to give to Mr. Black as a present, Mr. Brown is the actual transferee/buyer of the firearm and should answer <b>&quot;YES&quot;</b> to question 11.a. However, you may not transfer a firearm to any person you know or have reasonable cause to believe is prohibited under 18 U.S.C. &sect; 922(g), (n), or (x). <b>Please note: EXCEPTION:</b> If you are picking up a repaired firearm(s) for another person, you are not required to answer 11.a. and may proceed to question 11.b.</p>')
    });
    
    $('#tt-11b').tooltipster({
        trigger: 'click',
        content: $('<p><b>Under Indictment or Information or Convicted in any Court:</b> An indictment, information, or conviction in any Federal, State, or local court. An information is a formal accusation of a crime verified by a prosecutor.</p> <p <b>Definition of Prohibited Person:</b> Generally, 18 U.S.C. &sect; 922 prohibits the shipment, transportation, receipt, or possession in or affecting interstate commerce of a firearm by one who: has been convicted of a misdemeanor crime of domestic violence; has been convicted of a felony, or any other crime, punishable by imprisonment for a term exceeding one year <i>(this does not include State misdemeanors punishable by imprisonment of two years or less)</i>; is a fugitive from justice; is an unlawful user of, or addicted to, marijuana or any depressant, stimulant, or narcotic drug, or any other controlled substance; has been adjudicated mentally defective or has been committed to a mental institution; has been discharged from the Armed Forces under dishonorable conditions; has renounced his or her U.S. citizenship; is an alien illegally in the United States or an alien admitted to the United States under a nonimmigrant visa; or is subject to certain restraining orders. Furthermore, section 922 prohibits the shipment, transportation, or receipt in or affecting interstate commerce of a firearm by one who is under indictment or information for a felony, or any other crime, punishable by imprisonment for a term exceeding one year.</p>')
    });
    
    $('#tt-11c').tooltipster({
        trigger: 'click',
        content: $('<p><i><b>EXCEPTION to 11.c. and 11.i.:</b></i> A person who has been convicted of a felony, or any other crime, for which the judge could have imprisoned the person for more than one year, or who has been convicted of a misdemeanor crime of domestic violence, is not prohibited from purchasing, receiving, or possessing a firearm if: (1) under the law of the jurisdiction where the conviction occurred, the person has been pardoned, the conviction has been expunged or set aside, or the person has had their civil rights <i>(the right to vote, sit on a jury, and hold public office)</i> taken away and later restored AND (2) the person is not prohibited by the law of the jurisdiction where the conviction occurred from receiving or possessing firearms. Persons subject to this exception should answer <b>&quot;no&quot;</b> to 11.c. or 11.i., as applicable.</p>')
    });
    
    $('#tt-11f').tooltipster({
        trigger: 'click',
        content: $("<p><b>Adjudicated Mentally Defective:</b> A determination by a court, board, commission, or other lawful authority that a person, as a result of marked subnormal intelligence, or mental illness, incompetency, condition, or disease: (1) is a danger to himself or to others; or (2) lacks the mental capacity to contract or manage his own affairs. This term shall include: (1) a finding of insanity by a court in a criminal case; and (2) Those persons found incompetent to stand trial or found not guilty by reason of lack of mental responsibility.</p><p><b>Committed to a Mental Institution:</b> A formal commitment of a person to a mental institution by a court, board, commission, or other lawful authority. The term includes a commitment to a mental institution involuntarily. The term includes commitment for mental defectiveness or mental illness. It also includes commitments for other reasons, such as for drug use. The term does not include a person in a mental institution for observation or a voluntary admission to a mental institution. Please also refer to Question 11.c. for the definition of a prohibited person.</p><p><b><i>EXCEPTION to 11. f. NICS Improvement Amendments Act of 2007:</i></b> A person who has been adjudicated as a mental defective or committed to a mental institution is not prohibited if: (1) the person was adjudicated or committed <b>by a department or agency of the Federal Government,</b> such as the United States Department of Veteranís Affairs (&quot;VA&quot;) (as opposed to a State court, State board, or other lawful State authority); <u>and</u> (2) either: (a) the person's adjudication or commitment for mental incompetency was set-aside or expunged by the adjudicating/committing agency; (b) the person has been fully released or discharged from all mandatory treatment, supervision, or monitoring by the agency; or (c) the person was found by the agency to no longer suffer from the mental health condition that served as the basis of the initial adjudication. <b>Persons who fit this exception should answer &quot;no&quot; to Item 11.f.</b> This exception does not apply to any person who was adjudicated to be not guilty by reason of insanity, or based on lack of mental responsibility, or found incompetent to stand trial, in any criminal case or under the Uniform Code of Military Justice.</p>")
    });
    
    $('#tt-11h').tooltipster({
        trigger: 'click',
        content: $('<p><b>Definition of Restraining Order:</b> Under 18 U.S.C. &sect; 922, firearms may not be sold to or received by persons subject to a court order that: (A) was issued after a hearing which the person received actual notice of and had an opportunity to participate in; (B) restrains such person from harassing, stalking, or threatening an intimate partner or child of such intimate partner or person, or engaging in other conduct that would place an intimate partner in reasonable fear of bodily injury to the partner or child; and (C)(i) includes a finding that such person represents a credible threat to the physical safety of such intimate partner or child; or (ii) by its terms explicitly prohibits the use, attempted use, or threatened use of physical force against such intimate partner or child that would reasonably be expected to cause bodily injury. An &quot;intimate partner&quot; of a person is: the spouse or former spouse of the person, the parent of a child of the person, or an individual who cohabitates or cohabitating with the person.</p>')
    });
    
    $('#tt-11i').tooltipster({
        trigger: 'click',
        content: $('<p><b>Definition of Misdemeanor Crime of Domestic Violence:</b> A Federal, State, local, or tribal offense that is a misdemeanor under Federal, State, or tribal law and has, as an element, the use or attempted use of physical force, or the threatened use of a deadly weapon, committed by a current or former spouse, parent, or guardian of the victim, by a person with whom the victim shares a child in common, by a person who is cohabitating with, or has cohabited with the victim as a spouse, parent, or guardian, or by a person similarly situated to a spouse, parent, or guardian of the victim. The term includes all misdemeanors that have as an element the use or attempted use of physical force or the threatened use of a deadly weapon <i>(e.g., assault and battery)</i>, if the offense is committed by one of the defined parties. <i>(See Exception to 11.c. and 11.i.)</i> A person who has been convicted of a misdemeanor crime of domestic violence also is not prohibited unless: (1) the person was represented by a lawyer or gave up the right to a lawyer; or (2) if the person was entitled to a jury, was tried by a jury, or gave up the right to a jury trial. Persons subject to this exception should answer <b>&quot;no&quot;</b> to 11.i.</p>')
    });
    
    $('#tt-11l').tooltipster({
        trigger: 'click',
        content: $('<p>An alien admitted to the United States under a nonimmigrant visa includes, among others, persons visiting the United States temporarily for business or pleasure, persons studying in the United States who maintain a residence abroad, and certain temporary foreign workers. The definition does <b>NOT</b> include permanent resident aliens nor does it apply to nonimmigrant aliens admitted to the United States pursuant to either the Visa Waiver Program or to regulations otherwise exempting them from visa requirements.</p> <p>An alien admitted to the United States under a nonimmigrant visa who responds &quot;yes&quot; to question 11.l. must provide a response to question 12 indicating whether he/she qualifies under an exception.</p>')
    });
    
    $('#tt-12').tooltipster({
        trigger: 'click',
        content: $('<p><b>Exceptions to the Nonimmigrant Alien Response:</b> An alien admitted to the United States under a nonimmigrant visa is not prohibited from purchasing, receiving, or possessing a firearm if the alien: (1) is in possession of a hunting license or permit lawfully issued by the Federal Government, a State, or local government, or an Indian tribe federally recognized by the Bureau of Indian Affairs, which is valid and unexpired; (2) was admitted to the United States for lawful hunting or sporting purposes; (3) has received a waiver from the prohibition from the Attorney General of the United States; (4) is an official representative of a foreign government who is accredited to the United States Government or the Governmentís mission to an international organization having its headquarters in the United States; (5) is en route to or from another country to which that alien is accredited; (6) is an official of a foreign government or a distinguished foreign visitor who has been so designated by the Department of State; or (7) is a foreign law enforcement officer of a friendly foreign government entering the United States on official law enforcement business.</p> <p>Persons subject to one of these exceptions should answer &quot;yes&quot; to questions 11.l. and 12 and provide documentation such as a copy of the hunting license or letter granting the waiver, which must be recorded in 20.c. If the transferee <i>(buyer)</i> answered &quot;yes&quot; to this question, the licensee must complete 20.c.</p> <p>The seller should verify supporting documentation provided by the purchaser and must attach a copy of the provided documentation to this ATF Form 4473, Firearms Transaction Record.</p>')
    });
    
    $('#tt-13').tooltipster({
        trigger: 'click',
        content: $('<p><b>State of Residence:</b> The State in which an individual resides. An individual resides in a State if he or she is present in a State with the intention of making a home in that State. If an individual is a member of the Armed Forces on active duty, his or her State of residence also is the State in which his or her permanent duty station is located.</p> <p>If you are a U.S. citizen with two States of residence, you should list your current residence address in response to question 2 <i>(e.g., if you are buying a firearm while staying at your weekend home in State X, you should list your address in State X in response to question 2.)</i></p>')
    });

    $('#tt-16').tooltipster({
        trigger: 'click',
        content: $('<p><b>Certification Definition of Engaged in the Business:</b> Under 18 U.S.C. &sect; 922 (a)(1), it is unlawful for a person to engage in the business of dealing in firearms without a license. A person is engaged in the business of dealing in firearms if he or she devotes time, attention, and labor to dealing in firearms as a regular course of trade or business with the principal objective of livelihood and profit through the repetitive purchase and resale of firearms. A license is not required of a person who only makes occasional sales, exchanges, or purchases of firearms for the enhancement of a personal collection or for a hobby, or who sells all or part of his or her personal collection of firearms.</p>')
    });
    

//    $(window).keypress(function() {
//        $('.tooltip').tooltipster('hide');
//    });
            
    
});

                      
                      

