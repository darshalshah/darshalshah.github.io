jQuery(document).ready(function($) {
  "use strict";

  //Contact
  $('form.contactForm').submit(function() {
    var f = $(this).find('.form-group'),
      ferror = false,
      emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;

    f.children('input').each(function() { // run all inputs

      var i = $(this); // current input
      var rule = i.attr('data-rule');

      if (rule !== undefined) {
        var ierror = false; // error flag for current input
        var pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case 'required':
            if (i.val() === '') {
              ferror = ierror = true;
            }
            break;

          case 'minlen':
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;

          case 'email':
            if (!emailExp.test(i.val())) {
              ferror = ierror = true;
            }
            break;

          case 'checked':
            if (! i.is(':checked')) {
              ferror = ierror = true;
            }
            break;

          case 'regexp':
            exp = new RegExp(exp);
            if (!exp.test(i.val())) {
              ferror = ierror = true;
            }
            break;
        }
        i.next('.validation').html((ierror ? (i.attr('data-msg') !== undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
      }
    });
    f.children('textarea').each(function() { // run all inputs

      var i = $(this); // current input
      var rule = i.attr('data-rule');

      if (rule !== undefined) {
        var ierror = false; // error flag for current input
        var pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case 'required':
            if (i.val() === '') {
              ferror = ierror = true;
            }
            break;

          case 'minlen':
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;
        }
        i.next('.validation').html((ierror ? (i.attr('data-msg') != undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
      }
    });
    if (ferror) return false;
    
    var name = $("input#name").val() || "";
    var email = $("input#email").val() || "";
    var subject = $("input#subject").val() || "";
    var message = $("textarea[name='message']").val() || "";
    var action = $(this).attr('action');

    if (!action || action === 'contactform/contactform.php') {
      var mailtoUrl = 'mailto:darshalshah98@gmail.com?subject=' + encodeURIComponent(subject || 'Message from ' + name) + '&body=' + encodeURIComponent('From: ' + name + ' (' + email + ')\n\n' + message);
      window.location.href = mailtoUrl;
      $("#sendmessage").html("Opening your email client to send your message. You can also email me directly at <a href='mailto:darshalshah98@gmail.com' style='color:#fff;font-weight:bold;text-decoration:underline;'>darshalshah98@gmail.com</a>.").addClass("show");
      $("#errormessage").removeClass("show");
      $('.contactForm').find("input, textarea").val("");
      return false;
    }

    var str = $(this).serialize();
    $.ajax({
      type: "POST",
      url: action,
      data: str,
      success: function(msg) {
        if (msg == 'OK') {
          $("#sendmessage").html("Your message has been sent. Thank you!").addClass("show");
          $("#errormessage").removeClass("show");
          $('.contactForm').find("input, textarea").val("");
        } else {
          $("#sendmessage").removeClass("show");
          $("#errormessage").addClass("show");
          $('#errormessage').html(msg);
        }
      },
      error: function() {
        $("#sendmessage").removeClass("show");
        $("#errormessage").addClass("show");
        $('#errormessage').html("Could not send message via form. Please email directly at <a href='mailto:darshalshah98@gmail.com' style='color:#fff;text-decoration:underline;'>darshalshah98@gmail.com</a>.");
      }
    });
    return false;
  });

});
