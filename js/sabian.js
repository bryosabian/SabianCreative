$(function(){
	
	var mobileNav=$("#sabian_mobile_nav");
	
	var navbarCollapse=$("#sabian_nav_collapse_cont");
	
	var navbarTrans=$(".nav_transparent");
	
	/*NavBar*/
	$(window).scroll(function(e) {
        
		var top=$(window).scrollTop();
		
		if(top>0 && navbarTrans.length){
			navbarTrans.addClass("dark");
		}else{
			if(navbarTrans.hasClass("dark"))
			navbarTrans.removeClass("dark");	
		}
		
    });
	
	/*Slider*/
	var $vegas_banner=$("#section_banner");
	
	if($vegas_banner.length>0){
		
		var v_banner_str=$vegas_banner.attr("data-images");
		
		if(v_banner_str!=undefined){
			
			var v_banner_imgs=v_banner_str.split(',');
			
			var v_data=[];
			
			for(var i=0;i<v_banner_imgs.length;i++){
				
				v_data[i]={ src: v_banner_imgs[i] };
			}
			
			$vegas_banner.vegas({
				
				overlay : true,
				
				delay : 10000,
				
				slides : v_data,
				
				walk : function(index,settings){
				}
				
			});
			
			$("#vegas_next").click(function(e) {
                
				$vegas_banner.vegas("next");
				
            });
			
			$("#vegas_prev").click(function(e) {
                $vegas_banner.vegas("previous");
            });
		}
	}
	



/*Carousel*/
var owl_items=$(".owl-items");

var owl_single=$(".owl-single");

if(owl_single.length>0){
	
	owl_single.owlCarousel({
		items: 1,
		lazyLoad : true,
		pagination : false,
		autoPlay: 10000,
		stopOnHover: true,
		rewind:false,
		dots:false
	});
}


if(owl_items.length>0){
	
	var items=owl_items.attr("data-items");
	
	owl_items.owlCarousel({
		lazyLoad : true,
		pagination : false,
		autoPlay: 10000,
		stopOnHover: true,
		margin:10,
		rewind:false,
		responsiveClass:true,
		
		responsive : {
			0:{
				items:1	
			},
			600 : {
				items:2
			},
			768 : {
				items:items	
			}
		}
	});
}

$(".owl_carousel_nav").each(function(index, element) {
	
	var owlTarget=$($(this).attr("data-target"));
	
	var slideTo=$(this).attr("data-slide-to");
	
	var _ocn_this=$(this);
	
	if(owlTarget.length>0){
		
		owlTarget.on('changed.owl.carousel',function(oe){
			
			var index=oe.item.index;
			
			if(slideTo==index){
				
				$(".owl_carousel_nav.active").removeClass("active");
				
				_ocn_this.addClass("active");	
			}
			
		});
	}
	_ocn_this.click(function(e) {
		
		if(owlTarget.length>0){
			
			owlTarget.trigger('to.owl.carousel',slideTo);
		}
	 
    });
	});
	
	
	
/*Portfolio*/
var portfolio=$("#the_portfolio");

if(portfolio.length>0){
	
	portfolio.mixItUp({
		
		animation : {
		effects : 'fade rotateZ(-180deg)',
		duration : 700	
	},
	
	classNames : {
		elementFilter : 'filter-btn'
	},
	
	selectors : {
		target : '.mix'	
	}
	
	});
	
	
	$("#portfolio_controls li").click(function(e) {
		
		e.preventDefault();
		
		var _this=$(this);
		
		var filter=_this.attr("data-filter");
		
		$("#portfolio_controls li.active").removeClass("active");
		
		_this.addClass("active");
	});
	
	
	
}


/*Charts*/
$(".pie_chart").each(function(index, element) {
    
	var cThis=$(this);
	
	var barColor=cThis.attr("data-bar-color");
	
	var trackColor=cThis.attr("data-track-color");
	
	cThis.waypoint(function(direction) {
		
		cThis.easyPieChart({
			
			/*easing: 'easeOutBounce',*/
			
			onStep: function(from, to, percent) {
				cThis.find('.percent').text(Math.round(percent));
			}
		});
		
		/*End Pie Chart*/
	},{ offset: '75%'}
	); /*End Waypoint*/
	
	
	
	
	
	/*ScrollAnimations*/
	$(".sabian_animate").each(function(index, element) {
        
		var _this=$(this);
		
		var animation=_this.attr("data-animate");
		
		_this.waypoint(function(direction) {
			
			_this.addClass(animation);
			
		},
		{
            offset: '75%'
        });
		
    });
	
	
	
	
	});
	
	
	
	/*Smart Scroll*/
	$('[href*=section_]').each(function(e,v) {
		
		var _this=$(this);
		
		var target=$(_this.attr("href"));
		
		var offset=$('body[data-spy]').attr("data-offset");
		
		if(offset==undefined)
		offset=80;
				
		_this.click(function(e) {
			
			e.preventDefault();
			
			navbarCollapse.collapse('hide');
			
			$('html ,body').animate({
				scrollTop:target.offset().top-offset /* -offset to account for the navbar height */
			},1000);
        });
    });
	
});