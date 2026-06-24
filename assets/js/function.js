$(function () {
initHeaderOffset();
smoothScroll();
initHeaderMegaMenu();
initFaqTab();
initQaAccordion();
});

function initHeaderOffset() {
var $header = $('.l-globalHeader');

if (!$header.length) {
	return;
}

var updateHeaderOffset = function () {
	document.documentElement.style.setProperty('--header-height', $header.outerHeight() + 'px');
};

updateHeaderOffset();
$(window).on('resize', updateHeaderOffset);
}

function getHeaderHeight() {
var height = parseInt(document.documentElement.style.getPropertyValue('--header-height'), 10);

if (height) {
	return height;
}

return $('.l-globalHeader').outerHeight() || 0;
}

function smoothScroll() {
$('a[href^="#"]').on('click', function () {
	var href = $(this).attr('href');

	if (href === '#' || href === '') {
	return false;
	}

	var $target = $(href);

	if (!$target.length) {
	return true;
	}

	var position = $target.offset().top - getHeaderHeight();

	$('html, body').animate({ scrollTop: position }, 500, 'swing');
	return false;
});

if (window.location.hash) {
	var $target = $(window.location.hash);

	if ($target.length) {
	window.scrollTo(0, $target.offset().top - getHeaderHeight());
	}
}
}

function initHeaderMegaMenu() {
var $wrap = $('.js-headerNavWrap');
var $navItems = $wrap.find('.js-headerNav > .item');
var $megaItems = $wrap.find('.js-headerNavMega');
var $mega = $wrap.find('.js-headerMega');

if (!$megaItems.length || !$mega.length) {
	return;
}

var timer;

var closeMega = function () {
	$megaItems.removeClass('is-open');
	$mega.removeClass('is-open');
};

var openMega = function ($item) {
	$megaItems.not($item).removeClass('is-open');
	$item.addClass('is-open');
	$mega.addClass('is-open');
};

$wrap.on('mouseleave', function () {
	timer = setTimeout(closeMega, 120);
});

$navItems.on('mouseenter', function () {
	clearTimeout(timer);
	var $item = $(this);

	if ($item.hasClass('js-headerNavMega')) {
	openMega($item);
	} else {
	closeMega();
	}
});

$mega.on('mouseenter', function () {
	clearTimeout(timer);
});
}

function initFaqTab() {
$('.js-faqTab').each(function () {
	var $tab = $(this);
	var $tabs = $tab.find('.js-tabParent');
	var $panels = $tab.find('.js-tabChild');

	if (!$tabs.length || !$panels.length) {
	return;
	}

	$tabs.on('click', function () {
	var index = $(this).index();

	$tabs.removeClass('is-active');
	$(this).addClass('is-active');
	$panels.removeClass('is-active').eq(index).addClass('is-active');
	});
});
}

function initQaAccordion() {
$('.c-qaSet01 .group.is-question').on('click', function () {
	var $qa = $(this).closest('.c-qaSet01');
	var $answer = $qa.find('.group.is-answer');

	$qa.toggleClass('is-active');

	if ($qa.hasClass('is-active')) {
	$answer.stop(true, true).slideDown(300, function () {
		$(this).css('display', 'flex');
	});
	} else {
	$answer.stop(true, true).slideUp(300);
	}
});
}
