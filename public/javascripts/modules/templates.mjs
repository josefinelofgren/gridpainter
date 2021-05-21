const paintTemplate = `
<section id="paintContainer">
<h2 class="column-title">Paint</h2>
<main class="column-container">
  <article class="canvas-control">
    <table id="canvas"></table>
    <button id="paint" class="canvasBtn">
      <i class="fas fa-paint-brush"></i>
    </button>
    <button id="erase" class="canvasBtn">
      <i class="fas fa-eraser"></i>
    </button>
    <button id="save" class="canvasBtn">
      <i class="fas fa-save"></i>
    </button>
  </article>
  <article class="options-control">
    <div class="dropdown">
      <button class="dropbtn">
        Picture menu
        <i class="fa fa-caret-down"></i>
      </button>
      <div class="dropdown-content">
        <a href="#">Link 1</a>
        <a href="#">Link 2</a>
        <a href="#">Link 3</a>
      </div>
    </div>
    <h3>Username<span id="colorBox"></span></h3>
  </article>
</main>
</section>
`;

const gameTemplate = `
<section id="gameContainer">
        <h2>Play</h2>
        <main class="column-container">
          <article class="canvas-control">
            <table id="facit"></table>
          </article>
          <article class="options-control">
            <button id="playBtn"><i class="fas fa-play"></i>Play</button>
          </article>
        </main>
      </section> 
`;

const extraGameBtn = `
  <button id="doneBtn" class="canvas-btn">
    <i class="fas fa-check-circle"></i>Done
  </button>  
`;

const waitingTemplate = `
    <p class="waiting">Waiting for other players..</p>
`;

const chatTemplate = `
<section id="chatContainer" class="chat-container">
<h2>Chat</h2>
<main class="column-container">
  <div class="chat-messages"></div>
  <div class="chat-form-container">
    <form id="chat-form">
      <input
        id="msg"
        type="text"
        placeholder="Enter Message"
        required
        autocomplete="off"
      />
      <button class="btn">
        <i class="fas fa-paper-plane"></i> Send
      </button>
    </form>
  </div>
</main>
</section>
`;

function renderTemplates(element, template) {
  element.innerHTML = template;
}

function addTemplate(element, template) {
  element.insertAdjacentHTML('afterbegin', template);
}
function test() {
  console.log('test msjs');
};

export {test}