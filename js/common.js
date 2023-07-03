$(function() {

	//SVG Fallback
	if(!Modernizr.svg) {
		$("img[src*='svg']").attr("src", function() {
			return $(this).attr("src").replace(".svg", ".png");
		});
	};

	//E-mail Ajax Send
	//Documentation & Example: https://github.com/agragregra/uniMail
	$("form").submit(function() { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: th.serialize()
		}).done(function() {
			alert("Thank you!");
			setTimeout(function() {
				// Done Functions
				th.trigger("reset");
			}, 1000);
		});
		return false;
	});

	//Chrome Smooth Scroll
	try {
		$.browserSelector();
		if($("html").hasClass("chrome")) {
			$.smoothScroll();
		}
	} catch(err) {

	};

	$("img, a").on("dragstart", function(event) { event.preventDefault(); });
	
});

$(window).load(function() {

	$(".loader_inner").fadeOut();
	$(".loader").delay(400).fadeOut("slow");

});


function maskPhone(selector, masked = '+7 (___) ___-__-__') {
	const elems = document.querySelectorAll(selector);

	function mask(event) {
		const keyCode = event.keyCode;
		const template = masked,
			def = template.replace(/\D/g, ""),
			val = this.value.replace(/\D/g, "");
		console.log(template);
		let i = 0,
			newValue = template.replace(/[_\d]/g, function (a) {
				return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
			});
		i = newValue.indexOf("_");
		if (i !== -1) {
			newValue = newValue.slice(0, i);
		}
		let reg = template.substr(0, this.value.length).replace(/_+/g,
			function (a) {
				return "\\d{1," + a.length + "}";
			}).replace(/[+()]/g, "\\$&");
		reg = new RegExp("^" + reg + "$");
		if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
			this.value = newValue;
		}
		if (event.type === "blur" && this.value.length < 5) {
			this.value = "";
		}

	}

	for (const elem of elems) {
		elem.addEventListener("input", mask);
		elem.addEventListener("focus", mask);
		elem.addEventListener("blur", mask);
	}
	
}

document.addEventListener("DOMContentLoaded", () => {

	maskPhone('input[type="tel"]')

	// Smooth scroll when link clicked
	const $page = $('html, body');
	$('a[href*="#"]').click(function() {
		$page.animate({
			scrollTop: $($.attr(this, 'href')).offset().top
		}, 800);
		return false;
	});

	const onScrollHeader = () => { // объявляем основную функцию onScrollHeader
		const header = $('.header') // находим header и записываем в константу
		let prevScroll = $(window).scrollTop() // узнаем на сколько была прокручена страница ранее
		let currentScroll // на сколько прокручена страница сейчас (пока нет значения)
	
		$(window).scroll(() => { // при прокрутке страницы
		  currentScroll = $(window).scrollTop() // узнаем на сколько прокрутили страницу
		  const headerHidden = () => header.hasClass('header_hidden') // узнаем скрыт header или нет
		  if (currentScroll > prevScroll && !headerHidden()) { // если прокручиваем страницу вниз и header не скрыт
			header.addClass('header_hidden') // то скрываем header
		  }
		  if (currentScroll < prevScroll && headerHidden()) { // если прокручиваем страницу вверх и header скрыт
			header.removeClass('header_hidden') // то отображаем header
		  }
		  prevScroll = currentScroll // записываем на сколько прокручена страница на данный момент
		})
	  }
	  
	  onScrollHeader() // вызываем основную функцию onScrollHeader

	document.querySelectorAll('.work__btn').forEach(btn => {
		btn.addEventListener('click', e => {
			e.preventDefault()
			document.querySelectorAll('.work__btn').forEach(btn => btn.style.color = '#000')
			e.target.style.color = '#c9a45f'
			if (e.target.classList.contains('fiz')) {
				document.querySelector('.work__container.fiz').classList.add('active')
				document.querySelector('.work__container.bus').classList.remove('active')
			} else if (e.target.classList.contains('bus')) {
				document.querySelector('.work__container.bus').classList.add('active')
				document.querySelector('.work__container.fiz').classList.remove('active')
			}
		})
	})

	document.querySelectorAll('.modal__btn').forEach((item)=> {
		item.addEventListener('click', (e) => {
			e.preventDefault()
			document.querySelector('html').style.overflowY = 'hidden'
			document.querySelector('.modal').style.display = 'flex'
			setTimeout(()=> {
				document.querySelector('.modal').style.opacity = 1
			}, 500)
		})
	})
	
	document.querySelector('.modal__close').addEventListener('click', ()=> {
		document.querySelector('html').style.overflowY = 'auto'
		document.querySelector('.modal').style.opacity = 0
		setTimeout(()=> {
			document.querySelector('.modal').style.display = 'none'
		}, 500)
	})
	
	document.querySelector('.modal__overlay').addEventListener('click', ()=> {
		document.querySelector('html').style.overflowY = 'auto'
		document.querySelector('.modal').style.opacity = 0
		setTimeout(()=> {
			document.querySelector('.modal').style.display = 'none'
		}, 500)
	})

})