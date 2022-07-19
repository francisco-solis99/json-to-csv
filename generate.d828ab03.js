import{g as s,S as n}from"./getCsvPropsAndItems.65185e89.js";import"./index.0363a365.js";var l=`
<div class="generate__wrapper">
  <div class="generate__place" data-aos="fade-down">
    <h3 class="generate__title">Type or paste your Json:</h3>
    <textarea class="generate__textarea" id="json-textarea" rows="10" cols="20"></textarea>
  </div>
  <button class="generate__button"> <span>Convert</span> </button>
  <div class="generate__place generate__output" data-aos="fade-up">
    <div class="generate__options">
      <h3 class="generate__title">Here is your Csv:</h3>
      <label for="CheckBtn" class="generate__label-check">
        <span class="generate__info-options">Show in table</span>
        <input type="checkbox" name="CheckBtn" id="checkBtn" class="generate__options-input">
      </label>
    </div>
    <div class="output">
      <textarea class="generate__textarea" id="csv-textarea" readonly rows="10" cols="20"></textarea>
    </div>
  </div>
</div>

<footer class="footer__wrapper" data-aos="fade-up" data-aos-duration="1000"  data-aos-offset="0">
  <p class="footer__text">Made with \u{1F9E1} by Francisco Solis</p>
</footer>
`;var p=()=>{const e=document.createElement("div");return e.innerHTML=l,new o(e).init(),e};function o(e){this.htmlContent=e,this.btnConverter=e.querySelector(".generate__button"),this.outputOption=e.querySelector(".generate__options-input"),this.outputPlace=e.querySelector(".output"),[this.jsonTextArea,this.csvTextArea]=e.querySelectorAll(".generate__textarea")}o.prototype={constructor:o,init(){this.btnConverter.addEventListener("click",this.convertJsonToCsv.bind(this)),this.csvTextArea.addEventListener("click",this.copyIntoClipboard.bind(this))},convertJsonToCsv(){const e=this.jsonTextArea.value;try{const t=JSON.parse(e),r=t.length?t:[t],[a,i]=s(r);this.renderOutput(a,i),this.outputOption.addEventListener("click",this.renderOutput.bind(this,a,i))}catch{n.fire({title:"Error to convert",text:"Verify your json text",confirmButtonText:"Ok",icon:"error",backdrop:!0,width:"50%",padding:"1rem",position:"center",allowOutsideClick:!0,allowEscapeKey:!0,confirmButtonAriaLabel:"Confirmar"})}},renderOutput(e,t){if(this.outputPlace.innerHTML="",this.outputOption.checked){const r=this.renderTable(e,t);this.outputPlace.appendChild(r);return}this.csvTextArea.textContent=e.join(",")+`\r
`,this.csvTextArea.textContent+=t.join(`\r
`),this.outputPlace.appendChild(this.csvTextArea)},copyIntoClipboard(){const e=this.csvTextArea.textContent;if(!e){n.fire({title:"Nothing to copy",text:"Verify your json text",icon:"warning",timer:2e3,toast:!0,position:"top-right",showConfirmButton:!1});return}navigator.clipboard.writeText(e).then(()=>{n.fire({title:"Your Csv text has been copied",icon:"success",timer:3e3,toast:!0,position:"top-right",showConfirmButton:!1})}).catch(t=>console.log(t))},renderRows(e){const t=[];for(let r=0;r<e.length;r+=1)t.push(`
        <div class="table__row">
          ${this.renderCells(e[r])}
        </div>
      `);return t.join("")},renderCells(e){const t=[];for(let r=0;r<e.length;r+=1)t.push(`
        <span class="table__cell">
          ${e[r]}
        </span>
      `);return t.join("")},renderTable(e,t){const r=document.createElement("div");return r.classList.add("generator__table"),r.innerHTML=`
      <div class="table__header">
        ${this.renderCells(e)}
      </div>

      <div class="table__content">
        ${this.renderRows(t)}
      </div>
    `,r}};export{p as default};
