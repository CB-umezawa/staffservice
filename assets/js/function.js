$(function () {
initHeaderOffset();
smoothScroll();
initHeaderMegaMenu();
initHeader02();
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

function initHeader02() {
var $header = $('.js-header02');

if (!$header.length) {
	return;
}

var $menuBtn = $header.find('.js-header02MenuBtn .btn');
var $nav = $header.find('.js-header02Nav');

var closeMenu = function () {
	$header.removeClass('is-active');
	$menuBtn.attr('aria-expanded', 'false');
	$('body').removeClass('is-header02Open');
};

var openMenu = function () {
	$header.addClass('is-active');
	$menuBtn.attr('aria-expanded', 'true');
	$('body').addClass('is-header02Open');
};

$header.find('.js-header02MenuBtn').on('click', function () {
	if ($header.hasClass('is-active')) {
	closeMenu();
	} else {
	openMenu();
	}
});

$header.find('.js-header02AccordionHead').on('click', function () {
	var $item = $(this).closest('.js-header02AccordionItem');
	var $body = $item.find('.js-header02AccordionBody');

	$item.toggleClass('is-active');

	if ($item.hasClass('is-active')) {
	$body.stop(true, true).slideDown(300);
	} else {
	$body.stop(true, true).slideUp(300);
	}
});

$header.find('.js-header02Nav a').on('click', function () {
	closeMenu();
	$header.find('.js-header02AccordionItem').removeClass('is-active');
	$header.find('.js-header02AccordionBody').hide();
});

$(window).on('resize', function () {
	if (window.innerWidth > 768) {
	closeMenu();
	$header.find('.js-header02AccordionItem').removeClass('is-active');
	$header.find('.js-header02AccordionBody').hide();
	}
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
	$(this).closest('.c-qaSet01').toggleClass('is-active');
});
}
