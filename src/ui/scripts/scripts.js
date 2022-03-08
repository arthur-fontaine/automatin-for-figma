const runCodeButton = document.querySelector('#run-code');
const cancelButton = document.querySelector('#cancel');
const codeInput = document.querySelector('#code');

const formValidation = (event) =>{
  runCodeButton.disabled = codeInput.value === '';
}

document.addEventListener("DOMContentLoaded",  () => {
  formValidation();
});

codeInput.oninput = () => {
  formValidation();

  parent.postMessage({
    pluginMessage: {
      'type': 'code-input',
      'code': codeInput.value,
    }
  }, '*');
};
runCodeButton.onclick = () => {
  runCode();
}
cancelButton.onclick = () => {
  cancel();
}


const runCode = () => {
  parent.postMessage({
    pluginMessage: {
      'type': 'run-code',
      'code': codeInput.value,
    }
  }, '*');
}

const cancel = () => {
  parent.postMessage({pluginMessage: {'type': 'cancel'}}, '*')
}
