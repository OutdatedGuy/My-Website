function copyTextToClipBoard(node) {
  var id = node;
  node = document.getElementById(node);

  if (document.body.createTextRange) {
    const range = document.body.createTextRange();
    range.moveToElementText(node);
    range.select();
    document.execCommand("copy");
    var span = document.getElementById(id + "-span");
    span.style.visibility = "visible";
    setTimeout((span) => {
      span.style.visibility = "hidden";
    }, 3000);
  } else if (window.getSelection) {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(node);
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand("copy");
    selection.removeRange(range);
    var span = document.getElementById(id + "-span");
    span.style.visibility = "visible";
    setTimeout(() => {
      span.style.visibility = "hidden";
    }, 3000);
  } else {
    console.warn("Could not select text in node: Unsupported browser.");
  }
}
