import{a as m,S as h,i}from"./assets/vendor-BfjKTZs6.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function a(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=a(e);fetch(e.href,t)}})();const b="49359738-1a7aad8ecd2da3da8f5235c9c",L="https://pixabay.com/api/";async function u(o,r){const a={key:b,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:r};try{return(await m.get(L,{params:a})).data}catch(s){throw console.error("Error fetching images:",s),s}}function f(o){return o.map(({webformatURL:r,largeImageURL:a,tags:s,likes:e,views:t,comments:n,downloads:y})=>`
      <div class="photo-card">
        <a href="${a}">
          <img src="${r}" alt="${s}" loading="lazy"/>
        </a>
        <div class="info">
          <p><b>Likes:</b> ${e}</p>
          <p><b>Views:</b> ${t}</p>
          <p><b>Comments:</b> ${n}</p>
          <p><b>Downloads:</b> ${y}</p>
        </div>
      </div>`).join("")}function p(o){document.querySelector(".gallery").insertAdjacentHTML("beforeend",o),new h(".gallery a").refresh()}const v=document.querySelector("#search-form"),w=document.querySelector(".gallery"),d=document.querySelector(".load-more");let l="",c=1,g=0;v.addEventListener("submit",async o=>{if(o.preventDefault(),l=o.currentTarget.searchQuery.value.trim(),!l){i.warning({message:"Please enter a search query"});return}c=1,w.innerHTML="",d.style.display="none";try{const r=await u(l,c);if(g=r.totalHits,r.hits.length===0){i.info({message:"No images found"});return}p(f(r.hits)),d.style.display="block"}catch{i.error({message:"Error fetching images"})}});d.addEventListener("click",async()=>{c+=1;try{const o=await u(l,c);p(f(o.hits));const{height:r}=document.querySelector(".gallery .photo-card").getBoundingClientRect();window.scrollBy({top:r*2,behavior:"smooth"}),c*15>=g&&(d.style.display="none",i.info({message:"We're sorry, but you've reached the end of search results."}))}catch{i.error({message:"Error fetching images"})}});
//# sourceMappingURL=index.js.map
