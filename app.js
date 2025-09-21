// Asset urls from Figma export
const ASSETS = {
	backdrop: 'http://localhost:3845/assets/609b3d8b0efb22d18501d0e325b44249d4ef7424.png',
	intro: 'http://localhost:3845/assets/0b7678602ce37a7cbcd6f84cbc67f30875fa658b.png',
	paneAudio: 'http://localhost:3845/assets/f08b0fcb52678c87052cbd238e569da3751fa4eb.png',
	paneImage: 'http://localhost:3845/assets/9c477f18e19b3179c36c0751005eaf76222d086f.png',
	paneVideo: 'http://localhost:3845/assets/0a51e89f417c803fb0c8fec9fe8b194eb59ec594.png'
};

// Smooth scroll from hero CTA
function bindCtaScroll(){
	document.querySelectorAll('[data-action="scroll-to"]').forEach(btn=>{
		btn.addEventListener('click',()=>{
			const target = document.querySelector(btn.getAttribute('data-target'));
			if(target){ target.scrollIntoView({behavior:'smooth', block:'start'}); }
		});
	});
}

// Product accordion tabs
function bindProductTabs(){
	const tabs = Array.from(document.querySelectorAll('.product-tab'));
	const panes = {
		'pane-audio': document.getElementById('pane-audio'),
		'pane-image': document.getElementById('pane-image'),
		'pane-video': document.getElementById('pane-video')
	};
	if(!tabs.length) return;
	const bgFor = id => ({
		'pane-audio': ASSETS.paneAudio,
		'pane-image': ASSETS.paneImage,
		'pane-video': ASSETS.paneVideo
	}[id]);

	function activate(targetId){
		tabs.forEach(t=>{
			const on = t.getAttribute('aria-controls')===targetId;
			t.classList.toggle('is-active', on);
			t.setAttribute('aria-selected', String(on));
			t.setAttribute('aria-expanded', String(on));
			t.setAttribute('tabindex','0');
		});
		Object.entries(panes).forEach(([id, el])=>{
			if(!el) return;
			if(id===targetId){
				el.classList.remove('is-hidden');
				el.style.backgroundImage = `url('${bgFor(id)}')`;
			}else{
				el.classList.add('is-hidden');
			}
		});
	}

	tabs.forEach(tab=>{
		tab.addEventListener('click',()=>activate(tab.getAttribute('aria-controls')));
		tab.addEventListener('keydown', (e)=>{
			if(e.key==='Enter' || e.key===' '){
				e.preventDefault();
				activate(tab.getAttribute('aria-controls'));
			}
		});
	});
	activate('pane-audio');
}

// Dropdown stubs (language/currency)
function bindDropdowns(){
	document.querySelectorAll('.dropdown').forEach(dd=>{
		dd.addEventListener('click',()=>{
			dd.classList.toggle('is-open');
		});
	});
	document.addEventListener('click', (e)=>{
		if(!(e.target.closest && e.target.closest('.dropdown'))){
			document.querySelectorAll('.dropdown.is-open').forEach(d=>d.classList.remove('is-open'));
		}
	});
}

// Simple card carousel (scrolls horizontally on smaller screens)
function bindCarousel(){
	const section = document.querySelector('.section--cards');
	if(!section) return;
	const viewport = section.querySelector('.cards-viewport--horizontal');
	const prev = section.querySelector('[data-carousel="prev"]');
	const next = section.querySelector('[data-carousel="next"]');
	if(!viewport || !prev || !next) return;
	const gap = 32; // matches CSS gap
	const cardWidth = 392; // matches CSS card width
	const step = cardWidth + gap;

	prev.addEventListener('click',()=>{
		viewport.scrollBy({left:-step, behavior:'smooth'});
	});
	next.addEventListener('click',()=>{
		viewport.scrollBy({left: step, behavior:'smooth'});
	});

	// Disable manual scrolling (wheel/touch)
	viewport.addEventListener('wheel', e=>{ e.preventDefault(); }, {passive:false});
	viewport.addEventListener('touchmove', e=>{ e.preventDefault(); }, {passive:false});
}



window.addEventListener('DOMContentLoaded', ()=>{
	bindCtaScroll();
	bindProductTabs();
	bindDropdowns();
	bindCarousel();
});
