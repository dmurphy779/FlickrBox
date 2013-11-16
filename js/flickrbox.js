(function($){
    $.fn.flickrBox = function(callerSettings) { 
        var settings = $.extend(callerSettings);  
        var url = 'http://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=';
        url += settings.apiKey;
        url += '&photoset_id=';
        url += settings.photosetID;
        url += '&format=json&jsoncallback=?';	

        var flickrId = this; //must define what div this is before the ajax
		
		$.getJSON(url += '&per_page=1', displaySetInfo);
		
		function displaySetInfo(data) {	
			var photosetTitle = data.photoset.title;
			var photosetTag = photosetTitle.toLowerCase().trim().split(/\s+/).join('-');
			flickrId.prepend('<h2>'+photosetTitle+'</h2>');
			var theHtml = "";			
	
		$.each(data.photoset.photo, function(i,photo){
				var source = 'http://farm'+photo.farm+'.static.flickr.com/'+photo.server+'/'+photo.id+'_'+photo.secret+'_n.jpg';
				theHtml+= '<a href="http://farm'+photo.farm+'.static.flickr.com/'+photo.server+'/'+photo.id+'_'+photo.secret+'_b.jpg" data-lightbox="'+photosetTitle+'" class="set_image">';
				theHtml+= '<img title="'+photo.title+'" src="'+source+'" alt="'+photo.title+'"></image>';
				theHtml+= '</a>';
			});
			flickrId.append(theHtml);
		};			
					
			$('button', flickrId).click(function(){
				
				$.getJSON(url += '&per_page=100', displayImages);
				
				function displayImages(data) {	
					var photosetTitle = data.photoset.title;
					var photosetTag = photosetTitle.toLowerCase().trim().split(/\s+/).join('-');
					
					var theHtml = "";
					$.each(data.photoset.photo, function(i,photo){
						var source = 'http://farm'+photo.farm+'.static.flickr.com/'+photo.server+'/'+photo.id+'_'+photo.secret+'_s.jpg';
						theHtml+= '<li><a href="http://farm'+photo.farm+'.static.flickr.com/'+photo.server+'/'+photo.id+'_'+photo.secret+'_b.jpg" data-lightbox="'+photosetTitle+'">';
						theHtml+= '<img title="'+photo.title+'" src="'+source+'" alt="'+photo.title+'" />';
						theHtml+= '</a></li>';				
					});
					
					flickrId.append('<ul class="set_gallery">'+theHtml+'</ul>');
					
					if (!$(flickrId).hasClass('active')) {	
						$(flickrId).addClass('active');
						$('button', flickrId).html('Close Set');
						$('.set_image', flickrId).hide();

					}
					else {
						$(flickrId).removeClass('active');
						$('.set_gallery', flickrId).remove();
						$('button', flickrId).html('View Photo Set');
						$('.set_image', flickrId).show();	
					}
				};	
			});	
    };
})(jQuery);
