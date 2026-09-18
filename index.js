import{a as M,S as R,i as l}from"./assets/vendor-C1DvvBV_.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const a of e)if(a.type==="childList")for(const n of a.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function o(e){const a={};return e.integrity&&(a.integrity=e.integrity),e.referrerPolicy&&(a.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?a.credentials="include":e.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(e){if(e.ep)return;e.ep=!0;const a=o(e);fetch(e.href,a)}})();const $="57647240-b4ea581d27336c509e2a6cd6a",E="https://pixabay.com/api/",x=15;async function f(r,t){return(await M.get(E,{params:{key:$,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:x}})).data}const m=document.querySelector(".gallery"),h=document.querySelector(".loader"),L=document.querySelector(".load-more-btn"),I=new R(".gallery a",{captionsData:"alt",captionDelay:250});function b(r){const t=r.map(({webformatURL:o,largeImageURL:s,tags:e,likes:a,views:n,comments:q,downloads:B})=>`
        <li class="gallery-item">
          <a class="gallery-link" href="${s}">
            <img class="gallery-image" src="${o}" alt="${e}" />
            <div class="gallery-info">
              <p class="gallery-info-item">
                <span class="gallery-info-label">Likes</span>
                <span class="gallery-info-value">${a}</span>
              </p>
              <p class="gallery-info-item">
                <span class="gallery-info-label">Views</span>
                <span class="gallery-info-value">${n}</span>
              </p>
              <p class="gallery-info-item">
                <span class="gallery-info-label">Comments</span>
                <span class="gallery-info-value">${q}</span>
              </p>
              <p class="gallery-info-item">
                <span class="gallery-info-label">Downloads</span>
                <span class="gallery-info-value">${B}</span>
              </p>
            </div>
          </a>
        </li>
      `).join("");m.insertAdjacentHTML("beforeend",t),I.refresh()}function y(){m.innerHTML=""}function v(){h.classList.remove("is-hidden")}function w(){h.classList.add("is-hidden")}function P(){L.classList.remove("is-hidden")}function i(){L.classList.add("is-hidden")}const d=document.querySelector(".form"),O=d.elements["search-text"],A=document.querySelector(".load-more-btn");let p="",c=1,u=0,g=0;d.addEventListener("submit",async r=>{r.preventDefault();const t=O.value.trim();if(!t){y(),i(),l.warning({message:"Please enter a search query.",position:"topRight"});return}p=t,c=1,u=0,g=0,y(),i(),v();try{const{hits:o,totalHits:s}=await f(p,c);if(o.length===0){l.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}g=s,u=o.length,b(o),S()}catch{l.error({message:"Something went wrong. Please try again later.",position:"topRight"})}finally{w(),d.reset()}});A.addEventListener("click",async()=>{const r=c+1;i(),v();try{const{hits:t}=await f(p,r);c=r,b(t),u+=t.length,H(),S()}catch{l.error({message:"Something went wrong. Please try again later.",position:"topRight"}),P()}finally{w()}});function S(){if(u>=g){i(),l.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"});return}P()}function H(){const r=document.querySelector(".gallery-item");if(!r)return;const{height:t}=r.getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
