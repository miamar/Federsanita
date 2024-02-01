var isMobile = typeof window.matchMedia != 'undefined' && window.matchMedia("(max-device-width: 800px), (max-width: 800px)").matches;

$(function(){
    $('.no-js').hide();
    $('.js').show();
       
    if ($.browser.msie) {
        $('body').addClass('ie');
        if (parseInt($.browser.version) == 10)
            $('body').addClass('ie10');
    }
    
// Aggiungo il rel="external" ai link esterni, per farli aprire in una nuova finestra
	$('#pagetext a').each(function() {
		url = $(this).attr('href');
		if (url != undefined && url.indexOf('http') != -1 && url.indexOf(location.host) == -1) {
			$(this).attr({'rel':'external'});
		}
	})

// Apro i link external in nuova finestra
	$('a[rel=external]').click(function() {
		new_win = window.open(this.href, 'new_win');
		new_win.focus();
		return false;
	})
    
// Caricamento eventi menu agenda via Ajax
    $('.agenda .left, .agenda .right').live('click', function() {
        var url = $(this).attr('href');
        url = '/agenda_ajax' + url.substring(url.indexOf('?'));
        $.get(url, function(data) {
            $('.agenda').html(data);
        })
        return false;
    })
    
    var header = $('div.header');
    var offset = $(header).find('.menu-wrapper').position().top;
    
    if (!isMobile) {

        if ($(window).height() > 800) {
            $(window).scroll(function() {
                if (offset >= $(window).scrollTop()) {
                    $('body').removeClass('fixed');
                } else { 
                    $('body').addClass('fixed');
                }
            })
        }

        var hoverIn = function() {
            if ($(this).find('.sub-menu').length) {
                $('.white-overlay').show();
            }     	
        }
        var hoverOut = function() {
            $('.white-overlay').hide();
        }

// Il pubblicatore deve usare un'altra versione di Jquery, e non puÃ² funzionare hoverIntent
        if ($.fn.hoverIntent) {
            $('#menu > li').hoverIntent(hoverIn, hoverOut);
        } else {
            $('#menu > li').hover(hoverIn, hoverOut);
        }
    } // End funzioni solo per il desktop, NON per mobile
    
    $('#search-form').submit(function() {
        var query = $.trim($('#query').val());
        $('#query').val(query);
        if (!query) {
            return false;
        }
    })
    




/*  Select di selezione data notizie, apertura automatica */
    $('select.autosubmit').change(function() {
        $(this).closest('form').submit();
    })
     
    $('.attachments a.preview').attr('title', 'Anteprima');
    
    /* Apro scribd per visualizzare anteprima pdf */
    $('.attachments a.preview').live('click', function() {

// Nascondo i link tabella/anteprime
        $('h2 a.alternate').hide();
    
  		var PUB_ID = 'pub-12323598773425576368';
  		
// Se il documento Ã¨ giÃ  su Scribd uso il doc_id, altrimenti lo carico ora  		
  		var doc_id = $(this).data('scribdid');
        if (doc_id) { 		
      		var scribd_doc = scribd.Document.getDoc(doc_id, PUB_ID);
        } else {
    		var url = $(this).attr('href');       
      		var scribd_doc = scribd.Document.getDocFromUrl(url, PUB_ID);
        }
  		
  		scribd_doc.addParam('jsapi_version', 2);
  		scribd_doc.addParam('width', 600);
  		scribd_doc.addParam('public', false);
  		scribd_doc.addParam('allow_share', true);
  		
		box = $('.scribd-wrapper');
  		$(box).closest('.scribd-wrapper').show();
  		
  		var position = $(this).closest('ul').position();
  		$(box).css('top', position.top);
  		$(box).find('.scribd-overview').css('margin-left', position.left);
  		scribd_doc.write($(box).find('.scribd-overview').attr('id'));
  		
  		return false;
	})
	
	$('.scribd-wrapper a.close').live('click', function() {
		$('.scribd-wrapper').fadeOut();
		$('.scribd-wrapper').find('.scribd-overview').html('');
  		
// Mostro i link tabella/anteprime
        $('h2 a.alternate').show();
  		return false;
	})
	
	$('a.slide-details').live('click', function() {
		$(this).next('div.details').slideToggle('slow');
		$(this).toggleClass('selected');
		return false;
	})
	
	$('a.alternate').click(function() {
	    $(this).html($(this).closest('div.section').find('div.active').attr('title'));
	    $(this).closest('div.section').find('div.alternate').children().toggleClass('active');    
	    return false;
	})	
		 
})


