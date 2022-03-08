// import {BaseNode, ChildrenMixin} from "@figma/plugin-typings";

const width = 464;
let height = Math.floor(figma.viewport.bounds.height * 0.2);

if (height < 316) {
  height = 316;
}

figma.clientStorage.getAsync('code').then(code => {
  if (code && typeof code === 'string') {
    figma.showUI(__html__.replace('$saved_code', code), {width, height});
  } else {
    figma.showUI(__html__.replace('$saved_code', ''), {width, height});
  }
}).catch(error => {
  figma.showUI(__html__.replace('$saved_code', ''), {width, height});
});

const runCode = (code: string) => {
  return eval(code);
}

figma.ui.onmessage = msg => {
  if (msg.type === 'run-code') {
    const code = msg.code;
    const result = runCode(code);
    if (result) {
      figma.notify(result.toString());
    }
    figma.closePlugin();
  } else if (msg.type === 'code-input') {
    const code = msg.code;
    figma.clientStorage.setAsync('code', code).catch((e) => {
      console.log(e);
    });
  } else {
    figma.closePlugin();
  }
};
