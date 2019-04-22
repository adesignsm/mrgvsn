$(document).ready(function() {

	var $mainText = $("#title-box");

	var $archiveLi = $("#archive-li");
	var $aboutLi = $("#about-li");

	var $archiveP = $("#archive-description");
	var $aboutP = $("#about-description");

	var $aboutSection = $("#about-section");
	var $archiveSection = $("#archive-section");

	var $detailsContainer = $("#details-container");

	var $quoteGenerator = $("#quote-generator");
	var $loadingImg = $("#bfly-logo");
	var $loadingPage = $("#loading-page");

	var $addToCartBtn = $("#addTocart-button");
	var $paypalButton = $(".paypal-button");

	$quoteGenerator.delay(500).animate({opacity: "1", marginLeft: "40%"}, 1000);
	$loadingImg.delay(2000).animate({opacity: "1", left: "5%"}, 1500);
	$loadingPage.delay(4500).fadeOut(800);

	$archiveLi.on("click", function() {

		$mainText.animate({top: "3%"}, 500);

		$detailsContainer.delay(400).fadeIn(600);
		$archiveP.delay(400).fadeIn(600);
		$aboutP.fadeOut(600);

		$aboutSection.fadeOut(500);
		$archiveSection.fadeIn(600);

		$("#details-container h1").text("ARCHIVE");
		
	});

	$aboutLi.on("click", function() {

		$mainText.animate({top: "3%"}, 500);

		$detailsContainer.delay(400).fadeIn(600);
		$aboutP.delay(400).fadeIn(600);
		$archiveP.fadeOut(600);

		$archiveSection.fadeOut(500);
		$aboutSection.fadeIn(600);

		$("#details-container h1").text("ABOUT");

	});

	$paypalButton.on("mouseenter", function() {

		$addToCartBtn.css({"color" : "#fff", "backgroundColor" : "#000"});
	});

	$paypalButton.on("mouseleave", function() {

		$addToCartBtn.css({"color" : "#000", "backgroundColor" : "#fff"});
	});
});

$(window).scroll(function() {

	if ($("body").scrollTop() > 150 || $("html").scrollTop() > 150) {

		$("#title-box").fadeOut(300);
		$("#details-container").fadeOut(300);
		$("#navigation-section").fadeOut(300);
	
	} else {

		$("#title-box").fadeIn(300);
		$("#details-container").fadeIn(300);
		$("#navigation-section").fadeIn(300);	
	}
});
