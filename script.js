document.addEventListener('DOMContentLoaded', function(){
	// Tab switching
	const tabs = document.querySelectorAll('.tab-btn');
	const panels = document.querySelectorAll('.tab-panel');

	function openTab(tabName){
		tabs.forEach(b=>b.classList.remove('active'));
		panels.forEach(p=>p.classList.remove('active'));
		const btn = Array.from(tabs).find(x=>x.dataset.tab===tabName);
		if(btn) btn.classList.add('active');
		const panel = document.getElementById(tabName);
		if(panel) panel.classList.add('active');
		window.scrollTo({top:0,behavior:'smooth'});
	}

	tabs.forEach(btn=>{
		btn.addEventListener('click', ()=> openTab(btn.dataset.tab));
	});

	// Lightbox for GIFs and videos
	const lightbox = document.getElementById('lightbox');
	const lbContent = lightbox.querySelector('.lb-content');
	const lbClose = document.getElementById('lbClose');

	function openLightbox(targetUrl, type){
		lbContent.innerHTML = '';
		if(type==='video'){
			const v = document.createElement('video');
			v.src = targetUrl; v.controls = true; v.autoplay = true; v.playsInline = true;
			lbContent.appendChild(v);
		} else {
			const img = document.createElement('img');
			img.src = targetUrl; lbContent.appendChild(img);
		}
		lightbox.setAttribute('aria-hidden','false');
	}

	function closeLightbox(){
		lightbox.setAttribute('aria-hidden','true');
		const node = lbContent.firstChild; if(node && node.tagName==='VIDEO'){ node.pause(); node.src=''; }
		lbContent.innerHTML = '';
	}

	// Attach to links with .media-link
	document.querySelectorAll('.media-link').forEach(link=>{
		link.addEventListener('click', (e)=>{
			e.preventDefault();
			const url = link.getAttribute('href');
			const type = link.dataset.type || (url.endsWith('.mp4') ? 'video' : 'gif');
			openLightbox(url,type);
		});
	});

	// Clicking a start-page project card opens Projects tab and scrolls to that project
	document.querySelectorAll('.project-start-card').forEach(card=>{
		card.addEventListener('click', ()=>{
			const target = card.dataset.target;
			openTab('projects');
			// wait for the projects panel to become visible, then scroll
			setTimeout(()=>{
				const el = document.getElementById(target);
				if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
			}, 250);
		});
	});

	lbClose.addEventListener('click', closeLightbox);
	lightbox.addEventListener('click', (e)=>{ if(e.target===lightbox) closeLightbox(); });

	// If projects contain video tags, pause/play on hover for quick preview (desktop only)
	document.querySelectorAll('.project-card video').forEach(v=>{
		v.addEventListener('mouseenter', ()=>{ try{ v.play(); }catch(e){} });
		v.addEventListener('mouseleave', ()=>{ try{ v.pause(); v.currentTime=0; }catch(e){} });
	});
});

