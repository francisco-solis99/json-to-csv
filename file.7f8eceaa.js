import{g as _,S as d}from"./getCsvPropsAndItems.8080182c.js";import"./index.df732a4a.js";var u=`

<div class="byfile__wrapper">
  <div class="byFile__instructions" data-aos="fade-right">
    <p class="byFile__text">
      Convert your Json files usign this converter tool. Only you need to upload your file choosing since your file system or drag and dropt your file and download it.
    </p>
  </div>
  <div class="byFile__place" data-aos="fade-left">
    <div class="byFile__info">
      <h3 class="byFile__title">Drag and drop here your Json file:</h3>
      <figure class="by__file-img-wrapper">
        <img class="by__file-image" src="../../assets/images/json_format.svg" alt="JSON format image">
      </figure>
    </div>
    <label class="btn-choose__file">
      <div class="full-choose__file"></div>
      <input type="file" id="choose-file" name="files" accept="application/json" aria-label="Choose File" class="input__file" autocomplete="off">
    </label>
    <label for="choose-file" aria-label="Choose File" class="btn__choose">
        Choose File
      <span class="choose__icon">
        <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18.5714 0H20V14H18.5714V0ZM10.7143 0L9.69286 0.9751L15.1071 6.3H0V7.7H15.1071L9.69286 13.0011L10.7143 14L17.8571 7L10.7143 0Z" fill="#36404E"/>
        </svg>
      </span>
    </label>
  </div>
</div>

<footer class="footer__wrapper" data-aos="fade-up" data-aos-duration="1000"  data-aos-offset="0">
  <p class="footer__text">Made with \u{1F9E1} by Francisco Solis</p>
</footer>
`;var v=()=>{const e=document.createElement("div");return e.innerHTML=u,new l(e).init(),e};function l(e){this.htmlContent=e,this.dropArea=e.querySelector(".full-choose__file"),this.inputFile=e.querySelector(".input__file"),this.files=null}l.prototype={constructor:l,init(){this.inputFile.addEventListener("change",e=>this.handleFiles.call(this,e)),this.dropArea.addEventListener("dragenter",this.handleEnter.bind(this)),this.dropArea.addEventListener("drop",e=>this.handleDrop.call(this,e)),this.dropArea.addEventListener("dragover",e=>this.handleDragOver.call(this,e)),this.dropArea.addEventListener("dragleave",e=>this.handleLeave.call(this,e)),this.dropArea.addEventListener("dragexit",e=>this.handleLeave.call(this,e)),this.dropArea.addEventListener("dragend",e=>this.handleLeave.call(this,e))},handleFiles(e){console.log("Hanlde the file"),this.files=e.target.files,this.processFile(this.files[0])},handleEnter(){this.dropArea.classList.add("active"),this.dropArea.textContent="Drop to upload the JSON file"},handleDrop(e){e.preventDefault(),this.dropArea.classList.remove("active"),this.files=e.dataTransfer.files,this.processFile(this.files[0])},handleDragOver(e){e.preventDefault()},handleLeave(e){e.preventDefault(),this.dropArea.classList.remove("active")},processFile(e){const n=e.type,t=this.htmlContent.querySelector(".btn__choose"),a=e.name.split(".")[0];if(n==="application/json"){const i=new FileReader;i.readAsText(e),i.addEventListener("load",r=>{const s=r.target.result,o=JSON.parse(s),c=o.length?o:[o],[p,h]=_(c),f=`${p.join(",")}\r
${h.join(`\r
`)}`;this.buildCsvFile(f,a)}),i.addEventListener("progress",r=>{if(r.lengthComputable){const s=setInterval(()=>{const o=r.loaded/r.total*100;t.style.setProperty("--widthAfter",`${o}%`),o===100&&(clearInterval(s),t.classList.add("file__loaded"),this.dropArea.style.display="none",t.setAttribute("for",""),t.innerHTML="Click to convert another file",t.addEventListener("click",()=>window.location.reload()))},0)}});return}d.fire({title:"Error to convert",text:"Verify your doctype file that you try to upload",confirmButtonText:"Ok",icon:"error",backdrop:!0,width:"70%",padding:"1rem",position:"center",allowOutsideClick:!0,allowEscapeKey:!0,confirmButtonAriaLabel:"Confirmar"})},buildCsvFile(e,n){const t=new Blob([e],{type:"text/csv"}),a=window.URL.createObjectURL(t),i=document.createElement("a");i.setAttribute("href",a),i.setAttribute("download",`${n}.csv`),i.click(),d.fire({title:"Your Csv file has been downloaded succesfully",icon:"success",timer:3e3,toast:!0,position:"top-right",showConfirmButton:!1})}};export{v as default};
